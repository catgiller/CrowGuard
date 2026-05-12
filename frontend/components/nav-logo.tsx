"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function NavLogo() {
  const pathname = usePathname() || "";
  const [href, setHref] = useState("/");

  useEffect(() => {
    if (pathname.startsWith("/dashboard")) {
      setHref("/dashboard");
    } else {
      setHref("/");
    }
  }, [pathname]);

  return (
    <Link href={href} className="flex items-center gap-2.5 group">
      {/* Clean SVG logo mark — no background, works in both themes */}
      <svg
        width="34"
        height="34"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-black dark:text-white transition-colors"
      >
        {/* Price tag shape */}
        <path
          d="M4 4.5C4 3.67 4.67 3 5.5 3H15.5L25 12.5V23.5C25 24.33 24.33 25 23.5 25H5.5C4.67 25 4 24.33 4 23.5V4.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Tag hole */}
        <circle cx="9" cy="9" r="1.5" fill="currentColor" />
        {/* P letter */}
        <path
          d="M13 18V11H17C18.66 11 20 12.34 20 14C20 15.66 18.66 17 17 17H13"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span
        className="text-lg sm:text-xl tracking-[0.2em] text-black dark:text-white uppercase leading-none transition-colors"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Pitoresk <span className="font-light text-gray-400 dark:text-gray-500">AI</span>
      </span>
    </Link>
  );
}
