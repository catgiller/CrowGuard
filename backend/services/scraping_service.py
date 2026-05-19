from dataclasses import dataclass
from typing import Optional


@dataclass
class ScrapedProduct:
    url: str
    title: str
    price: Optional[str] = None
    currency: str = "TL"
    description: Optional[str] = None
    rating: Optional[str] = None
    review_count: Optional[int] = None
    image_url: Optional[str] = None
    brand: Optional[str] = None
    site_name: str = "Unknown"
    error: Optional[str] = None

    _BLOCKED_KEYWORDS = {"güvenlik", "security", "403", "captcha", "robot", "doğrulama", "verification"}

    def is_valid(self) -> bool:
        if not self.title or len(self.title) <= 5:
            return False
        title_lower = self.title.lower()
        return not any(kw in title_lower for kw in self._BLOCKED_KEYWORDS)

    def to_prompt_text(self) -> str:
        lines = [f"Ürün Adı: {self.title}"]
        if self.price:
            lines.append(f"Fiyat: {self.price} {self.currency}")
        if self.brand:
            lines.append(f"Marka: {self.brand}")
        if self.rating:
            lines.append(f"Ortalama Puan: {self.rating}/5")
        if self.review_count:
            lines.append(f"Toplam Yorum: {self.review_count}")
        if self.description:
            lines.append(f"Açıklama: {self.description[:600]}")
        lines.append(f"Mağaza: {self.site_name}")
        return "\n".join(lines)
