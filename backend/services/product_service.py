import json
import os
import re
import logging
from google import genai
from fastapi import HTTPException
from models.product import ProductAnalysisResponse
from services.scraping_service import scrape_product, ScrapedProduct

logger = logging.getLogger(__name__)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def _build_prompt(scraped: ScrapedProduct) -> str:
    product_text = scraped.to_prompt_text()
    return f"""
Sen bir E-ticaret Uzmanı Yapay Zekasın. Aşağıdaki ürün verilerini analiz et ve kapsamlı bir rapor oluştur.

--- ÜRÜN BİLGİLERİ ---
{product_text}
--- ÜRÜN BİLGİLERİ SONU ---

Şunları analiz et:
1. Fiyat değerlendirmesi: Piyasa ortalamasına göre şu an almak mantıklı mı? (AL / BEKLE / ALT)
   - "AL": Fiyat uygun veya iyi fırsat
   - "BEKLE": Fiyat yüksek, indirim beklenmeli
   - "ALT": Fiyat ortalamanın altında, çok iyi fırsat
2. Son 3 aya ait temsili fiyat geçmişi (gerçekçi tahminler üret)
3. Kısa uzman AI yorumu (2-3 cümle, samimi ve yardımcı ol)
4. Yorum güvenilirlik analizi: Sahte yorum oranı tahmini ve genel güven skoru
5. İade riski: Ürün kategorisine ve açıklamasına göre iade olasılığı

SADECE aşağıdaki JSON formatında yanıt ver, başka hiçbir şey yazma:
{{
  "product_name": "{scraped.title}",
  "store_name": "{scraped.site_name}",
  "store_url": "",
  "image_url": "{scraped.image_url or ''}",
  "ai_comment": "string",
  "price_analysis": {{
    "current": 0.0,
    "average": 0.0,
    "recommendation": "AL"
  }},
  "price_history": [
    {{"date": "YYYY-MM-DD", "price": 0.0}}
  ],
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


async def analyze_product_details(url: str) -> ProductAnalysisResponse:
    if not os.getenv("GEMINI_API_KEY"):
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY eksik!")

    # 1. Gerçek veriyi scrape et
    logger.info(f"Scraping başlatılıyor: {url}")
    scraped = await scrape_product(url)

    if not scraped.is_valid():
        logger.warning(f"Scraping başarısız, URL ile devam ediliyor: {url}")
        # Scraping başarısız olursa yalnızca URL ile minimal analiz yap
        from dataclasses import replace
        scraped = replace(scraped, title=f"Ürün ({url[:50]}...)" if len(url) > 50 else f"Ürün ({url})")

    # 2. Temiz ve yapılandırılmış prompt gönder — HTML ASLA GÖNDERİLMEZ
    prompt = _build_prompt(scraped)

    # Model öncelik sırası — kota dolunca bir sonrakine geç
    MODELS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"]

    last_error = None
    response = None
    for model_name in MODELS:
        try:
            logger.info(f"Gemini isteği: model={model_name}, ürün={scraped.title}")
            response = client.models.generate_content(
                model=model_name,
                contents=prompt,
                config={"response_mime_type": "application/json"},
            )
            break
        except Exception as e:
            err_str = str(e)
            if "429" in err_str or "RESOURCE_EXHAUSTED" in err_str:
                logger.warning(f"{model_name} kota doldu, sonraki modele geçiliyor...")
                last_error = e
                continue
            raise

    if response is None:
        raise Exception(f"Tüm Gemini modelleri kota dolu. {last_error}")

    try:

        raw = response.text.strip()
        # Bazen Gemini ```json ... ``` wrapper döndürebilir
        if raw.startswith("```"):
            raw = re.sub(r"^```(?:json)?\n?", "", raw)
            raw = re.sub(r"\n?```$", "", raw)

        data = json.loads(raw)

        # Scraping'den gelen gerçek veriyle zenginleştir
        if scraped.image_url and not data.get("image_url"):
            data["image_url"] = scraped.image_url
        if scraped.price and not data["price_analysis"].get("current"):
            try:
                clean = scraped.price.replace(".", "").replace(",", ".")
                data["price_analysis"]["current"] = float(clean)
            except Exception:
                pass

        logger.info("Gemini analizi başarılı.")
        return ProductAnalysisResponse(**data)

    except Exception as e:
        logger.error(f"Gemini hatası: {e}", exc_info=True)
        raise HTTPException(status_code=503, detail=f"AI Hatası: {str(e)}")
