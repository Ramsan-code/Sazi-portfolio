import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, verifyToken } from "@/lib/auth";
import dbConnect from "@/lib/db";
import { User } from "@/app/models/user";
import Category from "@/app/models/Category";
import SubCategory from "@/app/models/Subcategory";
import Project from "@/app/models/Project";
import Link from "next/link";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const payload = token ? verifyToken(token) : null;

  if (!payload) redirect("/login");

  await dbConnect();
  const [admin, categories, subcategories, projectCount] = await Promise.all([
    User.findById(payload.id).select("-password"),
    Category.find().sort({ name: 1 }).lean(),
    SubCategory.find().populate("category_id", "name slug").sort({ name: 1 }).lean(),
    Project.countDocuments(),
  ]);

  const categorySummaries = categories.map((category) => ({
    id: category._id.toString(),
    name: category.name,
    slug: category.slug,
    subcategories: subcategories.filter(
      (subcategory) =>
        subcategory.category_id &&
        subcategory.category_id._id.toString() === category._id.toString()
    ),
  }));

  async function logout() {
    "use server";
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_COOKIE_NAME);
    cookieStore.delete("admin_token");
    const { redirect } = await import("next/navigation");
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 border-b border-zinc-800 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              Admin Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Welcome, {admin?.name}
            </h1>
            <p className="mt-1 text-sm text-zinc-500">{admin?.email}</p>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-bold uppercase tracking-widest text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
            >
              Logout
            </button>
          </form>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Projects
            </p>
            <p className="mt-3 text-3xl font-bold">{projectCount}</p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Categories
            </p>
            <p className="mt-3 text-3xl font-bold">{categories.length}</p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Subcategories
            </p>
            <p className="mt-3 text-3xl font-bold">{subcategories.length}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/projects/new"
            className="rounded-lg bg-white px-4 py-2 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-zinc-200"
          >
            New Project
          </Link>
          <Link
            href="/admin/projects"
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-bold uppercase tracking-widest text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
          >
            Manage Projects
          </Link>
        </div>

        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold tracking-tight">Project Taxonomy</h2>
            <p className="mt-1 text-sm text-zinc-500">
              These database categories power the public filters and the project form.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {categorySummaries.map((category) => (
              <div
                key={category.id}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold">{category.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-widest text-zinc-500">
                      {category.slug}
                    </p>
                  </div>
                  <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs font-bold text-zinc-400">
                    {category.subcategories.length}
                  </span>
                </div>

                {category.subcategories.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {category.subcategories.map((subcategory) => (
                      <span
                        key={subcategory._id.toString()}
                        className="rounded-md bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300"
                      >
                        {subcategory.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-zinc-500">
                    No subcategories required for this category.
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
