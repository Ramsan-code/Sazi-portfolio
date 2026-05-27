"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { StealthDisclosure } from "@/components/StealthDisclosure";

type Project = (typeof PROJECTS)[number];

export function ProjectDetailClient({ project }: { project: Project }) {
  const [showDetails, setShowDetails] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);

  const previewTheme = project.afterTheme ?? project.imageTheme;
  const zoomOut = () =>
    setImageZoom((zoom) => Math.max(1, Number((zoom - 0.25).toFixed(2))));
  const zoomIn = () =>
    setImageZoom((zoom) => Math.min(2, Number((zoom + 0.25).toFixed(2))));

  return (
    <main className="w-full bg-obsidian text-white min-h-screen pt-12 sm:pt-20 md:pt-24 pb-24 sm:pb-32 overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase text-mint hover:text-white transition-colors mb-10 sm:mb-16"
        >
          <span aria-hidden="true">&lt;-</span> Back to Graphic Design Portfolio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 sm:mb-16"
        >
          <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-8xl uppercase mb-6 leading-none max-w-full break-words">
            {project.title} {project.category} Case Study
          </h1>
          <p className="mb-6 max-w-3xl font-mono text-base sm:text-lg leading-relaxed text-gray-300">
            {project.summary}
          </p>
          <div className="flex min-w-0 flex-wrap gap-3 sm:gap-4 font-mono text-xs sm:text-sm font-bold uppercase text-peri">
            <span className="max-w-full min-w-0 border-2 border-peri px-3 sm:px-4 py-2 break-words">
              {project.category}
            </span>
            <span className="w-full sm:w-auto max-w-full min-w-0 basis-full sm:basis-auto border-2 border-peri px-3 sm:px-4 py-2 break-words">
              {project.role}
            </span>
            <span className="max-w-full min-w-0 border-2 border-peri px-3 sm:px-4 py-2 break-words">
              {project.year}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="group w-full aspect-video border-4 border-white bg-zinc-900 relative mb-16 sm:mb-24 overflow-hidden"
          role="img"
          aria-label={`${project.title} ${project.category.toLowerCase()} design preview`}
        >
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{
              background: previewTheme,
              backgroundSize: "40px 40px",
              transform: `scale(${imageZoom})`,
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(11,11,11,0.18)_70%)]" />
          <div className="absolute left-4 top-4 sm:left-6 sm:top-6 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/80">
            {Math.round(imageZoom * 100)}%
          </div>
          <div className="absolute right-4 top-4 sm:right-6 sm:top-6 flex gap-2">
            <button
              type="button"
              onClick={zoomOut}
              disabled={imageZoom === 1}
              title="Zoom out"
              aria-label="Zoom out of project design preview"
              className="grid h-10 w-10 place-items-center border-2 border-white bg-obsidian/90 text-white transition-colors hover:bg-mint hover:text-obsidian disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ZoomOut size={18} strokeWidth={3} />
            </button>
            <button
              type="button"
              onClick={zoomIn}
              disabled={imageZoom === 2}
              title="Zoom in"
              aria-label="Zoom in to project design preview"
              className="grid h-10 w-10 place-items-center border-2 border-white bg-obsidian/90 text-white transition-colors hover:bg-mint hover:text-obsidian disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ZoomIn size={18} strokeWidth={3} />
            </button>
          </div>
        </motion.div>

        {!showDetails && (
          <div className="w-full flex justify-center mb-16 sm:mb-24">
            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest border-2 border-mint text-mint hover:bg-mint hover:text-obsidian transition-colors px-5 sm:px-8 py-4"
            >
              View Full Design Case Study
            </button>
          </div>
        )}

        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <aside className="md:col-span-1 space-y-8 bg-zinc-900/50 p-6 border-l-4 border-peri h-fit">
                <h2 className="font-heading border-b-2 border-zinc-700 font-bold uppercase text-white pb-4 tracking-widest text-xl">
                  {project.category} Design Results
                </h2>
                <ul className="space-y-4">
                  {project.results.map((res, i) => (
                    <li key={i} className="font-mono text-sm font-bold text-mint uppercase">
                      <span aria-hidden="true">-&gt;</span> {res}
                    </li>
                  ))}
                </ul>
              </aside>

              <section className="md:col-span-2 space-y-16" aria-label="Project case study details">
                <div>
                  <h2 className="font-mono text-2xl font-bold uppercase text-white mb-6 border-b-4 border-mint pb-2 inline-block">
                    The {project.category} Design Challenge
                  </h2>
                  <p className="font-mono text-lg leading-relaxed text-gray-300">
                    {project.challenge}
                  </p>
                </div>
                <div>
                  <h2 className="font-mono text-2xl font-bold uppercase text-white mb-6 border-b-4 border-peri pb-2 inline-block">
                    The Creative Design Solution
                  </h2>
                  <p className="font-mono text-lg leading-relaxed text-gray-300">
                    {project.solution}
                  </p>
                </div>
                <div className="border-t border-white/20 pt-10">
                  <Link
                    href="/contact"
                    className="inline-flex border-2 border-mint px-6 py-4 font-mono text-sm font-bold uppercase tracking-widest text-mint transition-colors hover:bg-mint hover:text-obsidian"
                  >
                    Start A Similar Design Project
                  </Link>
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
