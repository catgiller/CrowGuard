from fastapi import FastAPI
from pydantic import BaseModel
from services.gemini_service import analyze_review

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Frontend'in erişimine izin ver
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Geliştirme aşamasında her yerden erişime izin veriyoruz
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ReviewInput(BaseModel):
    review: str


@app.post("/analyze-review")
def analyze(data: ReviewInput):
    return analyze_review(data.review)