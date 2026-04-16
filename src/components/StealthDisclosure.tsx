"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Unlock } from "lucide-react";

interface StealthDisclosureProps {
  content: string;
  label?: string;
}

export function StealthDisclosure({ content, label = "Confidential Insight" }: StealthDisclosureProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="w-full border-4 border-obsidian bg-white p-8 mb-16 relative overflow-hidden group">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          {isRevealed ? <Unlock className="text-mint w-6 h-6" /> : <ShieldAlert className="text-red-500 w-6 h-6" />}
          <h4 className="font-heading font-black text-xl uppercase tracking-tighter">
            {label}
          </h4>
        </div>
        <button 
          onClick={() => setIsRevealed(!isRevealed)}
          className={`font-mono font-bold text-xs uppercase px-4 py-2 border-2 border-obsidian transition-all ${
            isRevealed ? "bg-obsidian text-white" : "bg-white text-obsidian hover:bg-zinc-100"
          }`}
        >
          {isRevealed ? "Declassify" : "Authorize Reveal"}
        </button>
      </div>

      <div className="relative min-h-[100px]">
        {/* Hidden Layer (Redacted State) */}
        {!isRevealed && (
          <div 
            className="absolute inset-0 z-10 flex flex-col gap-2 cursor-pointer"
            onClick={() => setIsRevealed(true)}
          >
            <div className="h-4 bg-obsidian w-full" />
            <div className="h-4 bg-obsidian w-3/4" />
            <div className="h-4 bg-obsidian w-5/6" />
            <div className="h-4 bg-obsidian w-1/2" />
            <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="font-mono font-bold text-sm bg-obsidian text-white px-4 py-2">CLICK TO BYPASS ENCRYPTION</span>
            </div>
          </div>
        )}

        {/* Revealed Layer */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              className="font-mono text-sm leading-relaxed text-zinc-600 tracking-wider"
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Placeholder for layout stability */}
        {!isRevealed && <div className="opacity-0 font-mono text-sm">{content}</div>}
      </div>
      
      {/* Decorative Scanning Line */}
      {!isRevealed && (
        <motion.div 
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-1 bg-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.5)] z-20 pointer-events-none"
        />
      )}
    </div>
  );
}
