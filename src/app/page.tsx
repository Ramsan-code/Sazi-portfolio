"use client";

import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-obsidian text-white overflow-hidden flex flex-col">
      <main className="relative flex-1 flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 lg:px-24 min-h-screen pb-24">
        
        {/* Background Geometric Accents (Animated) */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full border-[8px] border-mint/20 -z-10 mix-blend-screen mix-blend-mode"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          className="absolute top-[-5%] left-[-10%] w-[40vw] h-[40vw] rounded-full border-[8px] border-peri/20 -z-10 mix-blend-screen mix-blend-mode"
        />
        
        {/* Floating Shapes */}
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          className="hidden lg:block absolute top-[15%] right-[40%] w-8 h-8 rounded-full bg-mint"
        />
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 1 }}
          className="hidden lg:block absolute bottom-[20%] left-[30%] w-16 h-8 rounded-full bg-peri rotate-45 hover:scale-125 transition-transform duration-300"
        />
        <motion.div 
          whileHover={{ rotate: 90 }}
          className="hidden lg:block absolute top-[60%] right-[10%] w-6 h-6 rounded-none bg-white rotate-12 transition-transform duration-300 cursor-pointer"
        />

        {/* Navigation */}
        <nav className="absolute top-0 right-0 w-full p-8 flex justify-end gap-8 z-20 font-mono text-sm tracking-widest uppercase">
          <Link href="#work" className="hover:text-mint transition-all duration-150 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_var(--color-mint)] active:translate-y-0 active:translate-x-0 active:shadow-none bg-obsidian px-2 py-1">Work</Link>
          <Link href="#about" className="hover:text-peri transition-all duration-150 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_var(--color-peri)] active:translate-y-0 active:translate-x-0 active:shadow-none bg-obsidian px-2 py-1">About</Link>
          <Link href="#contact" className="hover:text-mint transition-all duration-150 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_var(--color-mint)] active:translate-y-0 active:translate-x-0 active:shadow-none bg-obsidian px-2 py-1">Contact</Link>
        </nav>

        {/* Main Content Layout */}
        <div className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between z-10 gap-16 lg:gap-8 mt-16 lg:mt-0">
          
          {/* Left Side: Typography */}
          <div className="flex-1 flex flex-col space-y-6 md:space-y-10 w-full z-20 relative">
             {/* Interlocking Circles Accent */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 0.7, scale: 1 }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="absolute -top-12 -left-8 flex"
             >
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, ease: "linear", repeat: Infinity }} className="w-16 h-16 rounded-full border-4 border-mint mix-blend-difference" />
               <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, ease: "linear", repeat: Infinity }} className="w-16 h-16 rounded-full border-4 border-peri -ml-8 mix-blend-difference" />
             </motion.div>

            <motion.div 
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
              className="relative inline-block group"
            >
              <h1 className="font-heading font-black text-[12vw] lg:text-[9rem] leading-[0.85] tracking-tighter uppercase relative z-10">
                Sazi
                <br />
                Stark
              </h1>
              {/* Brutalist Shadow / Echo */}
              <div className="absolute top-2 left-3 lg:top-4 lg:left-6 font-heading font-black text-[12vw] lg:text-[9rem] leading-[0.85] tracking-tighter uppercase text-transparent [-webkit-text-stroke:2px_#3eb489] -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300">
                Sazi
                <br />
                Stark
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4, type: "spring", stiffness: 100 }}
              className="flex items-center gap-4"
            >
              <div className="h-1 w-12 bg-white"></div>
              <h2 className="font-mono text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.2em] text-peri uppercase">
                Graphic Designer
              </h2>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="font-mono text-sm sm:text-base max-w-md text-gray-300 leading-relaxed mt-4"
            >
              Forging high-impact visual identities and brutalist digital experiences tailored for disruptive tech startups.
            </motion.p>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="mt-8"
            >
              <Link href="#contact" className="inline-block font-mono font-bold uppercase tracking-widest text-black bg-mint px-8 py-4 border-4 border-obsidian transition-all duration-150 hover:-translate-y-1 hover:-translate-x-1 shadow-[6px_6px_0px_#8f94fb] hover:shadow-[10px_10px_0px_#8f94fb] active:translate-y-0 active:translate-x-0 active:shadow-none">
                Start Project
              </Link>
            </motion.div>
          </div>

          {/* Right Side: Portrait */}
          <div className="flex-1 w-full flex justify-center lg:justify-end relative pb-16 lg:pb-0">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
              className="relative w-[300px] sm:w-[400px] h-[350px] sm:h-[450px] group"
            >
              {/* The Periwinkle Square Decor */}
              <div className="absolute inset-0 bg-peri translate-x-6 translate-y-6 lg:translate-x-10 lg:translate-y-10 z-0 transition-all duration-300 group-hover:translate-x-12 group-hover:translate-y-12"></div>
              
              {/* Image Container */}
              <div className="relative h-full w-full bg-zinc-900 border-4 border-white overflow-hidden z-10 outline-none transition-all duration-300 group-hover:border-8">
                <Image 
                  src="/portrait.png" 
                  alt="Sazi Stark - Graphic Designer"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out scale-100 group-hover:scale-105"
                  priority
                />
                {/* Overlay elements */}
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-mint rotate-12 group-hover:rotate-45 transition-transform duration-300"></div>
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white opacity-50 mix-blend-overlay"></div>
              </div>
              
              {/* Abstract Decorative Lines */}
              <div className="absolute -right-8 top-[20%] h-[60%] w-2 border-l-4 border-dashed border-mint z-20"></div>
            </motion.div>
          </div>

        </div>

      </main>

      <ContactForm />

      {/* Bottom Ticker */}
      <div className="w-full overflow-hidden border-t-4 border-obsidian py-4 bg-peri text-obsidian z-50 flex items-center">
        <div className="font-mono font-bold text-sm md:text-base tracking-widest uppercase whitespace-nowrap flex gap-8 animate-marquee">
          <span>Brand Identity</span>
          <span className="text-white">•</span>
          <span>Web Design</span>
          <span className="text-white">•</span>
          <span>UX/UI</span>
          <span className="text-white">•</span>
          <span>Typography</span>
          <span className="text-white">•</span>
          <span>Creative Direction</span>
          <span className="text-white">•</span>
          <span>Brand Identity</span>
          <span className="text-white">•</span>
          <span>Web Design</span>
          <span className="text-white">•</span>
          <span>UX/UI</span>
          <span className="text-white">•</span>
          <span>Typography</span>
          <span className="text-white">•</span>
          <span>Creative Direction</span>
        </div>
      </div>
      
      {/* Dynamic Marquee CSS directly inline string */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        `
      }} />
    </div>
  );
}
