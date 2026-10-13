import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { getAdminSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Project } from "@/models/Project";

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
    return NextResponse.json({ success: false, message: "Missing project ID." }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    if (db && mongoose.Types.ObjectId.isValid(id)) {
      const project = await Project.findById(id).lean();
      if (project) {
        return NextResponse.json({ success: true, project });
      }
    }

    const found = (global.inMemoryProjects || []).find((p) => p._id === id);
    if (found) {
      return NextResponse.json({ success: true, project: found });
    }

    return NextResponse.json({ success: false, message: "Project not found." }, { status: 404 });
  } catch (error) {
    console.error("[Admin Project GET Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch project." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ success: false, message: "Missing project ID." }, { status: 400 });
  }

  try {
    const body = await req.json();

    const updates: any = {};
    if (body.title !== undefined) updates.title = body.title.trim();
    if (body.slug !== undefined) {
      updates.slug = body.slug
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
    if (body.description !== undefined) updates.description = body.description.trim();
    if (body.capacity !== undefined) updates.capacity = body.capacity.trim();
    if (body.location !== undefined) updates.location = body.location.trim();
    if (body.type !== undefined) updates.type = body.type;
    if (body.images !== undefined) updates.images = body.images;
    if (body.published !== undefined) updates.published = Boolean(body.published);

    try {
      const db = await connectToDatabase();
      if (db && mongoose.Types.ObjectId.isValid(id)) {
        const updated = await Project.findByIdAndUpdate(id, updates, { new: true }).lean();
        if (updated) {
          return NextResponse.json({
            success: true,
            message: "Project updated successfully.",
            project: updated,
          });
        }
      }
    } catch (err) {
      console.warn("[Admin Projects PATCH] DB fallback:", (err as Error).message);
    }

    if (global.inMemoryProjects) {
      const found = global.inMemoryProjects.find((p) => p._id === id);
      if (found) {
        Object.assign(found, updates);
        return NextResponse.json({
          success: true,
          message: "Project updated successfully.",
          project: found,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Project updated successfully.",
    });
  } catch (error: any) {
    console.error("[Admin Project PATCH Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update project." },
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
    return NextResponse.json({ success: false, message: "Missing project ID." }, { status: 400 });
  }

  try {
    let deleted = false;
    const db = await connectToDatabase();
    if (db && mongoose.Types.ObjectId.isValid(id)) {
      const res = await Project.findByIdAndDelete(id);
      if (res) deleted = true;
    }

    if (global.inMemoryProjects) {
      const idx = global.inMemoryProjects.findIndex((p) => p._id === id);
      if (idx !== -1) {
        global.inMemoryProjects.splice(idx, 1);
        deleted = true;
      }
    }

    if (!deleted) {
      return NextResponse.json({ success: false, message: "Project not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error("[Admin Project DELETE Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to delete project." }, { status: 500 });
  }
}
