"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
export function NavLogo() {
  const pathname = usePathname() || "";
  const href = pathname.startsWith("/dashboard") ? "/dashboard" : "/";

  return (
    <Link href={href} className="flex items-center gap-2 group shrink-0">
      {/* Crow icon — SVG drawn inline, no external file needed */}
      <div className="relative w-9 h-9 shrink-0">
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#f89957" />
              <stop offset="30%"  stopColor="#f17628" />
              <stop offset="55%"  stopColor="#d5332a" />
              <stop offset="80%"  stopColor="#d260a5" />
              <stop offset="100%" stopColor="#a21f65" />
            </linearGradient>
          </defs>
          {/* Shield base */}
          <path d="M18 3L5 8v10c0 7.4 5.6 13.4 13 15 7.4-1.6 13-7.6 13-15V8L18 3z" fill="url(#logoGrad)" opacity="0.15"/>
          <path d="M18 3L5 8v10c0 7.4 5.6 13.4 13 15 7.4-1.6 13-7.6 13-15V8L18 3z" stroke="url(#logoGrad)" strokeWidth="1.5" fill="none"/>
          {/* Crow silhouette */}
          <path d="M12 20c0-3.3 2.7-6 6-6 1.6 0 3 .6 4.1 1.6L24 14l-1.5 3H24l-2 2.5c.3.6.5 1.3.5 2 0 3.3-2.7 6-6 6s-6-2.7-6-6z" fill="url(#logoGrad)"/>
          <circle cx="20" cy="19" r="1" fill="white" opacity="0.9"/>
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span
          className="text-2xl sm:text-3xl font-black tracking-tighter leading-none text-transparent bg-clip-text"
          style={{
            backgroundImage: "linear-gradient(90deg,#f17628,#d5332a,#d260a5,#a21f65)",
            fontFamily: "var(--font-playfair)",
            filter: "drop-shadow(0 2px 8px rgba(213,51,42,0.25))"
          }}
        >
          CrowGuard
        </span>
        <span
          className="text-[8px] font-bold tracking-[0.45em] ml-0.5 whitespace-nowrap"
          style={{ color: "#d260a5", opacity: 0.8 }}
        >
          SHOPPING ASSISTANT
        </span>
      </div>
    </Link>
  );
}
