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
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
        config={
            'response_mime_type': 'application/json'
        }
    )
    return json.loads(response.text)
