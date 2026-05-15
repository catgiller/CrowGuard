from pydantic import BaseModel
from typing import List

class AdvisorRequest(BaseModel):
    query: str

class RecommendedProduct(BaseModel):
    name: str
    price: float
    reason: str
    confidence: int

class AdvisorResponse(BaseModel):
    recommendations: List[RecommendedProduct]
