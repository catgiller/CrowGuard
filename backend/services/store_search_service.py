import httpx
import logging
from urllib.parse import quote_plus

logger = logging.getLogger(__name__)

STORES = {
    "shopgrill": "https://shopgrill.store",
    "carsila": "https://carsila.store",
}


async def search_stores(query: str) -> dict[str, list[dict]]:
    """Her iki mağazada ürün ara, ilk 5 sonucu döndür."""
    results = {}
    encoded = quote_plus(query)

    async with httpx.AsyncClient(timeout=8) as client:
        for store_name, base_url in STORES.items():
            try:
                resp = await client.get(f"{base_url}/api/products?q={encoded}")
                if resp.status_code == 200:
                    results[store_name] = resp.json()[:5]
                else:
                    results[store_name] = []
            except Exception as e:
                logger.warning(f"{store_name} arama hatası: {e}")
                results[store_name] = []

    return results


def find_best_match(products: list[dict], query: str) -> dict | None:
    """Sorguyla en alakalı ürünü bul."""
    if not products:
        return None
    q = query.lower()
    for p in products:
        if q in p.get("name", "").lower() or q in p.get("brand", "").lower():
            return p
    return products[0]


def build_store_context(store_results: dict[str, list[dict]], query: str) -> str:
    """Gemini'ye gönderilecek mağaza verisini formatla."""
    lines = []
    for store_name, products in store_results.items():
        store_label = "Shopgrill" if store_name == "shopgrill" else "Carsila"
        base_url = STORES[store_name]
        if not products:
            lines.append(f"[{store_label}]: Bu mağazada '{query}' için ürün bulunamadı.")
            continue
        lines.append(f"[{store_label}] mağazasında bulunan ürünler:")
        for p in products:
            lines.append(
                f"  - {p['name']} | Fiyat: {p['price']} TL | Stok: {p['stock']} adet | "
                f"Puan: {p['rating']}/5 ({p['reviewCount']} yorum) | "
                f"Link: {base_url}/products/{p['slug']}"
            )
    return "\n".join(lines)
