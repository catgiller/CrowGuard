"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cg-a11y";

export function AccessibilityToggle() {
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) === "1";
    setActive(saved);
    if (saved) document.documentElement.classList.add("a11y");
    setMounted(true);
  }, []);

  function toggle() {
    const next = !active;
    setActive(next);
    localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    document.documentElement.classList.toggle("a11y", next);
  }

  if (!mounted) return null;

  return (
    <button
      className={`theme-btn${active ? " a11y-btn-active" : ""}`}
      onClick={toggle}
      aria-label={active ? "Erişilebilirlik modunu kapat" : "Erişilebilirlik modunu aç"}
      title={active ? "Erişilebilirlik: Açık" : "Erişilebilirlik: Kapalı"}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
        <circle cx="12" cy="4" r="1.5" fill="currentColor" stroke="none" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5m0 0l-3 4m3-4l3 4M9 10l-3-1m9 1l3-1" />
      </svg>
    </button>
  );
}
