import logging

logger = logging.getLogger(__name__)


def get_product_trend(product_name: str) -> dict:
    """
    Google Trends'den Türkiye (TR) için ürün arama trendi çeker.
    Döner: {score, direction, data}
    """
    try:
        from pytrends.request import TrendReq
        pt = TrendReq(hl="tr-TR", tz=180, timeout=(10, 25))
        pt.build_payload([product_name], timeframe="today 3-m", geo="TR")
        df = pt.interest_over_time()

        if df.empty or product_name not in df.columns:
            return _empty()

        values = [int(v) for v in df[product_name].tolist()]
        if not values:
            return _empty()

        current_score = values[-1]

        half = max(len(values) // 2, 1)
        early_avg = sum(values[:half]) / half
        recent_avg = sum(values[half:]) / max(len(values) - half, 1)

        if early_avg > 0:
            pct = (recent_avg - early_avg) / early_avg * 100
            direction = "YUKSELIYOR" if pct > 15 else ("DUSUYOR" if pct < -15 else "STABIL")
        else:
            direction = "STABIL"

        dates = [str(d.date()) for d in df.index[-8:]]
        scores = values[-8:]
        data = [{"date": d, "score": s} for d, s in zip(dates, scores)]

        logger.info(f"Trends: {product_name} → {direction} (skor={current_score})")
        return {"score": current_score, "direction": direction, "data": data}

    except Exception as e:
        logger.warning(f"Google Trends hatası ({product_name}): {type(e).__name__}: {str(e)[:80]}")
        return _empty()


def _empty() -> dict:
    return {"score": 0, "direction": "STABIL", "data": []}
