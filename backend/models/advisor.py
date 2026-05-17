from pydantic import BaseModel
from typing import List

class AdvisorRequest(BaseModel):
    query: str

class RecommendedProduct(BaseModel):
    name: str
    price: float
    reason: str
    confidence: int
    trendyol_url: str = ""
    akakce_url: str = ""
    google_shopping_url: str = ""
    trend_direction: str = "STABIL"
    trend_score: int = 0
    youtube_video_count: int = 0
    youtube_latest_url: str = ""

class AdvisorResponse(BaseModel):
    recommendations: List[RecommendedProduct]
