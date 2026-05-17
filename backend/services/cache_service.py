import hashlib
import datetime
import logging
from typing import Optional
from sqlalchemy.orm import Session
from models.db_models import AnalysisResult
from services.scraping_service import EXTRACTION_VERSION
from database import SessionLocal

logger = logging.getLogger(__name__)

CACHE_TTL_HOURS = 24


def make_cache_key(url: str) -> str:
    """hash(url + extraction_version) — aynı URL + aynı scraper versiyonu = cache hit."""
    raw = f"{url.strip()}::{EXTRACTION_VERSION}"
    return hashlib.sha256(raw.encode()).hexdigest()


def get_cached(db: Session, cache_key: str) -> Optional[dict]:
    now = datetime.datetime.now(datetime.timezone.utc)
    entry = (
        db.query(AnalysisResult)
        .filter(
            AnalysisResult.cache_key == cache_key,
            AnalysisResult.type == "product",
            AnalysisResult.expires_at > now,
        )
        .order_by(AnalysisResult.created_at.desc())
        .first()
    )
    if entry:
        logger.info(f"Cache HIT: {cache_key[:12]}...")
        return entry.result_data
    logger.info(f"Cache MISS: {cache_key[:12]}...")
    return None


def set_cache(
    db: Session,
    url: str,
    cache_key: str,
    result_data: dict,
    user_id: Optional[int] = None,
    ttl_hours: int = CACHE_TTL_HOURS,
) -> AnalysisResult:
    now = datetime.datetime.now(datetime.timezone.utc)
    entry = AnalysisResult(
        user_id=user_id,
        type="product",
        input_data=url,
        cache_key=cache_key,
        result_data=result_data,
        created_at=now,
        expires_at=now + datetime.timedelta(hours=ttl_hours),
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    logger.info(f"Cache SET (TTL={ttl_hours}h): {cache_key[:12]}...")
    return entry


def set_cache_background(
    url: str,
    cache_key: str,
    result_data: dict,
    user_id: Optional[int] = None,
    ttl_hours: int = CACHE_TTL_HOURS,
) -> None:
    """BackgroundTask için — kendi session'ını açar, request session'ına bağlı değil."""
    db = SessionLocal()
    try:
        set_cache(db, url, cache_key, result_data, user_id, ttl_hours)
    except Exception as e:
        logger.error(f"Cache yazma hatası: {e}")
    finally:
        db.close()
