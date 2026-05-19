"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAnalysisHistory, type HistoryItem } from "@/lib/analysis";
import { getToken } from "@/lib/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { MenuButton } from "@/components/menu-button";
import { useDashboard } from "@/contexts/dashboard-context";

export default function DashboardPage() {
  const { user, isPro, setIsPro } = useDashboard();
  const [greeting, setGreeting] = useState("");
  const [icon, setIcon] = useState("");
  const [quickQuery, setQuickQuery] = useState("");
  const [recentHistory, setRecentHistory] = useState<HistoryItem[]>([]);
  const [totalAnalysis, setTotalAnalysis] = useState<number | null>(null);
  const firstName = user?.name?.split(/\s+/)[0] ?? "Kullanıcı";

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    fetchAnalysisHistory(token)
      .then((items) => {
        setTotalAnalysis(items.length);
        setRecentHistory(items.slice(0, 3));
      })
      .catch(() => setRecentHistory([]));
  }, []);

  useEffect(() => {
    const hr = new Date().getHours();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGreeting(hr < 12 ? 'Günaydın' : hr < 18 ? 'İyi günler' : 'İyi akşamlar');
     
    setIcon(hr < 12 ? '☀️' : hr < 18 ? '🌤️' : '🌙');
  }, []);

  return (
    <>
      {/* Topbar */}
      <div className="dash-topbar">
        {/* Menu btn is handled via a global state or ignored since we moved sidebar to layout. 
            For now just a visual button. */}
        <MenuButton />

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginLeft: "auto" }}>
          <ThemeToggle />
        </div>
      </div>

      {/* Content */}
      <div className="dash-content">
        {/* Welcome */}
        <div className="welcome-row">
          <div>
            <h1 className="welcome-greeting">{greeting}, <span>{firstName}</span> {icon}</h1>
            <p className="welcome-sub">
              {isPro
                ? "Pro hesabınızla sınırsız analiz yapabilirsiniz. Hoş geldiniz!"
                : "Bugün 3 analizin kaldı — pişmanlıksız alışveriş için hazır mısın?"}
            </p>
          </div>
          <div>
            {/* Free: usage card */}
            {!isPro && (
              <div className="usage-card">
                <div className="usage-label"><span>Günlük Kullanım</span><strong>2 / 5</strong></div>
                <div className="usage-track"><div className="usage-fill" style={{ width: "40%" }}></div></div>
                <p className="usage-hint">3 analizin kaldı. Sınırsız için Pro&apos;ya geç.</p>
              </div>
            )}
            {/* Pro badge */}
            {isPro && (
              <div className="pro-badge">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                Pro · Sınırsız
              </div>
            )}
          </div>
        </div>

        {/* Quick search */}
        <div className="quick-search">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input
            type="text"
            value={quickQuery}
            onChange={(e) => setQuickQuery(e.target.value)}
            placeholder="Ürün linki yapıştırın (Trendyol, Hepsiburada…)"
          />
          <Link
            href={
              quickQuery.trim()
                ? `/dashboard/product-analysis?url=${encodeURIComponent(quickQuery.trim())}`
                : "/dashboard/product-analysis"
            }
            style={{ padding: ".5em 1em", background: "var(--grad)", color: "#fff", borderRadius: "var(--r-full)", fontSize: ".75rem", fontWeight: 700, textDecoration: "none", flexShrink: 0, whiteSpace: "nowrap" }}
          >
            Analiz Et
          </Link>
        </div>

        {/* Action cards */}
        <div className="action-grid">
          <Link href="/dashboard/product-analysis" className="action-card">
            <div className="action-icon" style={{ background: "rgba(241,118,40,0.12)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#f17628" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </div>
            <div className="action-title">Ürün Analizi</div>
            <p className="action-desc">Fiyat geçmişi, sahte yorum tespiti, iade riski — tek linkle tüm analiz.</p>
            <span className="action-cta" style={{ color: "var(--c2)" }}>Analize Başla <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg></span>
          </Link>
          <Link href="/dashboard/smart-advisor" className="action-card">
            <div className="action-icon" style={{ background: "rgba(162,31,101,0.12)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#a21f65" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            </div>
            <div className="action-title">Akıllı Asistan</div>
            <p className="action-desc">Ne aradığınızı bilmiyorsanız sorun değil — bütçenizi söyleyin, AI bulsun.</p>
            <span className="action-cta" style={{ color: "var(--c6)" }}>Asistana Danış <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg></span>
          </Link>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-val">{totalAnalysis ?? "—"}</div>
            <div className="stat-lbl">Toplam Analiz</div>
            <div className="stat-trend" style={{ color: "var(--fg3)" }}>Tüm zamanlar</div>
          </div>
          <div className="stat-card">
            <div className="stat-val">—</div>
            <div className="stat-lbl">Ort. Güven Skoru</div>
            <div className="stat-trend" style={{ color: "var(--fg3)" }}>Yakında</div>
          </div>
          <div className="stat-card">
            <div className="stat-val">—</div>
            <div className="stat-lbl">Potansiyel Tasarruf</div>
            <div className="stat-trend" style={{ color: "var(--fg3)" }}>Yakında</div>
          </div>
          <div className="stat-card">
            <div className="stat-val">—</div>
            <div className="stat-lbl">Bulunan Alternatif</div>
            <div className="stat-trend" style={{ color: "var(--fg3)" }}>Yakında</div>
          </div>
        </div>

        {/* Recent History */}
        <div>
          <div className="section-head">
            <span className="section-title">Son Aramalar</span>
            <Link href="/dashboard/history" className="section-action">Tümünü Gör →</Link>
          </div>
          <div className="history-list">
            {recentHistory.length > 0 ? (
              recentHistory.map((item) => (
                <Link
                  key={item.id}
                  href={`/dashboard/product-analysis?url=${encodeURIComponent(item.url)}`}
                  className="history-item"
                >
                  <div className="history-icon">🔗</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="history-name">{item.product_name || "Ürün analizi"}</div>
                    <div className="history-meta">{item.store_name || "Analiz"}</div>
                  </div>
                </Link>
              ))
            ) : (
              <p style={{ fontSize: "0.8125rem", color: "var(--fg3)", padding: "0.5rem 0" }}>
                Henüz kayıtlı analiz yok. Bir ürün linki ile başlayın.
              </p>
            )}
            {!isPro && recentHistory.length > 0 && (
              <div className="history-locked">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                Pro hesabıyla tüm geçmişe erişin
              </div>
            )}
          </div>
        </div>

        {/* Upgrade banner (free only) */}
        {!isPro && (
          <div className="upgrade-banner">
            <div>
              <div className="upgrade-title">Sınırsız analize geçin</div>
              <p className="upgrade-sub">Günlük 5 limitini kaldırın, fiyat alarmları, tam geçmiş ve öncelikli destek.</p>
            </div>
            <Link href="/pricing" className="upgrade-btn">Pro&apos;ya Geç →</Link>
          </div>
        )}

      </div>
    </>
  );
}
