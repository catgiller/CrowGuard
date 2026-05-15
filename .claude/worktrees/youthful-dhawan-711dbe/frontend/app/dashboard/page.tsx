"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

/* ── floating orb ── */
function Orb({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="pointer-events-none absolute rounded-full blur-3xl opacity-[0.18] dark:opacity-[0.12]"
      style={style}
    />
  );
}



/* ── plain CTA button ── */
function CtaBtn({
  onClick,
  color,
  gradient,
  label,
}: {
  onClick: () => void;
  color: string;
  gradient: string;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex w-fit items-center gap-2.5 text-sm font-semibold tracking-widest uppercase cursor-pointer ${color}`}
    >
      <span>{label}</span>
      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
      <span
        className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ background: gradient }}
      />
    </button>
  );
}

/* ── panel hover tilt ── */
function TiltPanel({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(srx, [-1, 1], ["4deg", "-4deg"]);
  const rotateY = useTransform(sry, [-1, 1], ["-4deg", "4deg"]);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    rx.set((e.clientY - rect.top) / rect.height - 0.5);
    ry.set((e.clientX - rect.left) / rect.width - 0.5);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, perspective: 800 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex-1 flex flex-col px-10 lg:px-14 group/panel"
    >
      <div className="relative z-10 flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════ */
export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a] transition-colors duration-500 px-4 overflow-hidden">

      {/* ── background orbs ── */}
      <Orb style={{ width: 520, height: 520, top: "-15%", left: "-12%", background: "#6366f1" }} />
      <Orb style={{ width: 480, height: 480, bottom: "-18%", right: "-10%", background: "#a855f7" }} />
      <Orb style={{ width: 300, height: 300, top: "25%", right: "20%", background: "#38bdf8" }} />

      {/* ── Heading ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16 select-none pointer-events-none"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.15em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-[11px] uppercase text-gray-400 dark:text-gray-600 mb-3 font-semibold"
        >
          CrowGuard AI
        </motion.p>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-semibold text-gray-900 dark:text-white/85 tracking-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Bugün ne{" "}
          <span className="bg-gradient-to-r from-sky-400 via-indigo-500 to-pink-500 bg-clip-text text-transparent">
            keşfediyoruz?
          </span>
        </h1>
      </motion.div>

      {/* ── Panels Row ── */}
      <div className="relative w-full max-w-5xl flex flex-col md:flex-row gap-0">

        {/* LEFT — Ürün Analizi */}
        <TiltPanel
          delay={0.25}
        >
          <div className="mb-4">
            <Search className="h-7 w-7 text-indigo-500 dark:text-indigo-400" />
          </div>
            <h2
              className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 bg-gradient-to-br from-indigo-500 via-sky-400 to-cyan-400 bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ürün Analizi
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base font-light leading-relaxed mb-8 max-w-xs">
              Ürün linki ya da isim girin. Fiyat geçmişini, sahte yorum riskini ve en ucuz alternatifleri saniyeler içinde görün.
            </p>
            <CtaBtn
              onClick={() => router.push("/dashboard/product-analysis")}
              color="text-indigo-500 dark:text-indigo-400"
              gradient="linear-gradient(90deg, #6366f1, #38bdf8)"
              label="Analize Başla"
            />
        </TiltPanel>

        {/* CENTER — YA DA */}
        <div className="hidden md:flex items-center justify-center px-6 shrink-0">
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase bg-gradient-to-r from-sky-400 via-indigo-500 to-pink-500 bg-clip-text text-transparent select-none">
            ya da
          </span>
        </div>

        {/* RIGHT — Akıllı Asistan */}
        <TiltPanel
          delay={0.35}
        >
          <div className="mb-4">
            <Sparkles className="h-7 w-7 text-violet-500 dark:text-violet-400" />
          </div>
            <h2
              className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 bg-gradient-to-br from-violet-500 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Akıllı Asistan
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base font-light leading-relaxed mb-8 max-w-xs">
              Ne aradığınızı tam bilmiyorsanız sorun değil. Bütçenizi ve ihtiyacınızı anlatın; yapay zeka en uygun ürünleri bulsun.
            </p>
            <CtaBtn
              onClick={() => router.push("/dashboard/smart-advisor")}
              color="text-violet-500 dark:text-violet-400"
              gradient="linear-gradient(90deg, #7c3aed, #ec4899)"
              label="Asistana Danış"
            />
        </TiltPanel>

      </div>
    </div>
  );
}
