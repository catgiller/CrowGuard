"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { DashboardProvider, useDashboard } from "@/contexts/dashboard-context";

function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, initials, isSidebarOpen, closeSidebar, logout } = useDashboard();

  useEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);

  return (
    <div style={{ display: "flex", height: "100dvh", overflow: "hidden", width: "100%" }}>
      <div
        className={`overlay ${isSidebarOpen ? "open" : ""}`}
        onClick={closeSidebar}
        aria-hidden={!isSidebarOpen}
      />

      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <BrandLogo
          href="/dashboard"
          height={36}
          variant="sidebar"
          onClick={closeSidebar}
        />

        <p className="sidebar-section">Araçlar</p>
        <ul className="sidebar-nav">
          <li className={`nav-item ${pathname === "/dashboard" ? "active" : ""}`}>
            <Link href="/dashboard" onClick={closeSidebar}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Ana Sayfa
            </Link>
          </li>
          <li className={`nav-item ${pathname === "/dashboard/product-analysis" ? "active" : ""}`}>
            <Link href="/dashboard/product-analysis" onClick={closeSidebar}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              Ürün Analizi
            </Link>
          </li>
          <li className={`nav-item ${pathname === "/dashboard/smart-advisor" ? "active" : ""}`}>
            <Link href="/dashboard/smart-advisor" onClick={closeSidebar}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Akıllı Asistan
            </Link>
          </li>
          <li className={`nav-item ${pathname === "/dashboard/history" ? "active" : ""}`}>
            <Link href="/dashboard/history" onClick={closeSidebar}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Geçmiş
            </Link>
          </li>
          <li className={`nav-item ${pathname === "/dashboard/profile" ? "active" : ""}`}>
            <Link href="/dashboard/profile" onClick={closeSidebar}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Profil
            </Link>
          </li>
        </ul>
        <div className="sidebar-footer">
          <div className="avatar">{initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: ".875rem", fontWeight: 600, color: "var(--fg)" }}>
              {user?.name ?? "Kullanıcı"}
            </div>
            <div style={{ fontSize: ".6875rem", color: "var(--fg3)" }}>Ücretsiz Plan</div>
          </div>
          <button
            type="button"
            onClick={logout}
            style={{
              fontSize: ".6875rem",
              fontWeight: 600,
              color: "var(--c3)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.25rem 0",
            }}
          >
            Çıkış
          </button>
        </div>
      </aside>

      <div className="dash-main">{children}</div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <DashboardShell>{children}</DashboardShell>
    </DashboardProvider>
  );
}

