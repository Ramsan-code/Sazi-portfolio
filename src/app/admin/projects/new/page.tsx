import Link from "next/link";
import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-5 flex items-center gap-4">
        <Link
          href="/admin/projects"
          className="text-zinc-500 hover:text-white transition-colors text-sm"
        >
          ← Back
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight">New Project</h1>
          <p className="text-zinc-500 text-sm mt-0.5">Add a new project to your portfolio</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto p-6">
        <ProjectForm />
      </div>
    </div>
  );
}