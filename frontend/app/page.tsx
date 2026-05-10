"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import {
  TrendingDown,
  ShieldCheck,
  Sparkles,
  ScanSearch,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavLogo } from "@/components/nav-logo";

const features = [
  {
    icon: TrendingDown,
    title: "Doğru Fiyatı,\nDoğru Anda Öde",
    desc: "Şu an almak mantıklı mı? Yarın düşer mi? Kaç lira fazla ödüyorsun? Sormana gerek yok — yapay zeka fiyat geçmişini analiz eder, AL ya da BEKLE kararını sana verir.",
    accent: "#4ade80",
    image: "/feat-price.png",
    imageRight: true,
  },
  {
    icon: ScanSearch,
    title: "Gerçek Yorumu\nBottan Ayır",
    desc: "4.9 yıldız görünce sevinme. O yorumların kaçı gerçek, kaçı bot ordusu? Her ürüne sahte-gerçek oranı ve güven skoru — satın almadan önce gerçeği gör.",
    accent: "#f59e0b",
    image: "/feat-review.png",
    imageRight: false,
  },
  {
    icon: Sparkles,
    title: "Bütçeni Söyle,\nGerisini Bırak",
    desc: '"Sevgilime hediye, teknoloji sever, 800₺" — sadece yaz. Saatlerce liste taramak yok, onlarca sekme açmak yok. Yapay zeka sana en uygun seçenekleri sıralar.',
    accent: "#818cf8",
    image: "/feat-cart2.png",
    imageRight: true,
  },
  {
    icon: ShieldCheck,
    title: "İade Etmeden\nÖnce Bil",
    desc: "Kargo gelmeden önce bil: bu ürünü iade etme ihtimalin %72. Profil, ürün tipi ve geçmiş veriler — pişmanlık yaşamadan karar ver.",
    accent: "#f87171",
    image: "/feat-return2.png",
    imageRight: false,
  },
];

// Fall-in / fall-out animation: once:false → reverses when leaving viewport
const fallIn = (delay = 0, fromY = 70) => ({
  initial: { opacity: 0, y: fromY },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.25 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const slideFrom = (fromX: number, delay = 0) => ({
  initial: { opacity: 0, x: fromX },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: false, amount: 0.25 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function LandingPage() {
  const introRef = useRef<HTMLDivElement>(null);
  const scrollToIntro = () => introRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <main
      className="h-screen overflow-y-scroll snap-y snap-mandatory bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-500"
      style={{ scrollbarWidth: "none" }}
    >

      {/* ━━━ SLIDE 1: Hero (always cinematic dark — video covers entire slide) ━━━ */}
      <div className="snap-start h-screen flex flex-col relative bg-black overflow-hidden">

        {/* Video covers entire slide including navbar */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-[1.2] origin-center">
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Navbar — z-10 so it sits on top of the video */}
        <nav className="relative z-10 flex items-center justify-between px-6 sm:px-14 py-5 border-b border-white/10 shrink-0">
          <NavLogo />
          <div className="flex items-center gap-3 sm:gap-6">
            <ThemeToggle />
            <Link href="/about" className="hidden md:block text-sm text-white/60 hover:text-white transition-colors tracking-wide">
              Hakkında
            </Link>
            <Link href="/login" className="hidden sm:block text-sm text-white/60 hover:text-white transition-colors tracking-wide">
              Giriş Yap
            </Link>
            <Link
              href="/login"
              className="text-sm bg-white text-black px-4 sm:px-5 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors tracking-wide whitespace-nowrap"
            >
              Hemen Başla
            </Link>
          </div>
        </nav>

        {/* Hero content — z-10 on top of video */}
        <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto"
          >
            <h1
              className="text-5xl sm:text-7xl font-semibold text-white leading-[1.1] mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Alışverişte{" "}
              <span className="italic font-normal text-white/50">bir adım</span>
              <br />
              önde ol.
            </h1>
            <p className="text-white/65 text-lg sm:text-xl font-light leading-relaxed max-w-xl mx-auto mb-10">
              Karar anınızda yanınızda. Sahte yorum mu, yüksek fiyat mı, iade riski mi — yapay zeka her adımda size rehber.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="group flex items-center gap-2 bg-white text-black w-full sm:w-auto justify-center px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-gray-100 transition-all"
              >
                Ücretsiz Başla
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={scrollToIntro}
                className="flex items-center gap-2 text-white/65 hover:text-white w-full sm:w-auto justify-center px-8 py-3.5 rounded-full border border-white/20 hover:border-white/50 text-sm tracking-wide transition-all"
              >
                Özellikleri Keşfet
              </button>
            </div>
          </motion.div>

          <motion.button
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/35"
            onClick={scrollToIntro}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.button>
        </section>
      </div>


      {/* ━━━ SLIDE 2: Problem Statement ━━━ */}
      <div
        ref={introRef}
        className="snap-start h-screen flex flex-col items-center justify-center px-6 sm:px-14 text-center relative overflow-hidden bg-white dark:bg-[#0a0a0a]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.03)_0%,_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04)_0%,_transparent_70%)]" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h2
            {...fallIn(0)}
            className="text-4xl sm:text-6xl font-semibold text-gray-900 dark:text-white leading-[1.15] mb-8"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Online alışveriş hâlâ{" "}
            <span className="italic font-normal text-gray-400 dark:text-white/40">bir kriz.</span>
          </motion.h2>

          <motion.p
            {...fallIn(0.1)}
            className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-14"
          >
            Her 3 üründen birinin yorumları sahte. Fiyatlar saatte değişiyor.
            İade oranları rekor kırıyor. Tüketiciler yanlış kararlar vermeye devam ediyor.
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16">
            {[
              { value: "%67", label: "Ürünlerin yorumlarında manipülasyon var" },
              { value: "%31", label: "Online alışverişler iade ile sonuçlanıyor" },
              { value: "4x", label: "Fiyat farkı aynı üründe mağazalar arasında" },
            ].map((stat, i) => (
              <motion.div key={stat.label} {...fallIn(0.2 + i * 0.12)}>
                <p
                  className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {stat.value}
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm font-light max-w-[160px] mx-auto leading-relaxed">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            {...fallIn(0.65)}
            className="mt-14 text-xl sm:text-2xl font-semibold text-gray-700 dark:text-white/80"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            <span className="italic font-normal text-gray-400 dark:text-white/40">Pitoresk AI {"\u00A0"}</span>
            bunu değiştirmek için burada.
          </motion.p>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-300 dark:text-white/20"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </div>

      {/* ━━━ SLIDES 3–6: Features ━━━ */}
      {features.map((f, idx) => {
        const Icon = f.icon;
        const isLast = idx === features.length - 1;

        return (
          <div
            key={f.title}
            className="snap-start h-screen flex items-center justify-center px-4 sm:px-10 relative bg-white dark:bg-[#0a0a0a] overflow-hidden"
          >
            {/* Mobile: feature accent bar at top */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] lg:hidden"
              style={{ background: f.accent }}
            />

            <div className={`
              flex w-full max-w-[1400px] mx-auto gap-8 lg:gap-12 xl:gap-20
              flex-col lg:flex-row items-center
              ${!f.imageRight ? "lg:flex-row-reverse" : ""}
            `}>

              {/* ── Text ── */}
              <motion.div
                {...slideFrom(f.imageRight ? -60 : 60, 0)}
                className="flex-1 flex flex-col text-center lg:text-left items-center lg:items-start"
              >
                {/* Icon — large, decorative, above title */}
                <motion.div
                  {...fallIn(0.08)}
                  className="mb-6 w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${f.accent}18` }}
                >
                  <Icon className="h-7 w-7" style={{ color: f.accent }} />
                </motion.div>

                <motion.h2
                  {...fallIn(0.15)}
                  className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-snug mb-6 whitespace-pre-line"
                  style={{ fontFamily: "var(--font-playfair)", color: f.accent }}
                >
                  {f.title}
                </motion.h2>

                <motion.p
                  {...fallIn(0.22)}
                  className="text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-lg"
                >
                  {f.desc}
                </motion.p>

                {isLast && (
                  <motion.div {...fallIn(0.32)} className="mt-8">
                    <Link
                      href="/login"
                      className="group inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-gray-700 dark:hover:bg-gray-100 transition-all"
                    >
                      Hemen Başla
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                )}
              </motion.div>

              {/* ── Image Card (hidden on mobile, shown on lg+) ── */}
              <motion.div
                {...slideFrom(f.imageRight ? 60 : -60, 0.08)}
                className="hidden lg:block flex-1 w-full"
              >
                <div
                  className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5"
                  style={{ height: "clamp(320px, 55vh, 560px)" }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] z-10"
                    style={{ background: f.accent }}
                  />
                  <Image src={f.image} alt={f.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/15" />
                </div>
              </motion.div>

            </div>
          </div>
        );
      })}

      {/* ━━━ SLIDE 7: CTA + Footer ━━━ */}
      <div className="snap-start h-screen flex flex-col items-center justify-center px-6 sm:px-14 text-center relative bg-white dark:bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.03)_0%,_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />

        <div className="relative z-10">
          <motion.h2
            {...fallIn(0)}
            className="text-4xl sm:text-6xl font-semibold text-gray-900 dark:text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Daha iyi kararlar vermeye<br />
            <span className="italic font-normal text-gray-400 dark:text-white/40">bugün başla.</span>
          </motion.h2>

          <motion.p {...fallIn(0.1)} className="text-gray-500 text-base mb-10 max-w-md mx-auto font-light">
            Ücretsiz hesap oluştur, yapay zeka ajanların anında çalışmaya başlasın.
          </motion.p>

          <motion.div {...fallIn(0.2)}>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-medium text-sm tracking-wide hover:bg-gray-700 dark:hover:bg-gray-100 transition-all group"
            >
              Hemen Başla
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 dark:border-white/5 px-6 sm:px-14 py-5 flex items-center justify-between text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-700">
          <span style={{ fontFamily: "var(--font-playfair)" }}>Pitoresk AI</span>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors">Hakkında</Link>
            <Link href="/login" className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors">Giriş Yap</Link>
          </div>
          <span>© 2026</span>
        </div>
      </div>

    </main>
  );
}
