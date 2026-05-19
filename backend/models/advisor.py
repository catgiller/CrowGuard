from pydantic import BaseModel
from typing import List, Optional


class AdvisorRequest(BaseModel):
    query: str


class RecommendedProduct(BaseModel):
    name: str
    price: float
    reason: str
    confidence: int
    shopgrill_search_url: str = ""
    carsila_search_url: str = ""
    shopgrill_price: Optional[float] = None
    carsila_price: Optional[float] = None
    shopgrill_url: Optional[str] = None
    carsila_url: Optional[str] = None
    cheaper_store: Optional[str] = None
    store_note: Optional[str] = None


class AdvisorResponse(BaseModel):
    recommendations: List[RecommendedProduct]
