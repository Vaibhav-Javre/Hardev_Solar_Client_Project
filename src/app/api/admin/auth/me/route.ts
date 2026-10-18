import { NextRequest, NextResponse } from "next/server";
import {
  getAdminSession,
  createSessionToken,
  COOKIE_NAME,
  SESSION_DURATION_SECONDS,
} from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthenticated" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    success: true,
    user: {
      email: session.email,
      name: session.name,
      role: session.role,
    },
  });

  // Sliding session: if less than 5 days remaining, refresh the token
  const now = Math.floor(Date.now() / 1000);
  const remainingSeconds = session.expiresAt - now;
  if (remainingSeconds < 60 * 60 * 24 * 5) {
    const refreshedToken = createSessionToken(
      {
        email: session.email,
        name: session.name,
        role: session.role,
      },
      SESSION_DURATION_SECONDS
    );

    response.cookies.set({
      name: COOKIE_NAME,
      value: refreshedToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_DURATION_SECONDS,
      expires: new Date(Date.now() + SESSION_DURATION_SECONDS * 1000),
    });
  }

  return response;
}
