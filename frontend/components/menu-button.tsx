"use client";

import { useDashboard } from "@/contexts/dashboard-context";

export function MenuButton() {
  const { openSidebar } = useDashboard();

  return (
    <button
      type="button"
      className="menu-btn"
      aria-label="Menüyü aç"
      onClick={openSidebar}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
}
