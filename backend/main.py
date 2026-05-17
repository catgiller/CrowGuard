from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from routes import analysis, advisor, auth, likes
from database import engine, Base
from dotenv import load_dotenv
import os

load_dotenv()

Base.metadata.create_all(bind=engine)

limiter = Limiter(key_func=get_remote_address, default_limits=["60/minute"])

app = FastAPI(
    title="Pitoresk AI Backend",
    description="Akıllı ürün analiz ve öneri sistemi",
    version="1.0.0",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "https://pitoresk.vercel.app",
    ],
    allow_origin_regex=r"https://pitoresk.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(analysis.router, tags=["Analysis"])
app.include_router(advisor.router, tags=["Advisor"])
app.include_router(likes.router)


@app.get("/")
def home():
    return {"status": "Pitoresk AI Backend is running", "version": "1.0.0"}


@app.get("/health")
def health():
    return {"ok": True}
