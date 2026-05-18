import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Çarşıla — Türkiye'nin Pazaryeri",
  description: "Binlerce ürün, en iyi fiyatlar. Çarşıla'da alışveriş yap, farkı hisset.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
