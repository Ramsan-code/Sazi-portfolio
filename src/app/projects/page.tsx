"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, CATEGORIES } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

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
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
