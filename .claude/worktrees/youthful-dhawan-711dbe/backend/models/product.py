from pydantic import BaseModel
from typing import List, Optional

class ReviewInput(BaseModel):
    review: str

class ProductAnalysisRequest(BaseModel):

    url: str

class PriceAnalysis(BaseModel):
    current: float
    average: float
    recommendation: str  # "AL", "BEKLE" veya "ALT"

class PriceHistory(BaseModel):
    date: str
    price: float

class ReviewAnalysis(BaseModel):
    total_reviews: int
    fake_percentage: int
    trust_score: int

class ReturnRisk(BaseModel):
    percentage: int
    reasons: List[str]

class ProductAnalysisResponse(BaseModel):
    product_name: str
    store_name: str
    store_url: str
    image_url: str
    ai_comment: str
    price_analysis: PriceAnalysis
    price_history: List[PriceHistory]
    review_analysis: ReviewAnalysis
    return_risk: ReturnRisk
