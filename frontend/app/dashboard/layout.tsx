"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-500 overflow-hidden font-sans">
      <Sidebar isOpen={isOpen} />
      <main className="flex-1 overflow-y-auto relative">
        {/* Toggle Button — animates position with sidebar */}
        <motion.button
          animate={{ x: isOpen ? 276 : 0 }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          onClick={() => setIsOpen((v) => !v)}
          className="fixed top-6 left-4 z-50 p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 active:scale-95 transition-colors duration-200"
        >
          {isOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
        </motion.button>
        {children}
      </main>
    </div>
  );
}
