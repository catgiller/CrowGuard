"use client";

import { motion, useInView, animate } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
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
    image: "/feature-price.png",
    imageRight: true,
  },
  {
    icon: ScanSearch,
    title: "Gerçek Yorumu\nBottan Ayır",
    desc: "4.9 yıldız görünce sevinme. O yorumların kaçı gerçek, kaçı bot ordusu? Her ürüne sahte-gerçek oranı ve güven skoru — satın almadan önce gerçeği gör.",
    accent: "#f59e0b",
    image: "/feature-review.png",
    imageRight: false,
  },
  {
    icon: Sparkles,
    title: "Ne İstediğini Söyle,\nGerisini Bırak",
    desc: '"Sevgilime hediye, teknoloji sever, 800₺" — sadece yaz. Saatlerce liste taramak yok, onlarca sekme açmak yok. Yapay zeka sana en uygun seçenekleri sıralar.',
    accent: "#818cf8",
    image: "/feature-budget.png",
    imageRight: true,
  },
  {
    icon: ShieldCheck,
    title: "İade Etmeden\nÖnce Bil",
    desc: "Kargo gelmeden önce bil: bu ürünü iade etme ihtimalin %72. Profil, ürün tipi ve geçmiş veriler — pişmanlık yaşamadan karar ver.",
    accent: "#f87171",
    image: "/feature-return.png",
    imageRight: false,
  },
];

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

// 5. Count-up Animation Component
function AnimatedStat({ value, prefix = "", suffix = "", label, delay = 0 }: { value: number, prefix?: string, suffix?: string, label: string, delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        animate(0, value, {
          duration: 1.5,
          ease: "easeOut",
          onUpdate: (v) => setDisplay(Math.round(v)),
        });
      }, delay * 1000);
      return () => clearTimeout(timeout);
    } else {
      setDisplay(0); // Reset when out of view
    }
  }, [isInView, value, delay]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay }} viewport={{ once: false }}>
       <p className="text-4xl sm:text-5xl 2xl:text-7xl font-semibold text-gray-900 dark:text-white mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
         {prefix}{display}{suffix}
       </p>
       <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm 2xl:text-base font-light max-w-[160px] 2xl:max-w-[200px] mx-auto leading-relaxed">{label}</p>
    </motion.div>
  );
}

export default function LandingPage() {
  const introRef = useRef<HTMLDivElement>(null);
  const scrollToIntro = () => introRef.current?.scrollIntoView({ behavior: "smooth" });

  // 1. Navigation State
  const [activeSlide, setActiveSlide] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = slideRefs.current.findIndex((r) => r === entry.target);
            if (index !== -1) setActiveSlide(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    slideRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const totalSlides = 2 + features.length + 1; // Hero + Problem + 4 Features + Footer

  return (
    <main
      className="h-screen overflow-y-scroll snap-y snap-mandatory bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-500 relative"
      style={{ scrollbarWidth: "none" }}
    >
      {/* 1. Dot Navigation (Right Edge) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 pointer-events-auto mix-blend-difference text-white">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => slideRefs.current[i]?.scrollIntoView({ behavior: "smooth" })}
            className="w-2.5 h-2.5 rounded-full transition-all duration-300 relative group"
            style={{
              backgroundColor: activeSlide === i ? "white" : "rgba(255, 255, 255, 0.2)",
              transform: activeSlide === i ? "scale(1.2)" : "scale(1)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* 1. Fixed CTA on Top Right (Appears after hero on Desktop) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: activeSlide > 0 && activeSlide < totalSlides - 1 ? 1 : 0, 
          y: activeSlide > 0 && activeSlide < totalSlides - 1 ? 0 : -20 
        }}
        transition={{ duration: 0.4 }}
        className="fixed top-5 right-6 sm:right-14 z-40 pointer-events-none hidden sm:block"
      >
        <Link 
          href="/login" 
          className="pointer-events-auto bg-gray-900 dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-full font-medium text-sm tracking-wide shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:scale-105 transition-all duration-300"
        >
          Hemen Başla
        </Link>
      </motion.div>

      {/* Mobile Alternative Navbar: Fixed Bottom CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ 
          opacity: activeSlide > 0 && activeSlide < totalSlides - 1 ? 1 : 0, 
          y: activeSlide > 0 && activeSlide < totalSlides - 1 ? 0 : 100 
        }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-40 pointer-events-none sm:hidden"
      >
        <Link 
          href="/login" 
          className="pointer-events-auto flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black w-full py-4 rounded-full font-semibold shadow-[0_8px_30px_rgb(0,0,0,0.2)] active:scale-95 transition-all duration-300"
        >
          Hemen Başla <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>

      {/* ━━━ SLIDE 0: Hero ━━━ */}
      <div ref={(el) => { slideRefs.current[0] = el; }} className="snap-start h-screen flex flex-col relative bg-black overflow-hidden">
        
        {/* 4. Video Poster & Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            poster="/hero-poster.png"
            className="w-full h-full object-cover scale-[1.2] origin-center"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Navbar */}
        <nav className="relative z-10 flex items-center justify-between px-4 sm:px-6 md:px-14 py-5 border-b border-gray-200/20 dark:border-white/10 shrink-0 bg-transparent transition-colors duration-300">
          <div className="text-white">
            <NavLogo />
          </div>
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            <ThemeToggle />
            <Link href="/about" className="hidden md:block text-sm text-white/60 hover:text-white transition-colors tracking-wide">
              Hakkında
            </Link>
            <Link href="/login" className="hidden sm:block text-sm text-white/60 hover:text-white transition-colors tracking-wide">
              Giriş Yap
            </Link>
            <Link
              href="/login"
              className="hidden sm:inline-flex text-sm bg-white text-black px-4 sm:px-5 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors tracking-wide whitespace-nowrap"
            >
              Hemen Başla
            </Link>
          </div>
        </nav>

        {/* Hero content */}
        <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto"
          >
            <h1
              className="text-5xl sm:text-7xl 2xl:text-8xl font-semibold text-white leading-[1.1] mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Alışverişte{" "}
              <span className="italic font-normal text-white/50">bir adım</span>
              <br />
              önde ol.
            </h1>
            <p className="text-white/65 text-lg sm:text-xl 2xl:text-2xl font-light leading-relaxed max-w-xl 2xl:max-w-3xl mx-auto mb-10">
              Karar anınızda yanınızda. Sahte yorum mu, yüksek fiyat mı, iade riski mi — yapay zeka her adımda size rehber.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="group flex items-center gap-2 bg-white text-black w-full sm:w-auto justify-center px-8 py-3.5 2xl:px-10 2xl:py-5 rounded-full font-medium text-sm 2xl:text-lg tracking-wide hover:bg-gray-100 transition-all"
              >
                Ücretsiz Başla
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToIntro();
                }}
                className="flex items-center gap-2 text-white/65 hover:text-white w-full sm:w-auto justify-center px-8 py-3.5 rounded-full border border-white/20 hover:border-white/50 text-sm tracking-wide transition-all"
              >
                Özellikleri Keşfet
              </button>
            </div>
          </motion.div>

          <motion.button
            type="button"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/35"
            onClick={(e) => {
              e.preventDefault();
              scrollToIntro();
            }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.button>
        </section>
      </div>


      {/* ━━━ SLIDE 1: Problem Statement ━━━ */}
      <div
        ref={(el) => { slideRefs.current[1] = el; introRef.current = el; }}
        className="snap-start h-screen flex flex-col items-center justify-center px-6 sm:px-14 text-center relative overflow-hidden bg-white dark:bg-[#0a0a0a]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.03)_0%,_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04)_0%,_transparent_70%)]" />

        <div className="relative z-10 max-w-4xl 2xl:max-w-6xl mx-auto">
          <motion.h2
            {...fallIn(0)}
            className="text-4xl sm:text-6xl 2xl:text-7xl font-semibold text-gray-900 dark:text-white leading-[1.15] mb-8"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Online alışveriş hâlâ{" "}
            <span className="italic font-normal text-gray-400 dark:text-white/40">bir kriz.</span>
          </motion.h2>

          <motion.p
            {...fallIn(0.1)}
            className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl 2xl:text-2xl font-light leading-relaxed max-w-2xl 2xl:max-w-4xl mx-auto mb-14"
          >
            Her 3 üründen birinin yorumları sahte. Fiyatlar saatte değişiyor.
            İade oranları rekor kırıyor. Tüketiciler yanlış kararlar vermeye devam ediyor.
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16">
            {/* 5. Animated Stats */}
            <AnimatedStat value={67} prefix="%" label="Ürünlerin yorumlarında manipülasyon var" delay={0.2} />
            <AnimatedStat value={31} prefix="%" label="Online alışverişler iade ile sonuçlanıyor" delay={0.3} />
            <AnimatedStat value={4} suffix="x" label="Fiyat farkı aynı üründe mağazalar arasında" delay={0.4} />
          </div>

          <motion.p
            {...fallIn(0.65)}
            className="mt-14 text-xl sm:text-2xl font-semibold text-gray-700 dark:text-white/80"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            <span className="tracking-[0.2em] uppercase text-gray-900 dark:text-white font-normal">
              CrowGuard <span className="font-light text-gray-400 dark:text-gray-500">AI</span>
            </span>{"\u00A0"}
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

      {/* ━━━ SLIDES 2–5: Features ━━━ */}
      {features.map((f, idx) => {
        const Icon = f.icon;
        const isLast = idx === features.length - 1;
        const slideIndex = 2 + idx;

        return (
          <div
            key={f.title}
            ref={(el) => { slideRefs.current[slideIndex] = el; }}
            className="snap-start h-screen flex items-center justify-center px-4 sm:px-10 relative bg-white dark:bg-[#0a0a0a] overflow-hidden"
          >
            {/* 3. Accent Aura Background (Subtle glow) */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full blur-[100px] sm:blur-[150px] opacity-[0.04] dark:opacity-[0.06] pointer-events-none transition-all duration-1000"
              style={{ 
                backgroundColor: f.accent,
                transform: activeSlide === slideIndex ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.8)'
              }}
            />

            <div className={`
              relative z-10 flex w-full max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1900px] mx-auto gap-8 md:gap-12 xl:gap-20
              flex-col md:flex-row items-center
              ${!f.imageRight ? "md:flex-row-reverse" : ""}
            `}>

              {/* ── Text ── */}
              <motion.div
                {...slideFrom(f.imageRight ? -60 : 60, 0)}
                className="flex-1 flex flex-col text-center md:text-left items-center md:items-start w-full"
              >
                <motion.div
                  {...fallIn(0.08)}
                  className="mb-6 w-14 h-14 2xl:w-20 2xl:h-20 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${f.accent}18` }}
                >
                  <Icon className="h-7 w-7 2xl:h-10 2xl:w-10" style={{ color: f.accent }} />
                </motion.div>

                <motion.h2
                  {...fallIn(0.15)}
                  className="text-4xl sm:text-5xl md:text-4xl lg:text-6xl 2xl:text-7xl font-semibold leading-snug mb-6 whitespace-pre-line"
                  style={{ fontFamily: "var(--font-playfair)", color: f.accent }}
                >
                  {f.title}
                </motion.h2>

                {/* 2. Mobile Image (Shown under title on small screens) */}
                <motion.div 
                  {...fallIn(0.20)}
                  className="md:hidden w-full h-48 sm:h-64 relative rounded-2xl overflow-hidden shadow-lg mb-6 border border-gray-100 dark:border-white/5"
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] z-10" style={{ background: f.accent }} />
                  <Image src={f.image} alt={f.title} fill className="object-cover" />
                </motion.div>

                <motion.p
                  {...fallIn(0.22)}
                  className="text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:text-xl 2xl:text-2xl leading-relaxed max-w-lg 2xl:max-w-2xl"
                >
                  {f.desc}
                </motion.p>
              </motion.div>

              {/* ── Image Card (hidden on mobile, shown on md+) ── */}
              <motion.div
                {...slideFrom(f.imageRight ? 60 : -60, 0.08)}
                className="hidden md:block flex-1 w-full group cursor-pointer"
              >
                {/* 6. Card Hover Effect (group, group-hover:scale) */}
                <div
                  className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5"
                  style={{ height: "clamp(320px, 55vh, 800px)" }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] z-10"
                    style={{ background: f.accent }}
                  />
                  <Image src={f.image} alt={f.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-700" />
                </div>
              </motion.div>

            </div>
          </div>
        );
      })}

      {/* ━━━ SLIDE 6: CTA + Footer ━━━ */}
      <div 
        ref={(el) => { slideRefs.current[totalSlides - 1] = el; }} 
        className="snap-start h-screen flex flex-col items-center justify-center px-6 sm:px-14 text-center relative bg-white dark:bg-[#0a0a0a] overflow-hidden"
      >
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
              className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black px-12 py-5 rounded-full font-semibold text-base tracking-wide hover:bg-gray-700 dark:hover:bg-gray-100 transition-all hover:scale-105 shadow-xl group"
            >
              Hemen Başla
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* 7. Expanded Premium Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 dark:border-white/5 px-6 sm:px-14 py-6 md:py-8 bg-white/50 dark:bg-[#0a0a0a]/80 backdrop-blur-sm z-20">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0 text-[11px] sm:text-xs tracking-wider text-gray-500 dark:text-gray-400">
            
            {/* Logo Area */}
            <div className="flex flex-col items-center lg:items-start gap-1">
               <span style={{ fontFamily: "var(--font-playfair)" }} className="text-xs sm:text-sm uppercase tracking-widest text-gray-900 dark:text-white font-semibold">
                 CrowGuard <span className="font-light text-gray-400">AI</span>
               </span>
               <span className="hidden sm:block text-[10px] text-gray-400 dark:text-gray-600">Smart Shopping Assistant</span>
            </div>
            
            {/* Links Area */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-items-center sm:justify-center gap-x-12 gap-y-3 sm:gap-6 md:gap-10 font-medium">
              <Link href="/about" className="hover:text-gray-900 dark:hover:text-white transition-colors">Hakkında</Link>
              <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">Gizlilik</Link>
              <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">Koşullar</Link>
              <Link href="/contact" className="hover:text-gray-900 dark:hover:text-white transition-colors">İletişim</Link>
            </div>
            
            {/* Copyright Area */}
            <div className="flex items-center mt-2 lg:mt-0">
              <span className="text-[10px] sm:text-xs">© 2026 CrowGuard AI. <span className="hidden sm:inline">Tüm hakları saklıdır.</span></span>
            </div>

          </div>
        </div>
      </div>

    </main>
  );
}
