import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { getAdminSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Lead, LEAD_STATUSES } from "@/models/Lead";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ success: false, message: "Missing lead ID." }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    if (db && mongoose.Types.ObjectId.isValid(id)) {
      const doc = await Lead.findById(id).lean();
      if (!doc) {
        return NextResponse.json({ success: false, message: "Lead not found." }, { status: 404 });
      }
      return NextResponse.json({ success: true, lead: doc });
    }

    // In-memory fallback
    const found = (global.inMemoryLeads || []).find((l) => l._id === id);
    if (found) {
      return NextResponse.json({ success: true, lead: found });
    }

    return NextResponse.json({ success: false, message: "Lead not found." }, { status: 404 });
  } catch (error) {
    console.error("[Admin Lead GET Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch lead." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ success: false, message: "Missing lead ID." }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { status, message } = body;

    if (status && !LEAD_STATUSES.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid lead status provided." },
        { status: 400 }
      );
    }

    const updates: any = {};
    if (status) updates.status = status;
    if (message !== undefined) updates.message = message;

    const db = await connectToDatabase();
    if (db && mongoose.Types.ObjectId.isValid(id)) {
      const updated = await Lead.findByIdAndUpdate(id, updates, { new: true }).lean();
      if (!updated) {
        return NextResponse.json({ success: false, message: "Lead not found." }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        message: "Lead status updated successfully.",
        lead: updated,
      });
    }

    // In-memory fallback
    if (global.inMemoryLeads) {
      const found = global.inMemoryLeads.find((l) => l._id === id);
      if (found) {
        if (status) found.status = status;
        return NextResponse.json({
          success: true,
          message: "Lead status updated successfully.",
          lead: found,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Lead status updated successfully.",
    });
  } catch (error) {
    console.error("[Admin Lead PATCH Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update lead." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ success: false, message: "Missing lead ID." }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    if (db && mongoose.Types.ObjectId.isValid(id)) {
      const deleted = await Lead.findByIdAndDelete(id);
      if (!deleted) {
        return NextResponse.json({ success: false, message: "Lead not found." }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        message: "Lead deleted successfully.",
      });
    }

    // In-memory fallback
    if (global.inMemoryLeads) {
      const idx = global.inMemoryLeads.findIndex((l) => l._id === id);
      if (idx !== -1) {
        global.inMemoryLeads.splice(idx, 1);
        return NextResponse.json({
          success: true,
          message: "Lead deleted successfully.",
        });
      }
    }

    return NextResponse.json(
      { success: false, message: "Lead not found." },
      { status: 404 }
    );
  } catch (error) {
    console.error("[Admin Lead DELETE Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete lead." },
      { status: 500 }
    );
  }
}
