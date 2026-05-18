"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

const categories = ["Elektronik", "Ev & Yaşam", "Giyim", "Sağlık & Güzellik", "Spor & Outdoor", "Aksesuar"];

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalCount } = useCart();

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div style={{ background: "linear-gradient(90deg, #1a0a00 0%, var(--brand) 60%, #C44A1A 100%)" }} className="py-1.5 px-4 text-center">
        <span className="text-white/80 text-xs">🚚 500 TL üzeri alışverişlerde <span className="text-amber-300 font-semibold">ücretsiz kargo</span></span>
      </div>

      {/* Main header */}
      <div style={{ backgroundColor: "#fff", borderBottom: "2px solid var(--brand)" }} className="shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <div className="flex items-center gap-2">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-md group-hover:scale-105 transition-transform"
                  style={{ background: "linear-gradient(135deg, var(--brand) 0%, #C44A1A 100%)" }}
                >
                  Ç
                </div>
                <span className="font-black text-xl tracking-tight" style={{ color: "var(--dark)" }}>
                  Çarşıla
                </span>
              </div>
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-2xl hidden md:flex">
              <div className="flex w-full rounded-full overflow-hidden border-2 focus-within:border-orange-400 transition-colors" style={{ borderColor: "var(--border)" }}>
                <input
                  type="text"
                  placeholder="Ürün, marka veya kategori ara..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 px-4 py-2 text-sm outline-none bg-white"
                  style={{ color: "var(--text)" }}
                />
                <button
                  className="px-6 py-2 text-white font-semibold text-sm transition-colors hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, var(--brand), #C44A1A)" }}
                >
                  Ara
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 ml-auto">
              <Link
                href="/profile"
                className="hidden md:flex flex-col items-center gap-0.5 hover:opacity-70 transition-opacity"
                style={{ color: "var(--text)" }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs font-medium">Profil</span>
              </Link>

              <Link href="/cart" className="relative flex flex-col items-center gap-0.5 hover:opacity-70 transition-opacity" style={{ color: "var(--text)" }}>
                <div className="relative">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {totalCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center font-bold" style={{ backgroundColor: "var(--brand)" }}>
                      {totalCount}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium hidden md:block">Sepet</span>
              </Link>

              <button
                className="md:hidden p-1"
                style={{ color: "var(--text)" }}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category bar */}
      <div style={{ backgroundColor: "var(--cream)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden md:flex gap-1 overflow-x-auto">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/category/${encodeURIComponent(cat)}`}
                className="text-xs font-semibold whitespace-nowrap px-3 py-2.5 hover:text-orange-600 transition-colors border-b-2 border-transparent hover:border-orange-500"
                style={{ color: "var(--text)" }}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute w-full shadow-xl z-50" style={{ backgroundColor: "#fff", borderTop: "1px solid var(--border)" }}>
          <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
            <div className="flex rounded-full overflow-hidden border-2" style={{ borderColor: "var(--brand)" }}>
              <input
                type="text"
                placeholder="Ara..."
                className="flex-1 px-4 py-2 text-sm outline-none"
              />
              <button className="px-5 py-2 text-white text-sm font-semibold" style={{ backgroundColor: "var(--brand)" }}>Ara</button>
            </div>
          </div>
          <nav className="p-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/category/${encodeURIComponent(cat)}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 transition-colors text-sm font-medium"
                style={{ color: "var(--text)" }}
                onClick={() => setMenuOpen(false)}
              >
                {cat}
              </Link>
            ))}
            <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 transition-colors text-sm font-medium" style={{ color: "var(--text)" }} onClick={() => setMenuOpen(false)}>
              Profilim
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
