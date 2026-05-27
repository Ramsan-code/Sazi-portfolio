"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import { BackgroundAccents } from "@/components/BackgroundAccents";
import { ProjectCard } from "@/components/ProjectCard";
import { SocialSection } from "@/components/SocialSection";
import { useEffect, useState } from "react";

export function HomeClient() {
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

      <section className="relative w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8 xl:gap-20 px-5 sm:px-8 md:px-12 lg:px-8 xl:px-16 py-12 lg:py-24">
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <h1 className="w-full max-w-full break-words font-black uppercase leading-none tracking-normal">
            <span className="block text-7xl sm:text-8xl md:text-9xl lg:text-[6rem] xl:text-[8rem]">
              Sazi
            </span>

            <span className="block text-peri text-4xl sm:text-6xl md:text-7xl lg:text-[3.8rem] xl:text-[5rem]">
              Balasingam
            </span>
          </h1>

          <div className="flex flex-col space-y-3">
            <h2 className="mx-auto max-w-[20rem] text-peri font-mono text-sm sm:text-xl md:text-2xl uppercase tracking-normal leading-tight lg:mx-0 lg:max-w-2xl">
              <span className="block">Graphic Designer</span>
              <span className="block">For Brand Identity, Posters</span>
              <span className="block">& Digital Design</span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="max-w-2xl text-white/80 font-mono text-xs sm:text-sm md:text-base font-medium uppercase tracking-[0.12em] leading-relaxed"
            >
              Logo design, poster design, social media graphics, UI/UX systems,
              and visual identities built with sharp strategy and bold form.
            </motion.p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/projects"
              className="bg-mint px-6 py-3 font-bold text-center transition-all duration-300 hover:scale-105"
            >
              View Graphic Design Portfolio
            </Link>

            <Link
              href="/contact"
              className="border px-6 py-3 font-bold text-center transition-all duration-300 hover:bg-white hover:text-black"
            >
              Book A Design Project
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end w-full">
          <div className="relative w-[min(80vw,420px)] lg:w-[280px] xl:w-[420px] aspect-square border-4 border-white overflow-hidden shadow-2xl">
            <Image
              src={imageUrl || "/portrait.png"}
              alt="Sazi Balasingam, graphic designer and brand identity designer"
              fill
              sizes="(min-width: 1280px) 420px, (min-width: 1024px) 280px, 80vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="w-full bg-white text-black py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
              Featured Brand Identity & UI/UX Design Work
            </h2>
            <p className="mt-4 font-mono text-sm sm:text-base leading-relaxed text-zinc-600">
              Selected case studies across branding, digital product design,
              motion graphics, and conversion-focused visual systems.
            </p>
          </div>

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
