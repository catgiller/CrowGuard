import Link from "next/link";
import type { RecommendedProduct } from "@/lib/advisor";
import { formatTry } from "@/lib/analysis";

function RecommendationCard({
  rec,
  index,
}: {
  rec: RecommendedProduct;
  index: number;
}) {
  const href = rec.trendyol_url || rec.akakce_url || rec.google_shopping_url || "";
  const content = (
    <>
      <span className="rcard-num">{String(index + 1).padStart(2, "0")}</span>
      <span className="rcard-icon">🛍️</span>
      <div className="rcard-info">
        <div className="rcard-name">{rec.name}</div>
        <div className="rcard-meta">
          <span>%{rec.confidence} eşleşme</span>
          {rec.trend_direction && rec.trend_direction !== "STABIL" && (
            <span>Trend: {rec.trend_direction}</span>
          )}
        </div>
        <p style={{ fontSize: "0.75rem", color: "var(--fg2)", marginTop: "0.35rem", lineHeight: 1.5 }}>
          {rec.reason}
        </p>
      </div>
      <span className="rcard-price">{formatTry(rec.price)}</span>
    </>
  );

  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="rcard">
        {content}
      </a>
    );
  }

  return (
    <Link href="/dashboard/product-analysis" className="rcard">
      {content}
    </Link>
  );
}

export function AdvisorRecommendations({ items }: { items: RecommendedProduct[] }) {
  if (items.length === 0) {
    return (
      <p style={{ marginTop: "0.5rem", color: "var(--fg3)", fontSize: "0.875rem" }}>
        Uygun öneri bulunamadı.
      </p>
    );
  }

  return (
    <div className="result-cards">
      {items.map((rec, i) => (
        <RecommendationCard key={`${rec.name}-${i}`} rec={rec} index={i} />
      ))}
    </div>
  );
}

