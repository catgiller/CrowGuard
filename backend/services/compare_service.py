import httpx
import json
import os
import logging
from google import genai
from fastapi import HTTPException

logger = logging.getLogger(__name__)
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
MODELS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"]

STORE_API_MAP = {
    "shoprill.store": "https://shoprill.store",
    "carsila.store": "https://carsila.store",
    "localhost:3001": "http://localhost:3001",
    "localhost:3002": "http://localhost:3002",
}


def _detect_store_base(url: str) -> str | None:
    for domain, base in STORE_API_MAP.items():
        if domain in url:
            return base
    return None


def _extract_slug(url: str) -> str | None:
    # /products/[slug] pattern
    import re
    m = re.search(r"/products/([^/?#]+)", url)
    return m.group(1) if m else None


async def _fetch_product(base_url: str, slug: str) -> dict:
    api_url = f"{base_url}/api/products/{slug}"
    async with httpx.AsyncClient(timeout=10) as client_http:
        resp = await client_http.get(api_url)
        if resp.status_code != 200:
            raise HTTPException(status_code=404, detail=f"Ürün bulunamadı: {api_url}")
        return resp.json()


async def _fetch_reviews(base_url: str, slug: str) -> dict:
    api_url = f"{base_url}/api/products/{slug}/reviews"
    async with httpx.AsyncClient(timeout=10) as client_http:
        resp = await client_http.get(api_url)
        if resp.status_code != 200:
            return {}
        return resp.json()


def _build_compare_prompt(p1: dict, r1: dict, p2: dict, r2: dict) -> str:
    def fmt(p: dict, r: dict) -> str:
        reviews_sample = ""
        if r.get("reviews"):
            sample = r["reviews"][:3]
            reviews_sample = "\n".join(f'  - ({rev["stars"]}★) "{rev["text"]}"' for rev in sample)

        return f"""
Mağaza: {p.get("store", "?")} ({p.get("storeUrl", "")})
Ürün: {p.get("name")}
Fiyat: {p.get("price")} TL
Stok: {p.get("stock")} adet
Puan: {p.get("rating")} / 5 ({r.get("reviewCount", p.get("reviewCount", 0))} yorum)
Açıklama: {p.get("description", "")[:200]}
Özellikler: {", ".join(p.get("features", [])[:5])}
Örnek Yorumlar:
{reviews_sample or "  (yorum yok)"}
""".strip()

    return f"""
Sen bir E-ticaret Karşılaştırma Uzmanısın.

İki farklı mağazada aynı ürünün satış bilgileri:

=== MAĞAZA 1 ===
{fmt(p1, r1)}

=== MAĞAZA 2 ===
{fmt(p2, r2)}

Görevler:
1. Fiyat farkını hesapla ve hangisinin daha ucuz olduğunu belirt.
2. Stok durumunu değerlendir.
3. Müşteri puanlarını ve yorumları karşılaştır.
4. Genel kazanan mağazayı seç (fiyat + güvenilirlik + stok).
5. Kısa ve net bir karşılaştırma özeti yaz (3-4 cümle).

SADECE şu JSON formatında yanıt ver:
{{
  "winner": "store1" | "store2",
  "winner_store": "mağaza adı",
  "winner_reason": "string",
  "price_diff": float,
  "cheaper_store": "mağaza adı",
  "summary": "string",
  "details": {{
    "price_comparison": "string",
    "stock_comparison": "string",
    "review_comparison": "string"
  }}
}}
"""


async def compare_products(url1: str, url2: str) -> dict:
    base1 = _detect_store_base(url1)
    base2 = _detect_store_base(url2)

    if not base1 or not base2:
        raise HTTPException(
            status_code=422,
            detail="Sadece shoprill.store ve carsila.store adresleri destekleniyor.",
        )

    slug1 = _extract_slug(url1)
    slug2 = _extract_slug(url2)

    if not slug1 or not slug2:
        raise HTTPException(
            status_code=422,
            detail="URL'den ürün slug'ı çıkarılamadı. Lütfen /products/[slug] formatında bir URL girin.",
        )

    p1, p2, r1, r2 = await _fetch_product(base1, slug1), await _fetch_product(base2, slug2), await _fetch_reviews(base1, slug1), await _fetch_reviews(base2, slug2)

    prompt = _build_compare_prompt(p1, r1, p2, r2)

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
            logger.warning(f"{model_name} başarısız: {e}")
            continue

    if raw is None:
        raise HTTPException(status_code=503, detail="Gemini servisi geçici olarak kullanılamıyor.")

    ai_result = json.loads(raw)

    return {
        "product1": {
            "store": p1.get("store"),
            "store_url": p1.get("storeUrl"),
            "name": p1.get("name"),
            "price": p1.get("price"),
            "stock": p1.get("stock"),
            "rating": p1.get("rating"),
            "review_count": r1.get("reviewCount", p1.get("reviewCount", 0)),
            "image": p1.get("images", [""])[0] if p1.get("images") else "",
            "url": url1,
        },
        "product2": {
            "store": p2.get("store"),
            "store_url": p2.get("storeUrl"),
            "name": p2.get("name"),
            "price": p2.get("price"),
            "stock": p2.get("stock"),
            "rating": p2.get("rating"),
            "review_count": r2.get("reviewCount", p2.get("reviewCount", 0)),
            "image": p2.get("images", [""])[0] if p2.get("images") else "",
            "url": url2,
        },
        "comparison": ai_result,
    }
