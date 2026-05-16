import json
import os
from google import genai
from fastapi import HTTPException
from models.product import ProductAnalysisResponse, PriceAnalysis, ReviewAnalysis, ReturnRisk
import logging

# Loglama ayarları
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def analyze_product_details(url: str) -> ProductAnalysisResponse:
    if not os.getenv("GEMINI_API_KEY"):
        logger.error("HATA: GEMINI_API_KEY bulunamadı!")
        raise HTTPException(status_code=500, detail="API Anahtarı eksik!")

    prompt = f"""
Sen bir E-ticaret Uzmanı Yapay Zekasın. Aşağıdaki ürün linkini analiz et ve kapsamlı bir rapor sun.
URL: {url}

Analiz etmen gerekenler:
1. Ürün Adı, Mağaza Adı (Trendyol, Hepsiburada vb.) ve Mağaza URL'si.
2. Ürün görseli URL'si (Eğer bulamazsan ürün kategorisine uygun kaliteli bir placeholder görsel üret veya boş bırak).
3. Fiyat Analizi: Şu an almak mantıklı mı? Piyasa ortalaması nedir?
4. Fiyat Geçmişi: Son 3 aya ait temsili fiyat verileri (date, price).
5. AI Yorumu: Ürün hakkında kısa, uzman görüşü.
6. İnceleme Analizi: Sahte yorum oranı ve genel güven skoru.
7. İade Riski: Ürün tipi ve yorumlara göre iade olasılığı.

YALNIZCA şu formatta geçerli bir JSON döndür:
{{
  "product_name": "string",
  "store_name": "string",
  "store_url": "string",
  "image_url": "string",
  "ai_comment": "string",
  "price_analysis": {{
    "current": float,
    "average": float,
    "recommendation": "AL" | "BEKLE" | "ALT"
  }},
  "price_history": [
    {{ "date": "YYYY-MM-DD", "price": float }}
  ],
  "review_analysis": {{
    "total_reviews": integer,
    "fake_percentage": integer,
    "trust_score": integer
  }},
  "return_risk": {{
    "percentage": integer,
    "reasons": ["string"]
  }}
}}
"""
    try:
        logger.info(f"Gemini isteği gönderiliyor: {url}")
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
            config={
                'response_mime_type': 'application/json'
            }
        )
        
        data = json.loads(response.text)
        logger.info("Gemini yanıtı başarıyla alındı.")
        return ProductAnalysisResponse(**data)
    except Exception as e:
        logger.error(f"Gemini API Hatası Yakalandı: {str(e)}", exc_info=True)
        raise HTTPException(status_code=503, detail=f"AI Hatası: {str(e)}")
