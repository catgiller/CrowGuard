"use client";

import { History } from "lucide-react";
import { MenuButton } from "@/components/menu-button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function HistoryPage() {
  return (
    <>
      <div className="dash-topbar">
        <MenuButton />
        <span className="topbar-title">Geçmiş</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: ".75rem", alignItems: "center" }}>
          <ThemeToggle />
        </div>
      </div>

      <div className="dash-content" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center", maxWidth: "20rem" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "var(--r-lg)",
              background: "var(--bg2)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
            }}
          >
            <History style={{ width: 28, height: 28, color: "var(--fg3)" }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--ff-d)",
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "var(--fg)",
              marginBottom: "0.5rem",
            }}
          >
            Geçmiş aramalar
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--fg3)", lineHeight: 1.6 }}>
            Yaptığınız aramalar burada görünecek. Henüz bir arama yapılmadı.
          </p>
        </div>
      </div>
    </>
  );
}
