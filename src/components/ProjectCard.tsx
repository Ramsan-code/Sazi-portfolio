"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    category: string;
    slug: string;
    color: string;
    imageTheme: string;
    summary?: string;
  };
  className?: string;
  index?: number;
}

export function ProjectCard({ project, className = "", index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={className}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block w-full"
        aria-label={`View ${project.title} ${project.category} design case study`}
      >
        <div className="relative">
          <div className={`absolute inset-0 translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 group-hover:translate-x-4 group-hover:translate-y-4 md:group-hover:translate-x-6 md:group-hover:translate-y-6 transition-transform duration-200 ${
            project.color === 'mint' ? 'bg-mint' : project.color === 'peri' ? 'bg-peri' : 'bg-white'
          }`} />
          
          <div
            className="relative border-4 border-obsidian bg-obsidian overflow-hidden aspect-[4/3] z-10 flex items-center justify-center"
            role="img"
            aria-label={`${project.title} ${project.category.toLowerCase()} design preview`}
          >
            <div 
              className="absolute inset-0 opacity-20" 
              style={{ 
                background: project.imageTheme,
                backgroundSize: "20px 20px"
              }} 
            />
            <span className="font-heading font-black text-6xl text-white group-hover:scale-110 transition-transform duration-300">
              0{project.id}
            </span>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between items-start">
          <div>
            <h3 className="font-heading font-black text-2xl uppercase leading-none">{project.title}</h3>
            <p className="font-mono text-sm font-bold text-gray-500 mt-2 uppercase">{project.category}</p>
            {project.summary && (
              <p className="mt-3 line-clamp-3 font-mono text-sm leading-relaxed text-gray-600">
                {project.summary}
              </p>
            )}
          </div>
          <div className="w-12 h-12 shrink-0 rounded-full border-4 border-obsidian flex items-center justify-center group-hover:bg-peri group-hover:text-white transition-colors duration-200">
            <span className="font-mono font-bold font-xl" aria-hidden="true">-&gt;</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
