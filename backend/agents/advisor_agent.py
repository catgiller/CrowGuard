import json
import os
from google import genai

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def run_advisor_agent(user_query: str):
    prompt = f"""
Sen 'CrowGuard Akıllı Danışman'ısın. Kullanıcı alışveriş tavsiyesi arıyor.
Kullanıcı Sorgusu: "{user_query}"

Talimatlar:
1. Kullanıcının niyetini analiz et (hediye, kişisel ihtiyaç, bütçe vb.).
2. Gerçek dünyada var olan 1-3 uygun ürün öner.
3. Her seçim için kısa ve zekice bir neden sun.

YALNIZCA şu formatta geçerli bir JSON objesi döndür:
{{
  "recommendations": [
    {{
      "name": "Ürün Adı",
      "price": float,
      "reason": "Neden bu ürün?",
      "confidence": integer (0-100)
    }}
  ]
}}
"""
    MODELS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"]
    response = None
    for m in MODELS:
        try:
            response = client.models.generate_content(
                model=m, contents=prompt,
                config={'response_mime_type': 'application/json'}
            )
            break
        except Exception as e:
            if "429" in str(e) or "RESOURCE_EXHAUSTED" in str(e):
                continue
            raise
    if response is None:
        raise Exception("Tüm Gemini modelleri kota dolu.")
    return json.loads(response.text)
