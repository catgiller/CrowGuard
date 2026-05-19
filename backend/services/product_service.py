import json
import os
import re
import logging
import httpx
from google import genai
from fastapi import HTTPException
from models.product import ProductAnalysisResponse
from services.scraping_service import ScrapedProduct
from services.price_algorithm import build_price_history, compute_price_signal
from services.trends_service import get_product_trend
from services.youtube_service import get_youtube_stats

logger = logging.getLogger(__name__)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

MODELS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"]



def _is_url(text: str) -> bool:
    t = text.strip().lower()
    return t.startswith(("http://", "https://", "www."))


def _parse_price(price_str: str) -> float:
    """
    Türkçe (1.350,00) ve İngilizce (1,350.00) fiyat formatlarını doğru parse eder.
    Fiyat string'inden gelen "350.0" gibi float string'leri de düzgün işler.
    """
    s = re.sub(r"[₺TL€$\s]", "", price_str.strip())
    if not s:
        return 0.0

    has_dot = "." in s
    has_comma = "," in s

    if has_dot and has_comma:
        if s.rfind(".") > s.rfind(","):
            s = s.replace(",", "")
        else:
            s = s.replace(".", "").replace(",", ".")
    elif has_comma and not has_dot:
        after_comma = s.split(",")[-1]
        if len(after_comma) == 3:
            s = s.replace(",", "")
        else:
            s = s.replace(",", ".")
    elif has_dot and not has_comma:
        after_dot = s.split(".")[-1]
        if len(after_dot) == 3 and s.replace(".", "").isdigit():
            s = s.replace(".", "")

    try:
        return float(s)
    except ValueError:
        return 0.0


def _build_prompt(scraped: ScrapedProduct) -> str:
    product_text = scraped.to_prompt_text()
    has_real_reviews = bool(scraped.review_count)

    if has_real_reviews:
        review_instruction = (
            "3. Yorum analizi: Verilen yorum sayısını esas al. "
            "fake_percentage ve trust_score tahmini yap."
        )
    else:
        review_instruction = (
            "3. Yorum analizi: Yorum verisi YOK. "
            "fake_percentage ve trust_score için kategori ortalamasını yaz. "
            "ai_comment'te yorum istatistiği YAZMA."
        )

    return f"""
Sen bir E-ticaret Uzmanı Yapay Zekasın.

--- ÜRÜN BİLGİLERİ ---
{product_text}
--- ÜRÜN BİLGİLERİ SONU ---

Görevler:
1. ai_comment: Bu ürün hakkında 2-3 cümle değerlendirme. Fiyat kararı YAZMA (algoritma verecek).
2. average_price: Bu ürün kategorisinin Türkiye piyasasındaki ORTALAMA fiyatı (float, TL).
   Gerçekçi ol — piyasa araştırması yap, tahmin değil.
{review_instruction}
4. İade riski: Ürün kategorisine göre olasılık ve nedenler.

ZORUNLU KURALLAR:
- "total_reviews" alanını 0 olarak bırak, sistem dolduracak.
- Fiyat tavsiyesi (AL/BEKLE) YAZMA — sadece average_price ver, karar algoritma verecek.
- average_price sıfır veya boş bırakma.

SADECE şu JSON formatında yanıt ver:
{{
  "product_name": "{scraped.title}",
  "store_name": "{scraped.site_name}",
  "store_url": "",
  "image_url": "{scraped.image_url or ''}",
  "ai_comment": "string",
  "average_price": 0.0,
  "review_analysis": {{
    "total_reviews": 0,
    "fake_percentage": 0,
    "trust_score": 0
  }},
  "return_risk": {{
    "percentage": 0,
    "reasons": ["string"]
  }}
}}
"""


def _build_name_prompt(product_name: str) -> str:
    return f"""
Sen bir E-ticaret Uzmanı Yapay Zekasın.
Kullanıcı ürün linki yerine ürün adı girdi: "{product_name}"

Görevler:
1. ai_comment: Bu ürün kategorisi hakkında 2-3 cümle genel değerlendirme.
   Gerçek fiyat verisi olmadığından fiyat karşılaştırması yapma.
   Güçlü ve zayıf yönlerini belirt.
2. average_price: Türkiye piyasasındaki ORTALAMA fiyat (float, TL). Gerçekçi ol.
3. Yorum analizi: Bu ürün kategorisinin genel güvenilirliği için tahmin yap.
4. İade riski: Ürün kategorisine göre olasılık ve nedenler.

ZORUNLU KURALLAR:
- "total_reviews" alanını 0 olarak bırak.
- average_price sıfır bırakma.

SADECE şu JSON formatında yanıt ver:
{{
  "product_name": "{product_name}",
  "store_name": "Genel Piyasa",
  "store_url": "",
  "image_url": "",
  "ai_comment": "string",
  "average_price": 0.0,
  "review_analysis": {{
    "total_reviews": 0,
    "fake_percentage": 0,
    "trust_score": 0
  }},
  "return_risk": {{
    "percentage": 0,
    "reasons": ["string"]
  }}
}}
"""


async def _analyze_by_name(product_name: str, db) -> ProductAnalysisResponse:
    prompt = _build_name_prompt(product_name)
    raw = None
    for model_name in MODELS:
        try:
            resp = client.models.generate_content(
                model=model_name,
                contents=prompt,
                config={"response_mime_type": "application/json"},
            )
            raw = resp.text
            break
        except Exception as e:
            logger.warning(f"{model_name} başarısız: {type(e).__name__}: {str(e)[:80]}")
            continue

    if raw is None:
        raise HTTPException(status_code=503, detail="Gemini servisi geçici olarak kullanılamıyor.")

    try:
        raw = raw.strip()
        if raw.startswith("```"):
            raw = re.sub(r"^```(?:json)?\n?", "", raw)
            raw = re.sub(r"\n?```$", "", raw)
        data = json.loads(raw)

        average = float(data.get("average_price") or 0.0)
        price_history, _ = build_price_history(product_name, average, db)

        trend = get_product_trend(product_name)
        yt = get_youtube_stats(product_name)

        return ProductAnalysisResponse(
            product_name=data.get("product_name", product_name),
            store_name="Genel Piyasa",
            store_url="",
            image_url="",
            ai_comment=data.get("ai_comment", ""),
            price_analysis={
                "current": average,
                "average": average,
                "recommendation": "BEKLE",
                "confidence": "SYNTHETIC",
                "trend": trend["direction"],
                "trend_pct": 0.0,
            },
            price_history=price_history,
            review_analysis={
                "total_reviews": 0,
                "fake_percentage": data["review_analysis"].get("fake_percentage", 0),
                "trust_score": data["review_analysis"].get("trust_score", 0),
            },
            return_risk=data.get("return_risk", {"percentage": 0, "reasons": []}),
            google_trend=trend,
            youtube_stats=yt,
        )
    except Exception as e:
        logger.error(f"Ürün adı analiz hatası: {e}", exc_info=True)
        raise HTTPException(status_code=503, detail=f"AI Hatası: {str(e)}")


OWN_STORES = {
    "shopgrill.store": "https://shopgrill.store",
    "carsila.store": "https://carsila.store",
}

# localhost port → store name mapping for local dev
LOCAL_STORE_PORTS = {
    "3001": "shopgrill",
    "3002": "carsila",
    "3003": "carsila",
}


def _extract_slug(url: str) -> str | None:
    m = re.search(r"/products/([^/?#]+)", url)
    return m.group(1) if m else None


def _detect_own_store(url: str) -> str | None:
    for domain, base in OWN_STORES.items():
        if domain in url:
            return base
    # localhost dev: detect by port or path keyword
    from urllib.parse import urlparse as _up
    parsed = _up(url)
    if parsed.hostname in ("localhost", "127.0.0.1"):
        port = str(parsed.port or "")
        if port in LOCAL_STORE_PORTS:
            return f"http://{parsed.hostname}:{port}"
        # fallback: guess by URL keyword
        if "shopgrill" in url.lower():
            return "http://localhost:3001"
        if "carsila" in url.lower():
            return "http://localhost:3002"
    return None


def _get_store_name_from_base(base: str) -> str:
    if "shopgrill" in base:
        return "Shopgrill"
    if "carsila" in base:
        return "Carsila"
    # localhost: guess from port
    from urllib.parse import urlparse as _up
    port = str(_up(base).port or "")
    if port in LOCAL_STORE_PORTS:
        return LOCAL_STORE_PORTS[port].capitalize()
    return "Demo Mağaza"


async def _analyze_own_store(url: str, db) -> ProductAnalysisResponse:
    base = _detect_own_store(url)
    slug = _extract_slug(url)
    if not slug:
        raise HTTPException(status_code=422, detail="URL'den ürün slug'ı çıkarılamadı.")

    async with httpx.AsyncClient(timeout=10) as hc:
        r1 = await hc.get(f"{base}/api/products/{slug}")
        if r1.status_code != 200:
            raise HTTPException(status_code=404, detail="Ürün bulunamadı.")
        product = r1.json()

        r2 = await hc.get(f"{base}/api/products/{slug}/reviews")
        reviews_data = r2.json() if r2.status_code == 200 else {}

        r3 = await hc.get(f"{base}/api/products/{slug}/price-history")
        api_price_history = r3.json().get("priceHistory", []) if r3.status_code == 200 else []

    real_price = float(product.get("price", 0))
    title = product.get("name", "")
    store_name = _get_store_name_from_base(base)

    scraped = ScrapedProduct(
        url=url,
        title=title,
        price=str(real_price),
        description=product.get("description", ""),
        rating=str(product.get("rating", "")),
        review_count=reviews_data.get("reviewCount", product.get("reviewCount", 0)),
        image_url=product.get("images", [""])[0] if product.get("images") else "",
        brand=product.get("brand", ""),
        site_name=store_name,
    )

    prompt = _build_prompt(scraped)
    raw = None
    for model_name in MODELS:
        try:
            resp = client.models.generate_content(
                model=model_name, contents=prompt,
                config={"response_mime_type": "application/json"},
            )
            raw = resp.text
            break
        except Exception as e:
            logger.warning(f"{model_name} başarısız: {e}")
            continue

    if raw is None:
        raise HTTPException(status_code=503, detail="Gemini servisi geçici olarak kullanılamıyor.")

    raw = raw.strip()
    if raw.startswith("```"):
        raw = re.sub(r"^```(?:json)?\n?", "", raw)
        raw = re.sub(r"\n?```$", "", raw)
    data = json.loads(raw)

    average = float(data.get("average_price") or 0.0)

    # Use real price history from our API if available, fall back to synthetic
    if api_price_history:
        price_history = api_price_history
        confidence = "REAL"
    else:
        price_history, confidence = build_price_history(url, real_price, db)

    signal = compute_price_signal(real_price, price_history, average, confidence)

    total_reviews = scraped.review_count or 0
    trust_score = data["review_analysis"].get("trust_score", 0)
    if scraped.rating:
        try:
            trust_score = min(100, int(float(scraped.rating) * 20))
        except Exception:
            pass

    trend = get_product_trend(title)
    yt = get_youtube_stats(title)

    return ProductAnalysisResponse(
        product_name=data.get("product_name", title),
        store_name=store_name,
        store_url=base,
        image_url=scraped.image_url or "",
        ai_comment=data.get("ai_comment", ""),
        price_analysis={
            "current": real_price,
            "average": signal.weighted_average,
            "recommendation": signal.recommendation,
            "confidence": signal.confidence,
            "trend": signal.trend,
            "trend_pct": signal.trend_pct,
        },
        price_history=price_history,
        review_analysis={
            "total_reviews": total_reviews,
            "fake_percentage": data["review_analysis"].get("fake_percentage", 0),
            "trust_score": trust_score,
        },
        return_risk=data.get("return_risk", {"percentage": 0, "reasons": []}),
        google_trend=trend,
        youtube_stats=yt,
    )


async def analyze_product_details(url: str, db) -> ProductAnalysisResponse:
    if not os.getenv("GEMINI_API_KEY"):
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY eksik!")

    if not _is_url(url):
        return await _analyze_by_name(url.strip(), db)

    if not _detect_own_store(url):
        raise HTTPException(
            status_code=422,
            detail="Sadece shopgrill.store ve carsila.store linkleri destekleniyor.",
        )

    return await _analyze_own_store(url, db)
