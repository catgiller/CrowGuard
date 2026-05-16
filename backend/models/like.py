from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class LikeRequest(BaseModel):
    url: str
    product_name: Optional[str] = None
    action: str  # "like" | "dislike"


class LikeResponse(BaseModel):
    id: int
    url: str
    product_name: Optional[str]
    action: str
    created_at: datetime
