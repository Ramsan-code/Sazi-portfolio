"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import { notFound } from "next/navigation";
import { StealthDisclosure } from "@/components/StealthDisclosure";

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [showDetails, setShowDetails] = useState(false);
  
  const project = PROJECTS.find(p => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Map theme colors for tailwind compatibility
  const colorMap: Record<string, string> = {
    mint: "bg-mint",
    peri: "bg-peri",
    white: "bg-white",
    obsidian: "bg-obsidian"
  };

  return (
    <div className="w-full bg-obsidian text-white min-h-screen pt-24 pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        
        <Link href="/projects" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase text-mint hover:text-white transition-colors mb-16">
          <span>←</span> Back to Archive
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="font-heading font-black text-6xl md:text-8xl uppercase mb-6">{project.title}</h1>
          <div className="flex flex-wrap gap-4 font-mono text-sm font-bold uppercase text-peri">
            <span className="border-2 border-peri px-4 py-2">{project.category}</span>
            <span className="border-2 border-peri px-4 py-2">{project.role}</span>
            <span className="border-2 border-peri px-4 py-2">{project.year}</span>
          </div>
        </motion.div>

        {/* Hero Image Block */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full aspect-video border-4 border-white bg-zinc-900 relative mb-24 overflow-hidden"
        >
           <div 
            className="absolute inset-0 opacity-30" 
            style={{ 
              background: project.imageTheme, 
              backgroundSize: "20px 20px" 
            }} 
           />

        </motion.div>

        {!showDetails && (
          <div className="w-full flex justify-center mb-24">
            <button 
              onClick={() => setShowDetails(true)}
              className="font-mono text-sm font-bold uppercase tracking-widest border-2 border-mint text-mint hover:bg-mint hover:text-obsidian transition-colors px-8 py-4"
            >
              View Full Details
            </button>
          </div>
        )}

        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Stealth Section (NEW: Progressive Disclosure) */}
            {project.confidentialContent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mb-24"
              >
                <StealthDisclosure 
                  content={project.confidentialContent} 
                  label="Stealth Case Logic (Locked)" 
                />
              </motion.div>
            )}

            {/* Content Structure */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="md:col-span-1 space-y-8 bg-zinc-900/50 p-6 border-l-4 border-peri h-fit">
                <h3 className="font-heading border-b-2 border-zinc-700 font-bold uppercase text-white pb-4 tracking-widest text-xl">The Results</h3>
                <ul className="space-y-4">
                   {project.results.map((res, i) => (
                     <li key={i} className="font-mono text-sm font-bold text-mint uppercase">
                       → {res}
                     </li>
                   ))}
                </ul>
              </div>
              
              <div className="md:col-span-2 space-y-16">
                <div>
                  <h3 className="font-mono text-2xl font-bold uppercase text-white mb-6 border-b-4 border-mint pb-2 inline-block">The Challenge</h3>
                  <p className="font-mono text-lg leading-relaxed text-gray-300">{project.challenge}</p>
                </div>
                <div>
                  <h3 className="font-mono text-2xl font-bold uppercase text-white mb-6 border-b-4 border-peri pb-2 inline-block">The Solution</h3>
                  <p className="font-mono text-lg leading-relaxed text-gray-300">{project.solution}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}



      </div>
    </div>
  );
}
