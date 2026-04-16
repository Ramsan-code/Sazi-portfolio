"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface BeforeAfterSliderProps {
  beforeLabel?: string;
  afterLabel?: string;
  beforeTheme?: string;
  afterTheme?: string;
  onComplete?: () => void;
}

export function BeforeAfterSlider({
  beforeLabel = "Original",
  afterLabel = "Reimagined",
  beforeTheme = "linear-gradient(45deg, #222 25%, #111 25%, #111 50%, #222 50%, #222 75%, #111 75%, #111 100%)",
  afterTheme = "linear-gradient(45deg, #3eb489 25%, #0b0b0b 25%, #0b0b0b 50%, #3eb489 50%, #3eb489 75%, #0b0b0b 75%, #0b0b0b 100%)",
  onComplete,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(50);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  
  const widthTransform = useTransform(springX, (v) => `${v}%`);
  const leftTransform = useTransform(springX, (v) => `${v}%`);

  const [hasCompleted, setHasCompleted] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = ((clientX - rect.left) / rect.width) * 100;
    const clampedPos = Math.max(0, Math.min(100, pos));
    x.set(clampedPos);

    if (clampedPos > 95 && !hasCompleted) {
      setHasCompleted(true);
      onComplete?.();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video border-8 border-obsidian bg-zinc-900 overflow-hidden cursor-ew-resize select-none"
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* "After" State (Background) */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: afterTheme, backgroundSize: "40px 40px" }}
      >
        <div className="absolute top-8 right-8 bg-obsidian text-white font-mono font-bold px-4 py-2 border-4 border-white tracking-widest uppercase">
          {afterLabel}
        </div>
      </div>

      {/* "Before" State (Foreground Clip) */}
      <motion.div
        className="absolute inset-0 z-10 border-r-8 border-obsidian"
        style={{
          width: widthTransform,
          background: beforeTheme,
          backgroundSize: "40px 40px",
        }}
      >
        <div className="absolute top-8 left-8 bg-white text-obsidian font-mono font-bold px-4 py-2 border-4 border-obsidian tracking-widest uppercase whitespace-nowrap">
          {beforeLabel}
        </div>
      </motion.div>

      {/* Scrubber Handle */}
      <motion.div
        className="absolute top-0 bottom-0 z-20 w-12 -ml-6 bg-obsidian flex items-center justify-center border-x-4 border-white cursor-grab active:cursor-grabbing"
        style={{ left: leftTransform }}
      >
        <div className="flex gap-1 text-white font-black text-xl">
          <span>{"\u2039"}</span>
          <span>{"\u203a"}</span>
        </div>
      </motion.div>

      {/* Grid Overlay for Brutalist Feel */}
      <div className="absolute inset-0 pointer-events-none border-4 border-obsidian/20 z-30" />
    </div>
  );
}
