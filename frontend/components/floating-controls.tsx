"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { AccessibilityToggle } from "@/components/accessibility-toggle";
import { useState, useRef, useEffect } from "react";

export function FloatingControls() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });

  const handleStart = (clientX: number, clientY: number) => {
    if (!dragRef.current) return;
    const rect = dragRef.current.getBoundingClientRect();
    
    const currentPos = { x: rect.left, y: rect.top };
    if (position.x === 0 && position.y === 0) {
      setPosition(currentPos);
      positionRef.current = currentPos;
    }

    offsetRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
    setDragging(true);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!dragging) return;
    
    const newX = clientX - offsetRef.current.x;
    const newY = clientY - offsetRef.current.y;
    
    const w = window.innerWidth;
    const h = window.innerHeight;
    const rect = dragRef.current?.getBoundingClientRect();
    const width = rect?.width || 120;
    const height = rect?.height || 60;
    
    const boundedX = Math.max(16, Math.min(newX, w - width - 16));
    const boundedY = Math.max(16, Math.min(newY, h - height - 16));

    positionRef.current = { x: boundedX, y: boundedY };
    setPosition({ x: boundedX, y: boundedY });
  };

  const handleEnd = () => {
    if (!dragging) return;
    setDragging(false);

    if (!dragRef.current) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const rect = dragRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const padding = 16;
    const leftX = padding;
    const rightX = w - width - padding;
    const topY = padding;
    const bottomY = h - height - padding;

    const currentCenterX = positionRef.current.x + width / 2;
    const currentCenterY = positionRef.current.y + height / 2;

    const snapX = currentCenterX < w / 2 ? leftX : rightX;
    const snapY = currentCenterY < h / 2 ? topY : bottomY;

    positionRef.current = { x: snapX, y: snapY };
    setPosition({ x: snapX, y: snapY });
  };

  // Safe handler references to completely satisfy React hooks exhaustive dependencies rule
  const moveRef = useRef(handleMove);
  const endRef = useRef(handleEnd);

  useEffect(() => {
    moveRef.current = handleMove;
    endRef.current = handleEnd;
  });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => moveRef.current(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        moveRef.current(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    
    const onMouseUp = () => endRef.current();
    const onTouchEnd = () => endRef.current();

    if (dragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", onTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [dragging]);

  const style: React.CSSProperties = {
    position: "fixed",
    zIndex: 500,
    touchAction: "none",
    cursor: dragging ? "grabbing" : "grab",
    ...(position.x === 0 && position.y === 0
      ? {
          bottom: "1.25rem",
          right: "1.25rem",
        }
      : {
          left: `${position.x}px`,
          top: `${position.y}px`,
          bottom: "auto",
          right: "auto",
        }),
    transition: dragging
      ? "none"
      : "left 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.15), top 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.15)",
  };

  return (
    <div
      ref={dragRef}
      className="floating-controls"
      style={style}
      role="toolbar"
      aria-label="Görünüm ayarları"
      onMouseDown={(e) => {
        const target = e.target as HTMLElement;
        if (e.button === 0 && !target.closest("button")) {
          handleStart(e.clientX, e.clientY);
        }
      }}
      onTouchStart={(e) => {
        const target = e.target as HTMLElement;
        if (e.touches.length > 0 && !target.closest("button")) {
          handleStart(e.touches[0].clientX, e.touches[0].clientY);
        }
      }}
    >
      <div className="drag-handle" aria-hidden="true">
        <svg width="12" height="16" viewBox="0 0 12 16" fill="currentColor">
          <circle cx="2" cy="2" r="1.5" />
          <circle cx="2" cy="8" r="1.5" />
          <circle cx="2" cy="14" r="1.5" />
          <circle cx="10" cy="2" r="1.5" />
          <circle cx="10" cy="8" r="1.5" />
          <circle cx="10" cy="14" r="1.5" />
        </svg>
      </div>
      <AccessibilityToggle />
      <ThemeToggle />
    </div>
  );
}
