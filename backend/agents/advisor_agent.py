import json
import os
import logging
from urllib.parse import quote_plus
from google import genai
from services.trends_service import get_product_trend
from services.youtube_service import get_youtube_stats
from services.store_search_service import search_stores, build_store_context

logger = logging.getLogger(__name__)
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

MODELS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"]


def _build_search_urls(name: str) -> dict:
    q = quote_plus(name)
    return {
        "trendyol_url": f"https://www.trendyol.com/sr?q={q}",
        "akakce_url": f"https://www.akakce.com/search/?q={q}",
        "google_shopping_url": f"https://www.google.com/search?q={q}&tbm=shop",
    }


async def run_advisor_agent(user_query: str) -> dict:
    # Her iki mağazada gerçek ürün verisi çek
    store_results = await search_stores(user_query)
    store_context = build_store_context(store_results, user_query)
    has_store_data = any(store_results.values())

    store_section = f"""
Aşağıda Shopgrill ve Carsila mağazalarından gerçek ürün verileri var.
Bu verileri öncelikli olarak kullan:

{store_context}
""" if has_store_data else ""

    prompt = f"""
Sen 'Pitoresk Akıllı Danışman'ısın. Kullanıcı alışveriş tavsiyesi arıyor.
Kullanıcı Sorgusu: "{user_query}"
{store_section}
Talimatlar:
1. Kullanıcının niyetini analiz et (hediye, kişisel ihtiyaç, bütçe vb.).
2. Mağaza verileri varsa onları kullan. Yoksa Türkiye piyasasına göre 1-3 ürün öner.
3. Mağazalar arası fiyat farkı varsa hangisinin daha ucuz olduğunu belirt.
4. Her öneri için kısa ve zekice bir neden sun.
5. Eğer iki mağazada da aynı ürün varsa hangi mağazanın daha iyi olduğunu (fiyat + puan) söyle.

YALNIZCA şu formatta geçerli bir JSON objesi döndür:
{{
  "recommendations": [
    {{
      "name": "Tam Ürün Adı (marka + model)",
      "price": float,
      "reason": "Neden bu ürün? 1-2 cümle.",
      "confidence": integer (0-100),
      "shoprill_price": float or null,
      "carsila_price": float or null,
      "shoprill_slug": "slug" or null,
      "carsila_slug": "slug" or null,
      "cheaper_store": "shoprill" | "carsila" | null,
      "store_note": "Fiyat/puan farkı açıklaması veya null"
    }}
  ]
}}
"""

    raw = None
    for m in MODELS:
        try:
            resp = client.models.generate_content(
                model=m, contents=prompt,
                config={"response_mime_type": "application/json"},
            )
            raw = resp.text
            break
        except Exception as e:
            if "429" in str(e) or "RESOURCE_EXHAUSTED" in str(e):
                continue
            raise

    if raw is None:
        raise Exception("Gemini API kotası doldu. Lütfen birkaç dakika bekleyip tekrar deneyin.")

    data = json.loads(raw)
    recommendations = data.get("recommendations", [])

    enriched = []
    for rec in recommendations:
        name = rec.get("name", "")
        urls = _build_search_urls(name)
        trend = get_product_trend(name)
        yt = get_youtube_stats(name)

        shoprill_slug = rec.get("shoprill_slug")
        carsila_slug = rec.get("carsila_slug")

        enriched.append({
            "name": name,
            "price": rec.get("price", 0.0),
            "reason": rec.get("reason", ""),
            "confidence": rec.get("confidence", 50),
            "trendyol_url": urls["trendyol_url"],
            "akakce_url": urls["akakce_url"],
            "google_shopping_url": urls["google_shopping_url"],
            "trend_direction": trend["direction"],
            "trend_score": trend["score"],
            "youtube_video_count": yt["video_count"],
            "youtube_latest_url": yt["latest_url"],
            "shoprill_price": rec.get("shoprill_price"),
            "carsila_price": rec.get("carsila_price"),
            "shoprill_url": f"https://shopgrill.store/products/{shoprill_slug}" if shoprill_slug else None,
            "carsila_url": f"https://carsila.store/products/{carsila_slug}" if carsila_slug else None,
            "cheaper_store": rec.get("cheaper_store"),
            "store_note": rec.get("store_note"),
        })

    logger.info(f"Advisor: {len(enriched)} öneri, mağaza verisi: {'var' if has_store_data else 'yok'}")
    return {"recommendations": enriched}
