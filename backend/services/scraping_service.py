import httpx
import json
import re
import logging
from bs4 import BeautifulSoup
from dataclasses import dataclass
from typing import Optional
from urllib.parse import urlparse

logger = logging.getLogger(__name__)

EXTRACTION_VERSION = "v1"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer": "https://www.google.com/",
    "DNT": "1",
}


@dataclass
class ScrapedProduct:
    url: str
    title: str
    price: Optional[str] = None
    currency: str = "TL"
    description: Optional[str] = None
    rating: Optional[str] = None
    review_count: Optional[int] = None
    image_url: Optional[str] = None
    brand: Optional[str] = None
    site_name: str = "Unknown"
    error: Optional[str] = None

    _BLOCKED_KEYWORDS = {"güvenlik", "security", "403", "captcha", "robot", "doğrulama", "verification"}

    def is_valid(self) -> bool:
        if not self.title or len(self.title) <= 5:
            return False
        title_lower = self.title.lower()
        return not any(kw in title_lower for kw in self._BLOCKED_KEYWORDS)

    def to_prompt_text(self) -> str:
        lines = [f"Ürün Adı: {self.title}"]
        if self.price:
            lines.append(f"Fiyat: {self.price} {self.currency}")
        if self.brand:
            lines.append(f"Marka: {self.brand}")
        if self.rating:
            lines.append(f"Ortalama Puan: {self.rating}/5")
        if self.review_count:
            lines.append(f"Toplam Yorum: {self.review_count}")
        if self.description:
            lines.append(f"Açıklama: {self.description[:600]}")
        lines.append(f"Mağaza: {self.site_name}")
        return "\n".join(lines)


def detect_site(url: str) -> str:
    domain = urlparse(url).netloc.lower()
    if "trendyol" in domain:
        return "Trendyol"
    if "n11" in domain:
        return "N11"
    if "ciceksepeti" in domain:
        return "ÇiçekSepeti"
    if "akakce" in domain:
        return "Akakçe"
    return "E-ticaret"


def _parse_json_ld_item(data: dict, url: str, site: str) -> Optional[ScrapedProduct]:
    schema_type = data.get("@type", "")
    if schema_type not in ("Product", "product"):
        return None

    title = data.get("name", "").strip()
    if not title:
        return None

    description = data.get("description", "")

    brand = ""
    if isinstance(data.get("brand"), dict):
        brand = data["brand"].get("name", "")
    elif isinstance(data.get("brand"), str):
        brand = data["brand"]

    image_url = ""
    img = data.get("image")
    if isinstance(img, list) and img:
        image_url = img[0]
    elif isinstance(img, str):
        image_url = img

    price = None
    currency = "TL"
    offers = data.get("offers", {})
    if isinstance(offers, dict):
        price = str(offers.get("price", "")) or None
        currency = offers.get("priceCurrency", "TRY")
    elif isinstance(offers, list) and offers:
        price = str(offers[0].get("price", "")) or None
        currency = offers[0].get("priceCurrency", "TRY")
    if currency == "TRY":
        currency = "TL"

    rating = None
    review_count = None
    agg = data.get("aggregateRating", {})
    if agg:
        rv = agg.get("ratingValue")
        rating = str(rv) if rv else None
        rc = agg.get("reviewCount") or agg.get("ratingCount")
        review_count = int(rc) if rc else None

    return ScrapedProduct(
        url=url,
        title=title,
        price=price,
        currency=currency,
        description=description[:600] if description else None,
        rating=rating,
        review_count=review_count,
        image_url=image_url,
        brand=brand or None,
        site_name=site,
    )


def _extract_json_ld(soup: BeautifulSoup, url: str, site: str) -> Optional[ScrapedProduct]:
    for script in soup.find_all("script", type="application/ld+json"):
        try:
            raw = script.string or ""
            data = json.loads(raw)
            items = data if isinstance(data, list) else [data]
            for item in items:
                product = _parse_json_ld_item(item, url, site)
                if product:
                    return product
        except Exception:
            continue
    return None


def _extract_meta_tags(soup: BeautifulSoup, url: str, site: str) -> Optional[ScrapedProduct]:
    def meta(prop: str) -> str:
        tag = soup.find("meta", property=prop) or soup.find("meta", attrs={"name": prop})
        return tag.get("content", "").strip() if tag else ""

    title = meta("og:title") or (soup.find("title").text.strip() if soup.find("title") else "")
    if not title:
        return None

    return ScrapedProduct(
        url=url,
        title=title,
        description=(meta("og:description") or meta("description"))[:600] or None,
        image_url=meta("og:image") or None,
        price=meta("product:price:amount") or meta("og:price:amount") or None,
        currency=meta("product:price:currency") or "TL",
        site_name=meta("og:site_name") or site,
    )


def _extract_trendyol(soup: BeautifulSoup, url: str) -> Optional[ScrapedProduct]:
    for script in soup.find_all("script"):
        text = script.string or ""
        if "__PRODUCT_DETAIL_APP_INITIAL_STATE__" not in text:
            continue
        try:
            match = re.search(
                r"window\.__PRODUCT_DETAIL_APP_INITIAL_STATE__\s*=\s*(\{.+?\});\s*(?:window\.|</)",
                text,
                re.DOTALL,
            )
            if not match:
                continue
            state = json.loads(match.group(1))
            detail = state.get("product", {}).get("detail", {})
            if not detail:
                continue

            title = detail.get("name", "")
            price_info = detail.get("priceInfo", {})
            price = price_info.get("discountedPrice") or price_info.get("price")
            rating_data = detail.get("ratingScore", {})
            brand_data = detail.get("brand", {})
            images = detail.get("images", [])

            return ScrapedProduct(
                url=url,
                title=title,
                price=str(price) if price else None,
                rating=str(rating_data.get("averageRating")) if rating_data.get("averageRating") else None,
                review_count=rating_data.get("totalCount"),
                brand=brand_data.get("name") if isinstance(brand_data, dict) else None,
                image_url=images[0] if images else None,
                site_name="Trendyol",
            )
        except Exception as e:
            logger.debug(f"Trendyol state parse error: {e}")
    return None


def _extract_akakce(soup: BeautifulSoup, url: str) -> Optional[ScrapedProduct]:
    for script in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(script.string or "")
            if data.get("@type") != "ProductGroup":
                continue

            name = data.get("name", "").strip()
            if not name:
                continue

            brand = ""
            if isinstance(data.get("brand"), dict):
                brand = data["brand"].get("name", "")

            image_url = ""
            imgs = data.get("image", [])
            if isinstance(imgs, list) and imgs:
                image_url = imgs[0].get("contentUrl", "") if isinstance(imgs[0], dict) else imgs[0]
            elif isinstance(imgs, str):
                image_url = imgs

            price = None
            offers = data.get("offers", {})
            if isinstance(offers, dict):
                lp = offers.get("lowPrice")
                if lp:
                    price = str(lp)

            rating = None
            review_count = None
            agg = data.get("aggregateRating", {})
            if agg:
                rv = agg.get("ratingValue")
                rating = str(rv) if rv else None
                rc = agg.get("reviewCount") or agg.get("ratingCount")
                review_count = int(rc) if rc else None

            if not review_count:
                m = re.search(r"(\d+)\s*yorum", soup.get_text(), re.I)
                if m:
                    review_count = int(m.group(1))

            description = data.get("description", "")

            return ScrapedProduct(
                url=url,
                title=name,
                price=price,
                description=description[:600] if description else None,
                rating=rating,
                review_count=review_count,
                image_url=image_url or None,
                brand=brand or None,
                site_name="Akakçe",
            )
        except Exception:
            continue
    return None


def _try_extractors(soup: BeautifulSoup, url: str, site: str) -> Optional[ScrapedProduct]:
    product = _extract_json_ld(soup, url, site)
    if product and product.is_valid():
        return product

    if "trendyol" in url.lower():
        product = _extract_trendyol(soup, url)
        if product and product.is_valid():
            return product

    if "akakce" in url.lower():
        product = _extract_akakce(soup, url)
        if product and product.is_valid():
            return product

    product = _extract_meta_tags(soup, url, site)
    if product and product.is_valid():
        return product

    return None


def _scrape_httpx(url: str) -> Optional[ScrapedProduct]:
    try:
        with httpx.Client(timeout=15, follow_redirects=True) as client:
            resp = client.get(url, headers=HEADERS)
            if resp.status_code != 200:
                logger.warning(f"httpx HTTP {resp.status_code} for {url}")
                return None
            soup = BeautifulSoup(resp.text, "lxml")
            return _try_extractors(soup, url, detect_site(url))
    except Exception as e:
        logger.error(f"httpx scrape error for {url}: {e}")
    return None


def _scrape_curl_cffi(url: str) -> Optional[ScrapedProduct]:
    """Chrome TLS fingerprint'i taklit eder — Cloudflare korumalarını aşar."""
    try:
        from curl_cffi import requests as curl_requests
        session = curl_requests.Session(impersonate="chrome124")
        resp = session.get(
            url,
            headers={
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8",
                "Referer": "https://www.google.com/",
            },
            timeout=20,
        )
        if resp.status_code != 200:
            logger.warning(f"curl_cffi HTTP {resp.status_code} for {url}")
            return None

        soup = BeautifulSoup(resp.text, "lxml")
        return _try_extractors(soup, url, detect_site(url))
    except ImportError:
        logger.warning("curl_cffi not installed")
    except Exception as e:
        logger.error(f"curl_cffi error for {url}: {e}")
    return None


def _extract_title_from_url(url: str) -> Optional[str]:
    path = urlparse(url).path
    ty_match = re.search(r"/[^/]+/(.+?)-p-\d+", path)
    if ty_match:
        slug = ty_match.group(1)
        return slug.replace("-", " ").title()
    last = path.rstrip("/").split("/")[-1]
    if last and len(last) > 5:
        return last.replace("-", " ").replace("_", " ").title()
    return None


async def scrape_product(url: str) -> ScrapedProduct:
    """
    1. httpx (Trendyol, N11, ÇiçekSepeti — JSON-LD/JS state)
    2. curl_cffi (Akakçe — Cloudflare TLS bypass)
    3. URL slug fallback
    """
    product = _scrape_httpx(url)
    if product and product.is_valid():
        logger.info(f"httpx scrape OK: {url}")
        return product

    logger.info(f"curl_cffi fallback: {url}")
    product = _scrape_curl_cffi(url)
    if product and product.is_valid():
        logger.info(f"curl_cffi scrape OK: {url}")
        return product

    title_from_url = _extract_title_from_url(url)
    if title_from_url:
        logger.info(f"URL slug fallback: {title_from_url}")
        return ScrapedProduct(
            url=url,
            title=title_from_url,
            site_name=detect_site(url),
        )

    logger.warning(f"Tüm scraping yöntemleri başarısız: {url}")
    return ScrapedProduct(
        url=url,
        title="",
        site_name=detect_site(url),
        error="Ürün bilgisi alınamadı.",
    )
