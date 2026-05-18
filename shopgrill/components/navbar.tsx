"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { label: "Elektronik", href: "/category/Elektronik" },
  { label: "Giyim", href: "/category/Giyim" },
  { label: "Ev & Yaşam", href: "/category/Ev%20%26%20Ya%C5%9Fam" },
  { label: "Sağlık", href: "/category/Sa%C4%9Fl%C4%B1k%20%26%20G%C3%BCzellik" },
  { label: "Spor", href: "/category/Spor%20%26%20Outdoor" },
  { label: "Aksesuar", href: "/category/Aksesuar" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalCount } = useCart();

  return (
    <header className="sticky top-0 z-50">
      <div style={{ backgroundColor: "var(--navy)" }} className="shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center h-16 gap-8">
            <Link href="/" className="flex-shrink-0">
              <span className="font-black text-2xl tracking-tight text-white">
                Shop<span style={{ color: "var(--gold)" }}>rill</span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-1 flex-1">
              {NAV_LINKS.map((l) => (
                <Link key={l.label} href={l.href} className="px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-white/10" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-5 ml-auto">
              <Link href="/profile" className="hidden md:flex items-center gap-1.5 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: "rgba(255,255,255,0.8)" }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Profil
              </Link>
              <Link href="/cart" className="flex items-center gap-1.5 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: "rgba(255,255,255,0.8)" }}>
                <div className="relative">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  {totalCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold text-white" style={{ backgroundColor: "var(--gold)" }}>{totalCount}</span>
                  )}
                </div>
                <span className="hidden md:inline">Sepet</span>
              </Link>
              <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div style={{ backgroundColor: "var(--navy-light)" }} className="md:hidden shadow-xl">
          {NAV_LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="block px-6 py-3.5 text-sm font-medium border-b hover:bg-white/10" style={{ color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.08)" }} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <Link href="/profile" className="block px-6 py-3.5 text-sm font-medium text-white/80" onClick={() => setOpen(false)}>Profilim</Link>
        </div>
      )}
    </header>
  );
}
