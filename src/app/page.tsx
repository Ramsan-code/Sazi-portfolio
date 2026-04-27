"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import { BackgroundAccents } from "@/components/BackgroundAccents";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactForm } from "@/components/ContactForm";
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
    <div className="relative min-h-[calc(100vh-6rem)] w-full overflow-hidden flex flex-col items-center">
      <BackgroundAccents />

      {/* HERO SECTION */}
      <section className="relative w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 px-4 md:px-16 pb-24">
        
        {/* LEFT */}
        <div className="flex-1 flex flex-col space-y-6 pt-12">
          <h1 className="font-black uppercase text-[15vw] md:text-[9rem]">
            Sazi
            <br />
            <span className="text-peri text-[9vw] md:text-[5.5rem]">
              Balasingam
            </span>
          </h1>

          <h2 className="text-peri font-mono text-2xl uppercase">
            Graphics Designer
          </h2>

          <p className="text-gray-300 max-w-md">
            Forging high-impact visual identities and digital experiences.
          </p>

          <div className="flex gap-4">
            <Link href="/projects" className="bg-mint px-6 py-3 font-bold">
              View Work
            </Link>

            <Link href="/contact" className="border px-6 py-3 font-bold">
              Contact
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative w-[300px] md:w-[400px] h-[400px] border-4 border-white overflow-hidden">
            <Image
              src={imageUrl}
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="w-full bg-white text-black py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-10">
            Featured Work
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <ContactForm />
    </div>
  );
}