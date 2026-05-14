"use client";

import Link from "next/link";
import Image from "next/image";
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
      <Image src="/logo.png" alt="CrowGuard Logo" width={34} height={34} className="object-contain" />

      <span
        className="text-lg sm:text-xl tracking-[0.2em] text-black dark:text-white uppercase leading-none transition-colors"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        CrowGuard <span className="font-light text-gray-400 dark:text-gray-500">AI</span>
      </span>
    </Link>
  );
}
