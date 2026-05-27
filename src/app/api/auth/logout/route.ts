import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out." });
  res.cookies.delete(ADMIN_COOKIE_NAME);
  res.cookies.delete("admin_token");
  return res;
}
