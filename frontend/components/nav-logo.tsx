"use client";

import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";

export function NavLogo() {
  const pathname = usePathname() || "";
  const href = pathname.startsWith("/dashboard") ? "/dashboard" : "/";

  return <BrandLogo href={href} height={36} />;
}
