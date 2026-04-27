import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import dbConnect from "@/lib/db";
import { User } from "@/app/models/user";

export default async function DashboardPage() {
  const cookieStore = await cookies();                        // ← await here
  const token = cookieStore.get("admin_token")?.value;
  const payload = token ? verifyToken(token) : null;
  if (!payload) redirect("/login");

  await dbConnect();
  const admin = await User.findById(payload.id).select("-password");

  async function logout() {
    "use server";
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();                      // ← await here too
    cookieStore.delete("admin_token");
    const { redirect } = await import("next/navigation");
    redirect("/login");
  }

  return (
    <main style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700 }}>Welcome, {admin?.name}</h1>
      <p style={{ color: "#888", marginTop: ".25rem", fontSize: 14 }}>{admin?.email}</p>
      <form action={logout} style={{ marginTop: "2rem" }}>
        <button type="submit" style={{
          padding: ".6rem 1.2rem", background: "transparent",
          border: "0.5px solid #ddd", borderRadius: 8,
          cursor: "pointer", fontSize: 14
        }}>
          Logout →
        </button>
      </form>
    </main>
  );
}