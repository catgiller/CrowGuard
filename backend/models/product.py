from pydantic import BaseModel
from typing import List, Optional

class ReviewInput(BaseModel):
    review: str

class ProductAnalysisRequest(BaseModel):

    url: str

class PriceAnalysis(BaseModel):
    current: float
    average: float
    recommendation: str  # "AL" veya "BEKLE"

class ReviewAnalysis(BaseModel):
    total_reviews: int
    fake_percentage: int
    trust_score: int

class ReturnRisk(BaseModel):
    percentage: int
    reasons: List[str]

class ProductAnalysisResponse(BaseModel):
    product_name: str
    price_analysis: PriceAnalysis
    review_analysis: ReviewAnalysis
    return_risk: ReturnRisk
