import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { sendCustomerDirectEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // 1. Verify admin session
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Admin session required." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { to, customerName, subject, message } = body;

    if (!to || !to.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Valid recipient email address is required." },
        { status: 400 }
      );
    }

    if (!subject || !subject.trim()) {
      return NextResponse.json(
        { success: false, message: "Email subject cannot be empty." },
        { status: 400 }
      );
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        { success: false, message: "Email message cannot be empty." },
        { status: 400 }
      );
    }

    const result = await sendCustomerDirectEmail({
      to: to.trim(),
      customerName: customerName?.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error || "Failed to dispatch email. Please check your email configuration.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      simulated: result.simulated,
      message: result.simulated
        ? `Email logged in dev mode (placeholder API key). You can also use "Open in Gmail" for direct delivery.`
        : `Email successfully delivered to ${to}.`,
    });
  } catch (error) {
    console.error("[Admin Send Email Route Error]:", error);
    const msg = error instanceof Error ? error.message : "Failed to process email request.";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
