import os
import logging
import httpx

logger = logging.getLogger(__name__)

_YT_SEARCH = "https://www.googleapis.com/youtube/v3/search"
_YT_VIDEOS = "https://www.googleapis.com/youtube/v3/videos"


def get_youtube_stats(product_name: str) -> dict:
    """
    YouTube Data API v3 ile Türkçe inceleme videolarını çeker.
    YOUTUBE_API_KEY env değişkeni yoksa boş döner.
    Döner: {video_count, total_views, latest_url, latest_title}
    """
    api_key = os.getenv("YOUTUBE_API_KEY")
    if not api_key:
        return _empty()

    try:
        with httpx.Client(timeout=10) as client:
            # 1. Arama — 100 kota birimi
            search_resp = client.get(_YT_SEARCH, params={
                "part": "snippet",
                "q": f"{product_name} inceleme",
                "type": "video",
                "maxResults": 8,
                "regionCode": "TR",
                "relevanceLanguage": "tr",
                "key": api_key,
            })
            if search_resp.status_code != 200:
                logger.warning(f"YouTube search {search_resp.status_code}")
                return _empty()

            items = search_resp.json().get("items", [])
            if not items:
                return _empty()

            video_ids = [i["id"]["videoId"] for i in items if i.get("id", {}).get("videoId")]
            latest_url = f"https://www.youtube.com/watch?v={video_ids[0]}" if video_ids else ""
            latest_title = items[0]["snippet"]["title"] if items else ""

            # 2. İstatistikler — 1 kota birimi
            stats_resp = client.get(_YT_VIDEOS, params={
                "part": "statistics",
                "id": ",".join(video_ids),
                "key": api_key,
            })
            total_views = 0
            if stats_resp.status_code == 200:
                for v in stats_resp.json().get("items", []):
                    total_views += int(v.get("statistics", {}).get("viewCount", 0))

        logger.info(f"YouTube: {product_name} → {len(video_ids)} video, {total_views:,} görüntülenme")
        return {
            "video_count": len(video_ids),
            "total_views": total_views,
            "latest_url": latest_url,
            "latest_title": latest_title,
        }

    except Exception as e:
        logger.warning(f"YouTube hatası ({product_name}): {type(e).__name__}: {str(e)[:80]}")
        return _empty()


def _empty() -> dict:
    return {"video_count": 0, "total_views": 0, "latest_url": "", "latest_title": ""}
