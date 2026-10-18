import { NextRequest, NextResponse } from "next/server";
import {
  getAdminSession,
  changeAdminPassword,
  createSessionToken,
  COOKIE_NAME,
  SESSION_DURATION_SECONDS,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession(req);
    const body = await req.json();
    const { email, currentPassword, newPassword, confirmPassword } = body;

    const targetEmail =
      session?.email || (typeof email === "string" ? email.trim().toLowerCase() : "");

    if (!targetEmail) {
      return NextResponse.json(
        { success: false, message: "Email or active admin session required." },
        { status: 400 }
      );
    }

    if (!currentPassword) {
      return NextResponse.json(
        { success: false, message: "Current password is required." },
        { status: 400 }
      );
    }

    if (!newPassword || newPassword.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "New password must be at least 8 characters long.",
        },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "New password and confirmation password do not match.",
        },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "New password must be different from your current password.",
        },
        { status: 400 }
      );
    }

    const result = await changeAdminPassword(targetEmail, currentPassword, newPassword);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Admin password successfully updated. Please use your new password for future logins.",
    });

    // If there is an active session, refresh the session cookie
    if (session) {
      const refreshedToken = createSessionToken({
        email: session.email,
        name: session.name,
        role: session.role,
      });

      response.cookies.set({
        name: COOKIE_NAME,
        value: refreshedToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_DURATION_SECONDS,
      });
    }

    return response;
  } catch (error) {
    console.error("[Admin Change Password API Error]:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error while changing password." },
      { status: 500 }
    );
  }
}
