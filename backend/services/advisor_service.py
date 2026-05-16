import json
import os
from google import genai
from models.advisor import AdvisorResponse, RecommendedProduct

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def get_smart_advice(query: str) -> AdvisorResponse:
    prompt = f"""
Sen bir Akıllı Alışveriş Danışmanısın. Kullanıcının isteğine göre en iyi ürün önerilerini sun.
Kullanıcı İsteği: {query}

Analiz et ve en uygun 1-3 ürünü öner. Yanıtında ürün adı, yaklaşık fiyat, neden önerdiğin ve güven skorunu belirt.

YALNIZCA şu formatta geçerli bir JSON döndür:
{{
  "recommendations": [
    {{
      "name": "Ürün Adı",
      "price": float,
      "reason": "Neden bu ürünü önerdiğine dair kısa açıklama",
      "confidence": integer (0-100)
    }}
  ]
}}
"""
    try:
        response = client.models.generate_content(
            model="models/gemini-2.5-flash",
            contents=prompt,
            config={
                'response_mime_type': 'application/json'
            }
        )
        
        data = json.loads(response.text)
        return AdvisorResponse(**data)
    except Exception as e:
        print(f"Gemini Advisor API Hatası: {str(e)}")
        raise Exception("Öneri oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.")
