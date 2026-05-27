"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import { BackgroundAccents } from "@/components/BackgroundAccents";
import { ProjectCard } from "@/components/ProjectCard";
import { SocialSection } from "@/components/SocialSection";
import { useEffect, useState } from "react";

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string>("");

  const featuredProjects = PROJECTS.slice(0, 2);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch("/api/profile-image");
        const data: { url: string } = await res.json();
        setImageUrl(data.url);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImage();
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex flex-col items-center">
      <BackgroundAccents />

      {/* HERO SECTION */}
      <section className="relative w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8 xl:gap-20 px-5 sm:px-8 md:px-12 lg:px-8 xl:px-16 py-12 lg:py-24">


        {/* LEFT */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">

          <h1 className="font-black uppercase leading-none tracking-tight">
            <span className="block text-[18vw] sm:text-[14vw] md:text-[10vw] lg:text-[6rem] xl:text-[8rem]">
              Sazi
            </span>

            <span className="block text-peri text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[3.8rem] xl:text-[5rem]">
              Balasingam
            </span>
          </h1>

          <div className="flex flex-col space-y-2">
            <h2 className="text-peri font-mono text-lg sm:text-xl md:text-2xl uppercase tracking-wider">
              Graphics Designer
            </h2>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-white/80 font-mono text-[11px] sm:text-xs md:text-sm font-medium uppercase tracking-[0.2em] leading-relaxed"
            >
              Logo Design | Poster Design | Social Media Poster
            </motion.h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link href="/projects" className="bg-mint px-6 py-3 font-bold text-center transition-all duration-300 hover:scale-105">
              View Work
            </Link>

            <Link href="/contact" className="border px-6 py-3 font-bold text-center transition-all duration-300 hover:bg-white hover:text-black">
              Contact
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center lg:justify-end w-full">
          <div className="relative w-[min(80vw,420px)] lg:w-[280px] xl:w-[420px] aspect-square border-4 border-white overflow-hidden shadow-2xl">
            <Image
              src={imageUrl || "/portrait.png"}
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="w-full bg-white text-black py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          <div className="flex items-center justify-between mb-10"></div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            Featured Work
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <SocialSection />

    </main>
  );
}
