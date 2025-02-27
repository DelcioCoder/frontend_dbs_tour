import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;

  if (
    !accessToken &&
    (req.nextUrl.pathname.startsWith("/restaurants") || req.nextUrl.pathname.startsWith("/hotels"))
  ) {
    return NextResponse.redirect(new URL("auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/restaurants/:path*", "/hotels/:path*"], // Corrigido para :path* (mais correto)
};