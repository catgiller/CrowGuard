"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { AccessibilityToggle } from "@/components/accessibility-toggle";

export function FloatingControls() {
  return (
    <div className="floating-controls" role="toolbar" aria-label="Görünüm ayarları">
      <AccessibilityToggle />
      <ThemeToggle />
    </div>
  );
}
