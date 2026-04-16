"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="w-full bg-obsidian text-white min-h-[calc(100vh-6rem)] relative overflow-hidden pb-32">
      
      {/* Background Decor */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        className="fixed top-[20%] right-[-20%] w-[60vw] h-[60vw] rounded-full border-[8px] border-mint/10 -z-10 mix-blend-screen mix-blend-mode"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 pt-24">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="font-heading font-black text-6xl md:text-8xl uppercase tracking-tighter mb-16"
        >
          Behind The <br/><span className="text-transparent [-webkit-text-stroke:4px_#5E6AD2]">Brutalism.</span>
        </motion.h1>

        <div className="flex flex-col md:flex-row gap-16 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 space-y-8"
          >
            <div className="p-8 border-4 border-white bg-obsidian shadow-[12px_12px_0px_#3eb489]">
              <h2 className="font-mono text-xl font-bold uppercase text-mint mb-4">Philosophy</h2>
              <p className="font-mono text-base text-gray-300 leading-relaxed">
                Design isn't just about looking pretty. It's about structural integrity, raw emotion, and unapologetic presence. My work bridges the gap between chaotic creativity and rigid grid systems, forming digital identities that demand attention.
              </p>
            </div>
            
            <div className="p-8 border-4 border-white bg-obsidian shadow-[12px_12px_0px_#5E6AD2]">
              <h2 className="font-mono text-xl font-bold uppercase text-peri mb-4">Core Competencies</h2>
              <ul className="font-mono text-base text-gray-300 space-y-2">
                <li>→ Brand Identity Architecture</li>
                <li>→ UI/UX Systems For Startups</li>
                <li>→ Motion & Micro-interactions</li>
                <li>→ Creative Direction</li>
              </ul>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex-1 w-full relative"
          >
            <div className="absolute inset-0 bg-mint translate-x-6 translate-y-6 md:translate-x-12 md:translate-y-12 z-0" />
            <div className="relative border-4 border-white bg-zinc-900 aspect-[3/4] z-10 overflow-hidden group">
              <Image 
                src="/portrait.png" 
                alt="Sazi Working"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
              />
              <div className="absolute top-8 left-8 w-16 h-16 rounded-full border-4 border-peri animate-[spin_10s_linear_infinite]" />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
