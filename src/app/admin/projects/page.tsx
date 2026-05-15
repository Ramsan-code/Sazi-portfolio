"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Project {
  _id: string;
  name: string;
  img: string;
  description: string;
  tools: string[];
  avg_rating: number;
  review_count: number;
  category_id: { _id: string; name: string };
  subcategory_id?: { _id: string; name: string } | null;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    const res = await fetch("/api/project");
    const data = await res.json();
    setProjects(data.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert("Failed to delete project.");
      }
    } catch {
      alert("Something went wrong.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Projects</h1>
          <p className="text-zinc-500 text-sm mt-0.5">{projects.length} total</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="bg-white text-black text-sm font-bold px-4 py-2 rounded-lg hover:bg-zinc-200 transition-colors uppercase tracking-widest"
        >
          + New Project
        </Link>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-zinc-600">
            Loading...
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">🎨</div>
            <p className="text-zinc-400 font-medium">No projects yet</p>
            <p className="text-zinc-600 text-sm mt-1">
              Create your first project to get started
            </p>
            <Link
              href="/admin/projects/new"
              className="mt-6 bg-white text-black text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-zinc-200 transition-colors uppercase tracking-widest"
            >
              Create Project
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden group hover:border-zinc-600 transition-colors"
              >
                {/* Image */}
                <div className="relative h-44 bg-zinc-800 overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {project.category_id?.name}
                    </span>
                  </div>
                  {project.subcategory_id && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                        {project.subcategory_id.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-white truncate">{project.name}</h3>
                  <p className="text-zinc-500 text-sm mt-1 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tools */}
                  {project.tools.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.tools.slice(0, 3).map((tool) => (
                        <span
                          key={tool}
                          className="bg-zinc-800 text-zinc-400 text-xs px-2 py-0.5 rounded-md"
                        >
                          {tool}
                        </span>
                      ))}
                      {project.tools.length > 3 && (
                        <span className="text-zinc-600 text-xs px-1 py-0.5">
                          +{project.tools.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-3">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-white text-sm font-medium">
                      {project.avg_rating.toFixed(1)}
                    </span>
                    <span className="text-zinc-600 text-xs">
                      ({project.review_count})
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4 pt-4 border-t border-zinc-800">
                    <Link
                      href={`/admin/projects/${project._id}/edit`}
                      className="flex-1 text-center text-sm font-bold py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-colors uppercase tracking-wider"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(project._id)}
                      disabled={deletingId === project._id}
                      className="flex-1 text-sm font-bold py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors uppercase tracking-wider disabled:opacity-50"
                    >
                      {deletingId === project._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}