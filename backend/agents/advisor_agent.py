import json
import os
from google import genai

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def run_advisor_agent(user_query: str):
    prompt = f"""
You are the 'Pitoresk Smart Advisor'. A user is looking for shopping advice.
User Query: "{user_query}"

Instructions:
1. Analyze the user's intent (gift, personal need, budget, etc.).
2. Recommend 3 suitable products that exist in the real world.
3. Provide a brief, clever reason for each choice.
4. Add a summary at the end.

Return ONLY a valid JSON object in this format:
{{
  "recommendations": [
    {{
      "name": "Product Name",
      "price": float,
      "reason": "Why this product?",
      "confidence": integer (0-100)
    }}
  ],
  "summary": "Overall advice for the user"
}}
"""
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config={
            'response_mime_type': 'application/json'
        }
    )
    return json.loads(response.text)
