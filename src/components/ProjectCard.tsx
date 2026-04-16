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
      <Link href={`/projects/${project.slug}`} className="group block w-full relative">
        <div className={`absolute inset-0 translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-200 ${
          project.color === 'mint' ? 'bg-mint' : project.color === 'peri' ? 'bg-peri' : 'bg-white'
        }`} />
        
        <div className="relative border-4 border-obsidian bg-obsidian overflow-hidden aspect-[4/3] z-10 flex items-center justify-center">
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
        
        <div className="mt-8 flex justify-between items-start">
          <div>
            <h3 className="font-heading font-black text-2xl uppercase">{project.title}</h3>
            <p className="font-mono text-sm font-bold text-gray-500 mt-2 uppercase">{project.category}</p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-obsidian flex items-center justify-center group-hover:bg-peri group-hover:text-white transition-colors duration-200">
            <span className="font-mono font-bold font-xl">→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
