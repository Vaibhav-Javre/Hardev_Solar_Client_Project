import { NextRequest, NextResponse } from "next/server";
import {
  authenticateAdmin,
  createSessionToken,
  COOKIE_NAME,
  SESSION_DURATION_SECONDS,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Invalid login credentials." },
        { status: 400 }
      );
    }

    const authResult = await authenticateAdmin(email, password);

    if (!authResult.success || !authResult.session) {
      return NextResponse.json(
        { success: false, message: "Invalid login credentials." },
        { status: 401 }
      );
    }

    const token = createSessionToken(authResult.session);

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful.",
      user: authResult.session,
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_DURATION_SECONDS,
    });

    return response;
  } catch (error) {
    console.error("[Admin Login Error]:", error);
    return NextResponse.json(
      { success: false, message: "Invalid login credentials." },
      { status: 500 }
    );
  }
}
