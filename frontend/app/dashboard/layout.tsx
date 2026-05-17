"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { DashboardProvider, useDashboard } from "@/contexts/dashboard-context";

function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, initials, isSidebarOpen, closeSidebar } = useDashboard();

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
        <Link href="/dashboard" className="sidebar-logo" onClick={closeSidebar}>
          <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ height: "36px", width: "auto" }}
          >
            <defs>
              <linearGradient
                id="logoGrad"
                x1="0"
                y1="0"
                x2="36"
                y2="36"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#f89957" />
                <stop offset="30%" stopColor="#f17628" />
                <stop offset="55%" stopColor="#d5332a" />
                <stop offset="80%" stopColor="#d260a5" />
                <stop offset="100%" stopColor="#a21f65" />
              </linearGradient>
            </defs>
            <path
              d="M18 3L5 8v10c0 7.4 5.6 13.4 13 15 7.4-1.6 13-7.6 13-15V8L18 3z"
              fill="url(#logoGrad)"
              opacity="0.15"
            />
            <path
              d="M18 3L5 8v10c0 7.4 5.6 13.4 13 15 7.4-1.6 13-7.6 13-15V8L18 3z"
              stroke="url(#logoGrad)"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M12 20c0-3.3 2.7-6 6-6 1.6 0 3 .6 4.1 1.6L24 14l-1.5 3H24l-2 2.5c.3.6.5 1.3.5 2 0 3.3-2.7 6-6 6s-6-2.7-6-6z"
              fill="url(#logoGrad)"
            />
            <circle cx="20" cy="19" r="1" fill="white" opacity="0.9" />
          </svg>
          <span className="sidebar-logo-name">CrowGuard</span>
        </Link>

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
          <div>
            <div style={{ fontSize: ".875rem", fontWeight: 600, color: "var(--fg)" }}>
              {user?.name ?? "Kullanıcı"}
            </div>
            <div style={{ fontSize: ".6875rem", color: "var(--fg3)" }}>Ücretsiz Plan</div>
          </div>
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
