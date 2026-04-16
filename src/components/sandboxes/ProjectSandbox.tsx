"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

interface ProjectSandboxProps {
  type: string;
  projectTitle: string;
  beforeTheme?: string;
  afterTheme?: string;
}

export function ProjectSandbox({ type, projectTitle, beforeTheme, afterTheme }: ProjectSandboxProps) {
  const [interacted, setInteracted] = useState(false);

  return (
    <div className="w-full space-y-8 mt-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 px-4 md:px-0">
        <div>
          <h3 className="font-heading font-black text-4xl uppercase tracking-tighter">
            Tactile Demo
          </h3>
          <p className="font-mono text-sm text-peri uppercase font-bold tracking-widest mt-2">
            Experience the transformation of {projectTitle}
          </p>
        </div>
        <div className="bg-white text-obsidian px-4 py-2 border-4 border-obsidian font-mono text-xs font-bold uppercase animate-pulse">
          Interactive Component
        </div>
      </div>

      <div className="relative">
        {type === "before-after" && (
          <BeforeAfterSlider 
            onComplete={() => setInteracted(true)} 
            beforeTheme={beforeTheme}
            afterTheme={afterTheme}
          />
        )}

        <AnimatePresence>
          {interacted && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              className="absolute bottom-4 right-4 z-40 max-w-sm"
            >
              <div className="bg-mint p-6 border-8 border-obsidian shadow-[8px_8px_0px_#0b0b0b]">
                <p className="font-heading font-black text-xl uppercase leading-tight mb-4">
                  Precision Engineering Increases Engagement.
                </p>
                <p className="font-mono text-xs font-bold uppercase text-obsidian mb-6">
                  Ready to apply this structural rigour to your product?
                </p>
                <Link 
                  href="/contact" 
                  className="inline-block w-full text-center bg-obsidian text-white font-mono font-bold uppercase py-3 border-4 border-obsidian hover:bg-white hover:text-obsidian transition-colors duration-150"
                >
                  Start Mission {"->"}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest text-center">
        [ Drag handle to observe structural shift ]
      </p>
    </div>
  );
}
