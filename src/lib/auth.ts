import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET!;
export const ADMIN_COOKIE_NAME = "sazi_admin_token";

export function signToken(id: string) {
  return jwt.sign({ id }, SECRET, { expiresIn: "8h" });
}

export function verifyToken(token: string): { id: string } | null {
  try {
    return jwt.verify(token, SECRET) as { id: string };
  } catch {
    return null;
  }
}

export async function getTokenFromCookies() {   // ← now async
  const cookieStore = await cookies();           // ← await here
  return cookieStore.get(ADMIN_COOKIE_NAME)?.value ?? null;
}
