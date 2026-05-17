import json
import os
import logging
from urllib.parse import quote_plus
from google import genai
from services.trends_service import get_product_trend
from services.youtube_service import get_youtube_stats

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


def run_advisor_agent(user_query: str) -> dict:
    prompt = f"""
Sen 'Pitoresk Akıllı Danışman'ısın. Kullanıcı alışveriş tavsiyesi arıyor.
Kullanıcı Sorgusu: "{user_query}"

Talimatlar:
1. Kullanıcının niyetini analiz et (hediye, kişisel ihtiyaç, bütçe vb.).
2. Gerçek dünyada var olan 1-3 uygun ürün öner. Türkiye piyasasına uygun fiyatlar ver.
3. Her seçim için kısa ve zekice bir neden sun.

YALNIZCA şu formatta geçerli bir JSON objesi döndür:
{{
  "recommendations": [
    {{
      "name": "Tam Ürün Adı (marka + model)",
      "price": float,
      "reason": "Neden bu ürün? 1-2 cümle.",
      "confidence": integer (0-100)
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

    # Her öneri için link + Google Trends + YouTube zenginleştirmesi
    enriched = []
    for rec in recommendations:
        name = rec.get("name", "")
        urls = _build_search_urls(name)

        trend = get_product_trend(name)
        yt = get_youtube_stats(name)

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
        })

    logger.info(f"Advisor: {len(enriched)} öneri zenginleştirildi")
    return {"recommendations": enriched}
