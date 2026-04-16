"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, CATEGORIES } from "@/data/projects";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = PROJECTS.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <div className="w-full bg-white text-obsidian min-h-[calc(100vh-6rem)] relative pb-32 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading font-black text-6xl md:text-8xl uppercase tracking-tighter mb-8"
        >
          Curated <br/> <span className="text-transparent [-webkit-text-stroke:4px_#0b0b0b]">Archive.</span>
        </motion.h1>

        {/* Filter System */}
        <div className="flex flex-wrap gap-4 mb-16">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`font-mono text-sm uppercase font-bold px-6 py-3 border-4 border-obsidian transition-all duration-150 active:translate-y-0 active:translate-x-0 ${
                activeCategory === category
                  ? "bg-obsidian text-white shadow-none translate-y-1 translate-x-1"
                  : "bg-white text-obsidian shadow-[4px_4px_0px_#0b0b0b] hover:shadow-[6px_6px_0px_#5E6AD2] hover:-translate-y-1 hover:-translate-x-1"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 gap-y-16">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/projects/${project.slug}`} className="group block w-full relative">
                 {/* Shadows defined dynamically based on project color */}
                  <div className={`absolute inset-0 translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-200 ${
                    project.color === 'mint' ? 'bg-mint' : project.color === 'peri' ? 'bg-peri' : 'bg-gray-200'
                  }`} />
                  
                  <div className="relative border-4 border-obsidian bg-obsidian overflow-hidden aspect-[4/3] z-10 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000),linear-gradient(45deg,#000_25%,#0b0b0b_25%,#0b0b0b_75%,#000_75%,#000)] bg-[length:20px_20px] bg-[position:0_0,10px_10px] opacity-20" />
                    <span className="font-heading font-black text-6xl text-white group-hover:scale-110 transition-transform duration-300">
                      0{project.id}
                    </span>
                  </div>
                  
                  <div className="mt-6 flex justify-between items-start">
                    <div>
                      <h3 className="font-heading font-black text-2xl uppercase">{project.title}</h3>
                      <p className="font-mono text-sm font-bold text-gray-500 mt-1 uppercase">{project.category}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
