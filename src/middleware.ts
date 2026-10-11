import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = request.cookies.get("admin_session")?.value;

    if (!sessionCookie || !sessionCookie.includes(".")) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect all /api/admin routes except /api/admin/auth/login
  if (pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/auth/login")) {
    const sessionCookie = request.cookies.get("admin_session")?.value;
    const authHeader = request.headers.get("authorization");
    const hasAuth = Boolean(sessionCookie || authHeader);

    if (!hasAuth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
