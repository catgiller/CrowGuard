import type { Metadata } from "next";
import { Manrope, DM_Sans, Crimson_Text } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { FloatingControls } from "@/components/floating-controls";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const crimson = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "CrowGuard — Akıllı Alışveriş Platformu",
  description:
    "Yapay zeka destekli e-ticaret karar platformu. Sahte yorumları tespit et, fiyat takibi yap, doğru ürünü seç.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "CrowGuard — Akıllı Alışveriş Platformu",
    description:
      "Yapay zeka destekli e-ticaret karar platformu. Sahte yorumları tespit et, fiyat takibi yap, doğru ürünü seç.",
    url: "https://crowguard.ai",
    siteName: "CrowGuard",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "CrowGuard",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "CrowGuard — Akıllı Alışveriş Platformu",
    description:
      "Yapay zeka destekli e-ticaret karar platformu. Sahte yorumları tespit et, fiyat takibi yap, doğru ürünü seç.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${manrope.variable} ${dmSans.variable} ${crimson.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <FloatingControls />
        </ThemeProvider>
      </body>
    </html>
  );
}
