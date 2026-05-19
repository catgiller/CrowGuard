import hashlib
import random
from datetime import date, timedelta
from dataclasses import dataclass
from typing import List, Tuple


@dataclass
class PriceSignal:
    recommendation: str
    confidence: str
    weighted_average: float
    trend: str
    trend_pct: float


def _weighted_average(prices: List[float]) -> float:
    """Linear weighting: en eski=1, en yeni=n ağırlık."""
    if not prices:
        return 0.0
    n = len(prices)
    weights = range(1, n + 1)
    return sum(p * w for p, w in zip(prices, weights)) / sum(weights)


def _detect_trend(prices: List[float]) -> Tuple[str, float]:
    """İlk yarı ortalaması ile son 2 nokta ortalamasını karşılaştırır."""
    if len(prices) < 3:
        return "STABIL", 0.0
    mid = max(1, len(prices) // 2)
    early = sum(prices[:mid]) / mid
    recent = sum(prices[-2:]) / 2
    if early == 0:
        return "STABIL", 0.0
    pct = (recent - early) / early * 100
    if pct < -5:
        return "DUSUYOR", pct
    if pct > 5:
        return "YUKSELIYOR", pct
    return "STABIL", pct


def _synthetic_history(url: str, current_price: float) -> List[dict]:
    """
    URL hash'inden deterministik geçmiş üretir.
    3 farklı profil — her ürün aynı görünmez:
      profil 0 → Stabil (±8% gürültü)
      profil 1 → İndirim dönemi (geçmiş daha yüksekti)
      profil 2 → Değer kaybı / deflasyon (geçmiş daha düşüktü)
    """
    seed = int(hashlib.md5(url.encode()).hexdigest(), 16) % (2 ** 32)
    rng = random.Random(seed)
    profile = seed % 3

    today = date.today()
    points = []
    for i in range(5, 0, -1):
        d = today - timedelta(days=i * 18)
        if profile == 0:
            v = rng.uniform(0.92, 1.08)
        elif profile == 1:
            v = 1.0 + (i / 5) * rng.uniform(0.08, 0.22)
        else:
            v = 1.0 - (i / 5) * rng.uniform(0.04, 0.14)
        points.append({"date": d.isoformat(), "price": round(current_price * v, 2)})

    points.append({"date": today.isoformat(), "price": current_price})
    return points


def _real_history_from_db(url: str, db) -> List[dict]:
    from models.db_models import AnalysisResult
    rows = (
        db.query(AnalysisResult)
        .filter(
            AnalysisResult.input_data == url,
            AnalysisResult.type == "product",
        )
        .order_by(AnalysisResult.created_at.asc())
        .all()
    )
    points = []
    for r in rows:
        if r.result_data and r.created_at:
            price = r.result_data.get("price_analysis", {}).get("current", 0)
            if price > 0:
                points.append({"date": r.created_at.date().isoformat(), "price": price})
    return points


def build_price_history(url: str, current_price: float, db) -> Tuple[List[dict], str]:
    """Geçmişi oluşturur ve güven seviyesini döner: REAL | MIXED | SYNTHETIC"""
    real = _real_history_from_db(url, db)
    today = date.today().isoformat()

    if len(real) >= 4:
        if real[-1]["date"] != today:
            real.append({"date": today, "price": current_price})
        return real, "REAL"

    synthetic = _synthetic_history(url, current_price)

    if not real:
        return synthetic, "SYNTHETIC"

    combined = {p["date"]: p["price"] for p in synthetic}
    for p in real:
        combined[p["date"]] = p["price"]
    combined[today] = current_price
    history = [{"date": d, "price": p} for d, p in sorted(combined.items())]
    return history, "MIXED"


def compute_price_signal(
    current: float,
    price_history: List[dict],
    gemini_average: float,
    confidence: str,
) -> PriceSignal:
    prices = [p["price"] for p in price_history]

    if not prices or current <= 0:
        return PriceSignal(
            recommendation="BEKLE",
            confidence=confidence,
            weighted_average=gemini_average,
            trend="STABIL",
            trend_pct=0.0,
        )

    weighted_avg = _weighted_average(prices)
    trend, trend_pct = _detect_trend(prices)

    if confidence == "SYNTHETIC":
        ref = gemini_average if gemini_average > 0 else weighted_avg
        if ref <= 0:
            return PriceSignal("BEKLE", confidence, 0.0, trend, trend_pct)
        ratio = current / ref
        if ratio <= 0.82:
            rec = "ALT"
        elif ratio <= 1.00:
            rec = "AL"
        elif ratio <= 1.15:
            rec = "BEKLE"
        else:
            rec = "PAHALI"
        return PriceSignal(rec, confidence, ref, trend, trend_pct)

    ref = weighted_avg if weighted_avg > 0 else gemini_average
    if ref <= 0:
        return PriceSignal("BEKLE", confidence, 0.0, trend, trend_pct)

    ratio = current / ref

    if ratio < 0.85:
        rec = "ALT"
    elif ratio <= 1.05:
        rec = "AL"
    elif ratio <= 1.20:
        rec = "BEKLE"
    else:
        rec = "PAHALI"

    if trend == "DUSUYOR" and rec == "AL" and ratio > 0.96:
        rec = "BEKLE"
    elif trend == "YUKSELIYOR" and rec == "BEKLE" and ratio < 1.12:
        rec = "AL"

    return PriceSignal(rec, confidence, ref, trend, trend_pct)
