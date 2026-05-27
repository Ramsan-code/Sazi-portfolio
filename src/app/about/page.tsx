"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BackgroundAccents } from "@/components/BackgroundAccents";

export default function About() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-obsidian text-white pb-24">
      <BackgroundAccents />

      <section className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-20 sm:pt-24 lg:pt-32">

        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="mb-10 sm:mb-14 lg:mb-20"
        >
          <h1 className="font-heading font-black uppercase leading-[0.9] tracking-tight">

            {/* "Behind The" — fluid from ~28px at 320px up to 7rem at lg */}
            <span className="block text-[clamp(1.75rem,8vw,7rem)]">
              Behind The
            </span>

            {/* "Brutalism" — slightly larger, outline style */}
            <span className="block text-[clamp(1.75rem,8vw,7.5rem)] text-transparent [-webkit-text-stroke:1.5px_#5E6AD2] md:[-webkit-text-stroke:3px_#5E6AD2]">
              Brutalism
            </span>
          </h1>
        </motion.div>

        {/* CONTENT */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 space-y-6 sm:space-y-8 w-full"
          >

            {/* PHILOSOPHY */}
            <div className="p-6 sm:p-8 border-4 border-white bg-obsidian shadow-[10px_10px_0px_#3eb489]">
              <h2 className="font-mono text-lg sm:text-xl font-bold uppercase text-mint mb-4 tracking-wide">
                Philosophy
              </h2>
              <p className="font-mono text-sm sm:text-base text-gray-300 leading-relaxed">
                Design is more than aesthetics. It is structure, emotion,
                communication, and identity. My approach combines bold visual
                systems with functional design principles to create impactful
                digital experiences that feel modern, memorable, and alive.
              </p>
            </div>

            {/* SKILLS */}
            <div className="p-6 sm:p-8 border-4 border-white bg-obsidian shadow-[10px_10px_0px_#5E6AD2]">
              <h2 className="font-mono text-lg sm:text-xl font-bold uppercase text-peri mb-5 tracking-wide">
                Core Competencies
              </h2>
              <ul className="font-mono text-sm sm:text-base text-gray-300 space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-mint">→</span>
                  Brand Identity Design
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-mint">→</span>
                  UI/UX Systems For Startups
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-mint">→</span>
                  Motion Graphics & Micro-interactions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-mint">→</span>
                  Creative Direction & Visual Strategy
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-mint">→</span>
                  Social Media & Poster Design
                </li>
              </ul>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1 w-full relative"
          >

            {/* BACKGROUND BLOCK */}
            <div className="absolute inset-0 bg-mint translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5 lg:translate-x-10 lg:translate-y-10 z-0" />

            {/* IMAGE CARD */}
            <div className="relative border-4 border-white bg-zinc-900 aspect-[3/4] overflow-hidden z-10 group">
              <Image
                src="/portrait.png"
                alt="Sazi Balasingam Working"
                fill
                priority
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              />

              {/* ROTATING CIRCLE */}
              <div className="absolute top-5 left-5 sm:top-8 sm:left-8 w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-peri animate-[spin_10s_linear_infinite]" />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  );
}