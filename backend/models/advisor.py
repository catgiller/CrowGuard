from pydantic import BaseModel
from typing import List, Optional


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
    shopgrill_price: Optional[float] = None
    carsila_price: Optional[float] = None
    shopgrill_url: Optional[str] = None
    carsila_url: Optional[str] = None
    cheaper_store: Optional[str] = None
    store_note: Optional[str] = None


class AdvisorResponse(BaseModel):
    recommendations: List[RecommendedProduct]
