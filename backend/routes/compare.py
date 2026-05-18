from fastapi import APIRouter
from pydantic import BaseModel
from services.compare_service import compare_products

router = APIRouter()


class CompareRequest(BaseModel):
    url1: str
    url2: str


@router.post("/compare")
async def compare(data: CompareRequest):
    return await compare_products(data.url1.strip(), data.url2.strip())
