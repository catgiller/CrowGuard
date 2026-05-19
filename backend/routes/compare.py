from fastapi import APIRouter, Depends
from pydantic import BaseModel
from services.compare_service import compare_products
from auth.dependencies import get_current_user_optional

router = APIRouter()


class CompareRequest(BaseModel):
    url1: str
    url2: str


@router.post("/compare")
async def compare(data: CompareRequest, _=Depends(get_current_user_optional)):
    return await compare_products(data.url1.strip(), data.url2.strip())
