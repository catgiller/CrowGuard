"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MenuButton } from "@/components/menu-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ApiError } from "@/lib/api";
import { fetchAnalysisHistory, type HistoryItem } from "@/lib/analysis";
import { getToken } from "@/lib/auth";

function formatWhen(iso: string | null) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString("tr-TR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function storeIcon(storeName: string | null) {
  if (!storeName) return "🔗";
  const s = storeName.toLowerCase();
  if (s.includes("trendyol")) return "🛍️";
  if (s.includes("hepsiburada")) return "🛒";
  if (s.includes("amazon")) return "📦";
  return "🔗";
}

function HistoryIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      style={{ width: 28, height: 28, color: "var(--fg3)", margin: "0 auto 1rem", display: "block" }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      setError("Geçmişi görmek için giriş yapmalısınız.");
      return;
    }

    fetchAnalysisHistory(token)
      .then(setItems)
      .catch((err) => {
        setError(err instanceof ApiError ? err.message : "Geçmiş yüklenemedi.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="dash-topbar">
        <MenuButton />
        <span className="topbar-title">Geçmiş</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: ".75rem", alignItems: "center" }}>
          <ThemeToggle />
        </div>
      </div>

      <div className="dash-content">
        {loading ? (
          <p style={{ color: "var(--fg3)", fontSize: "0.875rem" }}>Yükleniyor…</p>
        ) : error ? (
          <div style={{ textAlign: "center", maxWidth: "20rem", margin: "2rem auto" }}>
            <HistoryIcon />
            <p style={{ color: "var(--c3)", fontSize: "0.875rem" }}>{error}</p>
          </div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: "center", maxWidth: "20rem", margin: "2rem auto" }}>
            <HistoryIcon />
            <h2 style={{ fontFamily: "var(--ff-d)", fontSize: "1.125rem", fontWeight: 700, color: "var(--fg)", marginBottom: "0.5rem" }}>
              Geçmiş aramalar
            </h2>
            <p style={{ fontSize: "0.875rem", color: "var(--fg3)", lineHeight: 1.6 }}>
              Henüz kayıtlı bir ürün analiziniz yok. Ürün linki analiz ettiğinizde burada görünür.
            </p>
            <Link href="/dashboard/product-analysis" className="btn btn-grad btn-sm" style={{ marginTop: "1.25rem", display: "inline-flex" }}>
              Analiz başlat
            </Link>
          </div>
        ) : (
          <div className="history-list">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/dashboard/product-analysis?url=${encodeURIComponent(item.url)}`}
                className="history-item"
              >
                <div className="history-icon">{storeIcon(item.store_name)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="history-name">{item.product_name || "Ürün analizi"}</div>
                  <div className="history-meta">
                    {item.store_name ? `${item.store_name} · ` : ""}
                    {formatWhen(item.created_at)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
