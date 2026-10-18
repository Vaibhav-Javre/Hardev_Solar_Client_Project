import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("admin_session")?.value;

  // Validate session token structure and expiration
  let isSessionValid = false;
  if (sessionCookie && sessionCookie.includes(".")) {
    try {
      const [payloadStr] = sessionCookie.split(".");
      if (payloadStr) {
        // Base64URL decode in Edge runtime compatible manner
        const base64 = payloadStr.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = atob(base64);
        const payload = JSON.parse(jsonPayload);
        const now = Math.floor(Date.now() / 1000);
        if (payload && typeof payload.expiresAt === "number" && payload.expiresAt > now) {
          isSessionValid = true;
        }
      }
    } catch {
      isSessionValid = false;
    }
  }

  // If already authenticated and visiting /admin/login, redirect to /admin or redirect query
  if (pathname === "/admin/login") {
    if (isSessionValid) {
      const redirectTo = request.nextUrl.searchParams.get("redirect") || "/admin";
      // Guard against redirect loops
      const destination = redirectTo.startsWith("/admin/login") ? "/admin" : redirectTo;
      return NextResponse.redirect(new URL(destination, request.url));
    }
    return NextResponse.next();
  }

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    if (!isSessionValid) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect all /api/admin routes except /api/admin/auth/login
  if (pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/auth/login")) {
    const authHeader = request.headers.get("authorization");
    const hasAuth = Boolean(isSessionValid || authHeader);

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
