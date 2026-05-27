import Link from "next/link";
import ProjectForm from "@/components/admin/ProjectForm";
import dbConnect from "@/lib/db";
import Project from "@/app/models/Project";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

async function getProject(id: string) {
  try {
    await dbConnect();
    const project = await Project.findById(id)
      .populate("category_id", "name slug")
      .populate("subcategory_id", "name slug")
      .lean();
    return project;
  } catch {
    return null;
  }
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-400">Project not found.</p>
          <Link href="/admin/projects" className="text-white underline mt-4 block">
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="border-b border-zinc-800 px-6 py-5 flex items-center gap-4">
        <Link
          href="/admin/projects"
          className="text-zinc-500 hover:text-white transition-colors text-sm"
        >
          ← Back
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Edit Project</h1>
          <p className="text-zinc-500 text-sm mt-0.5 truncate max-w-xs">
            {project.name}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        <ProjectForm initialData={JSON.parse(JSON.stringify(project))} />
      </div>
    </div>
  );
}
