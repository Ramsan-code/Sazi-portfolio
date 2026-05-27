import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;

  if (!token || !verifyToken(token)) {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete(ADMIN_COOKIE_NAME);
    res.cookies.delete("admin_token");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
