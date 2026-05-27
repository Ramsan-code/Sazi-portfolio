"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, CATEGORIES } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

export function ProjectsClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = PROJECTS.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <main className="w-full bg-white text-obsidian min-h-[calc(100vh-6rem)] relative pb-32 pt-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 max-w-4xl"
        >
          <h1 className="font-heading font-black text-4xl sm:text-7xl md:text-8xl uppercase leading-none tracking-normal w-full">
            Graphic Design{" "}
            <span className="text-transparent [-webkit-text-stroke:2px_#0b0b0b] md:[-webkit-text-stroke:4px_#0b0b0b] block sm:inline">
              Portfolio
            </span>
          </h1>
          <p className="mt-6 font-mono text-sm sm:text-base leading-relaxed text-zinc-600">
            A curated archive of brand identity design, UI/UX systems, poster
            design, packaging, motion graphics, and conversion-focused digital
            design case studies.
          </p>
        </motion.div>

        <section aria-labelledby="project-filters" className="mb-12 sm:mb-16">
          <h2 id="project-filters" className="sr-only">
            Filter graphic design projects by service category
          </h2>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`font-mono text-xs sm:text-sm uppercase font-bold px-4 sm:px-6 py-2 sm:py-3 border-4 border-obsidian transition-all duration-150 active:translate-y-0 active:translate-x-0 ${
                  activeCategory === category
                    ? "bg-obsidian text-white shadow-none translate-y-1 translate-x-1"
                    : "bg-white text-obsidian shadow-[4px_4px_0px_#0b0b0b] hover:shadow-[6px_6px_0px_#5E6AD2] hover:-translate-y-1 hover:-translate-x-1"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section aria-labelledby="project-grid-heading">
          <h2 id="project-grid-heading" className="sr-only">
            Brand identity, UI/UX, motion, and packaging design case studies
          </h2>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 gap-y-12 sm:gap-y-14 md:gap-y-16"
          >
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
        </section>
      </div>
    </main>
  );
}
