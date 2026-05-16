import json
import os
from google import genai

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

MODELS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"]


def analyze_review(review: str):
    prompt = f"""
You are an expert Fake Review Detection AI. Your task is to analyze the provided product or service review and determine if it is likely to be genuine or fake (fraudulent/manipulated).

Consider the following criteria in your analysis:
1. Sentiment Extremity: Are the praises or criticisms overly dramatic without specific details?
2. Technical Detail: Does the reviewer mention specific features or personal experiences, or is the text generic?
3. Linguistic Patterns: Look for repetitive phrasing, robotic structure, or "marketing-speak".
4. Logical Consistency: Does the review make sense for a real human experience?

Instructions:
- Analyze the review regardless of the language (it could be Turkish, English, etc.).
- Return ONLY a valid JSON object.
- Be objective and provide clear reasons.

Format:
{{
  "is_fake": boolean,
  "confidence": integer (0-100),
  "reasons": ["short reason 1", "short reason 2", ...]
}}

Review to analyze:
"{review}"
"""
    response = None
    for m in MODELS:
        try:
            response = client.models.generate_content(
                model=m, contents=prompt,
                config={"response_mime_type": "application/json"},
            )
            break
        except Exception as e:
            if "429" in str(e) or "RESOURCE_EXHAUSTED" in str(e):
                continue
            raise
    if response is None:
        raise Exception("Tüm Gemini modelleri kota dolu.")
    return json.loads(response.text)
