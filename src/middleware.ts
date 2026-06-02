import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE_NAME = "sazi_admin_token";
const SECRET = process.env.JWT_SECRET || "";

// Base64Url decode helper for Edge Runtime
function base64urlDecode(str: string): Uint8Array {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// Edge-compatible JWT verification function
async function verifyJwtEdge(token: string, secret: string): Promise<boolean> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const [headerB64, payloadB64, signatureB64] = parts;
    const encoder = new TextEncoder();
    const data = encoder.encode(`${headerB64}.${payloadB64}`);

    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const signatureBin = base64urlDecode(signatureB64);
    const isValid = await crypto.subtle.verify("HMAC", key, signatureBin as unknown as BufferSource, data);

    if (!isValid) return false;

    const payloadJson = new TextDecoder().decode(base64urlDecode(payloadB64));
    const payload = JSON.parse(payloadJson);

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;

  const isVerified = token ? await verifyJwtEdge(token, SECRET) : false;

  if (!isVerified) {
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
