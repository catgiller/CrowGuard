import { apiFetch } from "./api";

export type PriceAnalysis = {
  current: number;
  average: number;
  recommendation: string;
  confidence?: string;
  trend?: string;
  trend_pct?: number;
};

export type PriceHistoryPoint = {
  date: string;
  price: number;
};

export type ReviewAnalysis = {
  total_reviews: number;
  fake_percentage: number;
  trust_score: number;
};

export type ReturnRisk = {
  percentage: number;
  reasons: string[];
};

export type ProductAnalysisResponse = {
  product_name: string;
  store_name: string;
  store_url: string;
  image_url: string;
  ai_comment: string;
  price_analysis: PriceAnalysis;
  price_history: PriceHistoryPoint[];
  review_analysis: ReviewAnalysis;
  return_risk: ReturnRisk;
};

export type HistoryItem = {
  id: number;
  url: string;
  product_name: string | null;
  store_name: string | null;
  created_at: string | null;
  verdict?: string | null;   // AL | BEKLE | ALTERNATİF — backend hazır olunca gelir
  price_history?: PriceHistoryPoint[] | null;
  price_analysis?: PriceAnalysis | null;
};

export type SearchResultItem = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  image: string | null;
  store: string;
  url: string;
};

export function normalizeProductUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (trimmed.includes(" ")) return null;
  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const url = new URL(withProtocol);
    if (!url.hostname.includes(".")) return null;
    return url.href;
  } catch {
    return null;
  }
}

export function searchProducts(q: string, token?: string | null) {
  return apiFetch<SearchResultItem[]>(`/search-products?q=${encodeURIComponent(q)}`, {
    token: token ?? undefined,
  });
}

export function mapRecommendationToVerdict(
  rec: string
): "al" | "bk" | "alt" {
  const r = rec.toUpperCase();
  if (r === "AL" || r === "BUY") return "al";
  if (r === "BEKLE" || r === "WAIT") return "bk";
  return "alt";
}

export function formatTry(amount: number): string {
  return `₺${Math.round(amount).toLocaleString("tr-TR")}`;
}

export function analyzeProduct(url: string, token?: string | null) {
  return apiFetch<ProductAnalysisResponse>("/analyze-product", {
    method: "POST",
    body: JSON.stringify({ url }),
    token: token ?? undefined,
  });
}

export function fetchAnalysisHistory(token: string) {
  return apiFetch<HistoryItem[]>("/history", { token });
}
