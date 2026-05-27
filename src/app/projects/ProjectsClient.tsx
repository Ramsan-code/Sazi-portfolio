"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category_id: string | { _id: string; name: string; slug: string };
}

interface Project {
  _id: string;
  name: string;
  img: string;
  description: string;
  tools: string[];
  category_id: { _id: string; name: string; slug: string };
  subcategory_id?: { _id: string; name: string; slug: string } | null;
}

export function ProjectsClient() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubcategory, setActiveSubcategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPortfolioData() {
      setLoading(true);
      try {
        const [categoryRes, subcategoryRes, projectRes] = await Promise.all([
          fetch("/api/category"),
          fetch("/api/subcategory"),
          fetch("/api/project"),
        ]);

        const [categoryData, subcategoryData, projectData] = await Promise.all([
          categoryRes.json(),
          subcategoryRes.json(),
          projectRes.json(),
        ]);

        setCategories(categoryData.data || []);
        setSubcategories(subcategoryData.data || []);
        setProjects(projectData.data || []);
      } finally {
        setLoading(false);
      }
    }

    loadPortfolioData();
  }, []);

  const visibleSubcategories = useMemo(() => {
    if (activeCategory === "All") return [];
    return subcategories.filter((subcategory) => {
      const categoryId =
        typeof subcategory.category_id === "string"
          ? subcategory.category_id
          : subcategory.category_id._id;
      return categoryId === activeCategory;
    });
  }, [activeCategory, subcategories]);

  const filteredProjects = projects.filter((project) => {
    const categoryMatch =
      activeCategory === "All" || project.category_id?._id === activeCategory;
    const subcategoryMatch =
      activeSubcategory === "All" ||
      project.subcategory_id?._id === activeSubcategory;
    return categoryMatch && subcategoryMatch;
  });

  function selectCategory(categoryId: string) {
    setActiveCategory(categoryId);
    setActiveSubcategory("All");
  }

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

        <section aria-labelledby="project-filters" className="mb-12 sm:mb-16 space-y-5">
          <h2 id="project-filters" className="sr-only">
            Filter graphic design projects by service category
          </h2>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => selectCategory("All")}
              aria-pressed={activeCategory === "All"}
              className={`font-mono text-xs sm:text-sm uppercase font-bold px-4 sm:px-6 py-2 sm:py-3 border-4 border-obsidian transition-all duration-150 active:translate-y-0 active:translate-x-0 ${
                activeCategory === "All"
                  ? "bg-obsidian text-white translate-y-1 translate-x-1"
                  : "bg-white text-obsidian shadow-[4px_4px_0px_#0b0b0b] hover:shadow-[6px_6px_0px_#5E6AD2] hover:-translate-y-1 hover:-translate-x-1"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                type="button"
                onClick={() => selectCategory(category._id)}
                aria-pressed={activeCategory === category._id}
                className={`font-mono text-xs sm:text-sm uppercase font-bold px-4 sm:px-6 py-2 sm:py-3 border-4 border-obsidian transition-all duration-150 active:translate-y-0 active:translate-x-0 ${
                  activeCategory === category._id
                    ? "bg-obsidian text-white translate-y-1 translate-x-1"
                    : "bg-white text-obsidian shadow-[4px_4px_0px_#0b0b0b] hover:shadow-[6px_6px_0px_#5E6AD2] hover:-translate-y-1 hover:-translate-x-1"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {visibleSubcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 border-l-4 border-obsidian pl-4">
              <button
                type="button"
                onClick={() => setActiveSubcategory("All")}
                aria-pressed={activeSubcategory === "All"}
                className={`rounded-md border-2 border-obsidian px-3 py-2 font-mono text-xs font-bold uppercase ${
                  activeSubcategory === "All"
                    ? "bg-obsidian text-white"
                    : "bg-white text-obsidian"
                }`}
              >
                All Platforms
              </button>
              {visibleSubcategories.map((subcategory) => (
                <button
                  key={subcategory._id}
                  type="button"
                  onClick={() => setActiveSubcategory(subcategory._id)}
                  aria-pressed={activeSubcategory === subcategory._id}
                  className={`rounded-md border-2 border-obsidian px-3 py-2 font-mono text-xs font-bold uppercase ${
                    activeSubcategory === subcategory._id
                      ? "bg-obsidian text-white"
                      : "bg-white text-obsidian"
                  }`}
                >
                  {subcategory.name}
                </button>
              ))}
            </div>
          )}
        </section>

        <section aria-labelledby="project-grid-heading">
          <h2 id="project-grid-heading" className="sr-only">
            Brand identity, UI/UX, motion, and packaging design case studies
          </h2>

          {loading ? (
            <div className="py-24 font-mono text-sm font-bold uppercase text-zinc-500">
              Loading archive...
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="border-4 border-obsidian p-10 font-mono font-bold uppercase text-zinc-500">
              No projects found for this selection.
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 gap-y-12 sm:gap-y-14 md:gap-y-16"
            >
              {filteredProjects.map((project) => (
                <motion.article
                  layout
                  key={project._id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden border-4 border-obsidian bg-zinc-100">
                    <Image
                      src={project.img}
                      alt={project.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-5">
                    <p className="font-mono text-xs font-bold uppercase text-zinc-500">
                      {project.category_id?.name}
                      {project.subcategory_id ? ` / ${project.subcategory_id.name}` : ""}
                    </p>
                    <h3 className="mt-2 font-heading text-2xl font-black uppercase">
                      {project.name}
                    </h3>
                    <p className="mt-2 line-clamp-3 font-mono text-sm text-zinc-600">
                      {project.description}
                    </p>
                    {project.tools.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="rounded-md bg-obsidian px-2 py-1 font-mono text-xs font-bold uppercase text-white"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </section>
      </div>
    </main>
  );
}
