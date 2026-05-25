import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect /admin UI routes (except login)
  if (path.startsWith("/admin") && path !== "/admin/login") {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      // Invalid token
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("admin_token");
      return response;
    }
  }

  // Protect /api/admin/* routes
  if (path.startsWith("/api/admin") && path !== "/api/admin/login") {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
