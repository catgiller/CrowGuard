import json
import os
from google import genai
from models.product import ProductAnalysisResponse, PriceAnalysis, ReviewAnalysis, ReturnRisk

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def analyze_product_details(url: str) -> ProductAnalysisResponse:
    prompt = f"""
You are an E-commerce Expert AI. Analyze the following product URL and provide a comprehensive analysis.
URL: {url}

Analyze:
1. Product Name (Try to extract from URL if possible, otherwise guess).
2. Price Analysis: Is it a good time to buy? (Compare typical market prices for this type of product).
3. Review Analysis: What is the likely percentage of fake reviews for this category/product?
4. Return Risk: Based on the product type, how likely is a return?

Return ONLY valid JSON in this format:
{{
  "product_name": "string",
  "price_analysis": {{
    "current": float,
    "average": float,
    "recommendation": "AL" or "BEKLE"
  }},
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
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
        config={
            'response_mime_type': 'application/json'
        }
    )
    
    data = json.loads(response.text)
    return ProductAnalysisResponse(**data)
