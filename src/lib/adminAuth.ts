import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyToken } from "@/lib/auth";

export function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;

  if (!token || !verifyToken(token)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  return null;
}
