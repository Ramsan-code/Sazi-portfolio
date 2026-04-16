"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import { BackgroundAccents } from "@/components/BackgroundAccents";
import { ProjectCard } from "@/components/ProjectCard";

export default function Home() {
  const featuredProjects = PROJECTS.slice(0, 2);

  return (
    <div className="relative min-h-[calc(100vh-6rem)] w-full overflow-hidden flex flex-col items-center">
      <BackgroundAccents />
      
      {/* Main Content Layout */}
      <section className="relative w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between z-10 gap-16 md:gap-8 px-4 sm:px-8 md:px-16 pb-24">
        
        {/* Left Side: Typography */}
        <div className="flex-1 flex flex-col space-y-6 md:space-y-10 w-full z-20 relative pt-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute -top-12 -left-8 md:flex hidden"
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
            <h1 className="font-heading font-black text-[15vw] md:text-[9rem] leading-[0.85] tracking-tighter uppercase relative z-10">
              Sazi
              <br />
              Stark
            </h1>
            <div className="absolute top-2 left-3 md:top-4 md:left-6 font-heading font-black text-[15vw] md:text-[9rem] leading-[0.85] tracking-tighter uppercase text-transparent [-webkit-text-stroke:2px_#3eb489] -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300">
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
              Brand & Motion Designer
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="font-mono text-sm sm:text-base max-w-md text-gray-300 leading-relaxed mt-4"
          >
            Forging high-impact visual identities and brutalist digital experiences tailored for disruptive tech startups and innovative creators.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="mt-8 flex gap-4"
          >
            <Link href="/projects" className="inline-block font-mono font-bold uppercase tracking-widest text-black bg-mint px-8 py-4 border-4 border-obsidian transition-all duration-150 hover:-translate-y-1 hover:-translate-x-1 shadow-[6px_6px_0px_#8f94fb] hover:shadow-[10px_10px_0px_#8f94fb] active:translate-y-0 active:translate-x-0 active:shadow-none">
              View Work
            </Link>
            <Link href="/contact" className="inline-block font-mono font-bold uppercase tracking-widest text-white bg-obsidian border-4 border-white px-8 py-4 transition-all duration-150 hover:-translate-y-1 hover:-translate-x-1 hover:border-peri hover:text-peri shadow-[6px_6px_0px_transparent] hover:shadow-[6px_6px_0px_#8f94fb] active:translate-y-0 active:translate-x-0 active:shadow-none">
              Inquire
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Portrait */}
        <div className="flex-1 w-full flex justify-center md:justify-end relative h-full">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
            className="relative w-[300px] md:w-[400px] h-[350px] md:h-[450px] group"
          >
            <div className="absolute inset-0 bg-peri translate-x-6 translate-y-6 md:translate-x-10 md:translate-y-10 z-0 transition-all duration-300 group-hover:translate-x-12 group-hover:translate-y-12"></div>
            
            <div className="relative h-full w-full bg-zinc-900 border-4 border-white overflow-hidden z-10 outline-none transition-all duration-300 group-hover:border-8">
              <Image 
                src="/portrait.png" 
                alt="Sazi  - Graphic Designer"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out scale-100 group-hover:scale-105"
                priority
              />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-mint rotate-12 group-hover:rotate-45 transition-transform duration-300"></div>
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white opacity-50 mix-blend-overlay"></div>
            </div>
            
            <div className="absolute -right-8 top-[20%] h-[60%] w-2 border-l-4 border-dashed border-mint z-20"></div>
          </motion.div>
        </div>

      </section>

      {/* Selected Work Preview Section */}
      <section className="w-full bg-white text-obsidian py-24 border-t-8 border-obsidian z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-heading font-black text-5xl md:text-7xl uppercase tracking-tighter">
              Featured <br/> Work
            </h2>
            <Link href="/projects" className="hidden md:block font-mono font-bold uppercase tracking-widest text-mint bg-obsidian px-6 py-3 border-4 border-obsidian transition-all duration-150 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_#5E6AD2]">
              See All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
            {featuredProjects.map((project, idx) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                className={idx === 1 ? "mt-0 md:mt-24" : ""} 
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
