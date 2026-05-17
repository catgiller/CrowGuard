import { apiFetch } from "./api";

export type RecommendedProduct = {
  name: string;
  price: number;
  reason: string;
  confidence: number;
  trendyol_url?: string;
  akakce_url?: string;
  google_shopping_url?: string;
  trend_direction?: string;
  trend_score?: number;
  youtube_video_count?: number;
  youtube_latest_url?: string;
};

export type AdvisorResponse = {
  recommendations: RecommendedProduct[];
};

export function askSmartAdvisor(query: string) {
  return apiFetch<AdvisorResponse>("/smart-advisor", {
    method: "POST",
    body: JSON.stringify({ query }),
  });
}
