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
    <Link href={href} className="flex items-center gap-0 group">
      <Image src="/logo.png" alt="CrowGuard Logo" width={68} height={68} className="object-contain drop-shadow-2xl" />
      
      <div className="flex flex-col -gap-1">
        <span 
          className="text-2xl sm:text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 via-sky-400 to-indigo-600 leading-none py-1"
          style={{ 
            fontFamily: "var(--font-playfair)", 
            filter: "drop-shadow(0 2px 10px rgba(99, 102, 241, 0.4))"
          }}
        >
          CrowGuard
        </span>
        <span className="text-[9px] font-bold tracking-[0.5em] text-indigo-400/70 ml-1 whitespace-nowrap">
          SHOPPING ASSISTANT
        </span>
      </div>
    </Link>
  );
}
