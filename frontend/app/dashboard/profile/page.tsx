"use client";

import { User } from "lucide-react";
import { MenuButton } from "@/components/menu-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useDashboard } from "@/contexts/dashboard-context";

export default function ProfilePage() {
  const { user } = useDashboard();

  return (
    <>
      <div className="dash-topbar">
        <MenuButton />
        <span className="topbar-title">Profil</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: ".75rem", alignItems: "center" }}>
          <ThemeToggle />
        </div>
      </div>

      <div className="dash-content" style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center", maxWidth: "22rem" }}>
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
            <User style={{ width: 28, height: 28, color: "var(--fg3)" }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--ff-d)",
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "var(--fg)",
              marginBottom: "0.375rem",
            }}
          >
            {user?.name ?? "Kullanıcı"}
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--fg3)", marginBottom: "1rem" }}>{user?.email}</p>
          <p style={{ fontSize: "0.8125rem", color: "var(--fg3)", lineHeight: 1.6 }}>
            Hesap ayarları ve abonelik yönetimi yakında eklenecek.
          </p>
        </div>
      </div>
    </>
  );
}
