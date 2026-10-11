import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthenticated" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    user: {
      email: session.email,
      name: session.name,
      role: session.role,
    },
  });
}
