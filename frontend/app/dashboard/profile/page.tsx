"use client";

import { useEffect, useState } from "react";
import { MenuButton } from "@/components/menu-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useDashboard } from "@/contexts/dashboard-context";
import { fetchAnalysisHistory } from "@/lib/analysis";
import { getToken } from "@/lib/auth";

export default function ProfilePage() {
  const { user, initials, isPro } = useDashboard();
  const [totalAnalysis, setTotalAnalysis] = useState<number | null>(null);
  const [memberSince, setMemberSince] = useState<string>("");

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    fetchAnalysisHistory(token)
      .then((items) => setTotalAnalysis(items.length))
      .catch(() => {});
    // Üyelik tarihi için token'ı decode ediyoruz (JWT payload, imzasız)
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.iat) {
        setMemberSince(
          new Date(payload.iat * 1000).toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        );
      }
    } catch {
      // token decode edilemezse gösterme
    }
  }, []);

  return (
    <>
      <div className="dash-topbar">
        <MenuButton />
        <span className="topbar-title">Profil</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: ".75rem", alignItems: "center" }}>
          <ThemeToggle />
        </div>
      </div>

      <div className="dash-content">
        <div style={{ maxWidth: "480px", width: "100%" }}>

          {/* Avatar + Bilgi */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.75rem" }}>
            <div style={{
              width: 64, height: 64, borderRadius: "var(--r-lg)",
              background: "var(--grad)", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--ff-d)", fontSize: "1.375rem", fontWeight: 800,
              flexShrink: 0,
            }}>
              {initials}
            </div>
            <div>
              <div style={{ fontFamily: "var(--ff-d)", fontSize: "1.25rem", fontWeight: 700, color: "var(--fg)", lineHeight: 1.2 }}>
                {user?.name ?? "Kullanıcı"}
              </div>
              <div style={{ fontSize: "0.875rem", color: "var(--fg3)", marginTop: "0.25rem" }}>
                {user?.email}
              </div>
            </div>
          </div>

          {/* Plan ve istatistikler */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem", marginBottom: "1.5rem" }}>
            <div className="stat-card">
              <div className="stat-val">{totalAnalysis ?? "—"}</div>
              <div className="stat-lbl">Toplam Analiz</div>
            </div>
            <div className="stat-card">
              <div className="stat-val" style={{
                fontSize: "1rem", fontWeight: 700,
                background: isPro ? "var(--grad-h)" : undefined,
                WebkitBackgroundClip: isPro ? "text" : undefined,
                WebkitTextFillColor: isPro ? "transparent" : undefined,
                backgroundClip: isPro ? "text" : undefined,
                color: isPro ? undefined : "var(--fg3)",
              }}>
                {isPro ? "Pro" : "Ücretsiz"}
              </div>
              <div className="stat-lbl">Mevcut Plan</div>
            </div>
          </div>

          {/* Hesap detayları */}
          <div className="cg-card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ fontFamily: "var(--ff-d)", fontSize: "0.875rem", fontWeight: 700, color: "var(--fg)" }}>
              Hesap Bilgileri
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8125rem", color: "var(--fg3)" }}>Ad Soyad</span>
                <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--fg)" }}>{user?.name ?? "—"}</span>
              </div>
              <div style={{ height: 1, background: "var(--border)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8125rem", color: "var(--fg3)" }}>E-posta</span>
                <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--fg)" }}>{user?.email ?? "—"}</span>
              </div>
              <div style={{ height: 1, background: "var(--border)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8125rem", color: "var(--fg3)" }}>Üyelik Tarihi</span>
                <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--fg)" }}>{memberSince || "—"}</span>
              </div>
              <div style={{ height: 1, background: "var(--border)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8125rem", color: "var(--fg3)" }}>Plan</span>
                <span style={{
                  fontSize: "0.75rem", fontWeight: 800,
                  padding: "0.2em 0.75em", borderRadius: "var(--r-full)",
                  background: isPro ? "var(--grad)" : "var(--bg3)",
                  color: isPro ? "#fff" : "var(--fg3)",
                }}>
                  {isPro ? "Pro" : "Ücretsiz"}
                </span>
              </div>
            </div>
          </div>

          {/* Hesap ayarları yakında */}
          <p style={{ fontSize: "0.75rem", color: "var(--fg3)", marginTop: "1.25rem", lineHeight: 1.6 }}>
            Şifre değiştirme ve hesap silme gibi ayarlar yakında eklenecek.
          </p>
        </div>
      </div>
    </>
  );
}
