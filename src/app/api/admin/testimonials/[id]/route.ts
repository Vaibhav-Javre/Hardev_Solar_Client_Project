import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { getAdminSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Testimonial } from "@/models/Testimonial";

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
    return NextResponse.json({ success: false, message: "Missing testimonial ID." }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    if (db && mongoose.Types.ObjectId.isValid(id)) {
      const doc = await Testimonial.findById(id).lean();
      if (doc) {
        return NextResponse.json({ success: true, testimonial: doc });
      }
    }

    const found = (global.inMemoryTestimonials || []).find((t) => t._id === id);
    if (found) {
      return NextResponse.json({ success: true, testimonial: found });
    }

    return NextResponse.json({ success: false, message: "Testimonial not found." }, { status: 404 });
  } catch (error) {
    console.error("[Admin Testimonial GET Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch testimonial." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ success: false, message: "Missing testimonial ID." }, { status: 400 });
  }

  try {
    const body = await req.json();

    const updates: any = {};
    if (body.customerName !== undefined) updates.customerName = body.customerName.trim();
    if (body.location !== undefined) updates.location = body.location.trim();
    if (body.review !== undefined) updates.review = body.review.trim();
    if (body.rating !== undefined) updates.rating = Number(body.rating);
    if (body.image !== undefined) updates.image = body.image?.trim();
    if (body.published !== undefined) updates.published = Boolean(body.published);

    try {
      const db = await connectToDatabase();
      if (db && mongoose.Types.ObjectId.isValid(id)) {
        const updated = await Testimonial.findByIdAndUpdate(id, updates, { new: true }).lean();
        if (updated) {
          return NextResponse.json({
            success: true,
            message: "Testimonial updated successfully.",
            testimonial: updated,
          });
        }
      }
    } catch (err) {
      console.warn("[Admin Testimonial PATCH] DB fallback:", (err as Error).message);
    }

    if (global.inMemoryTestimonials) {
      const found = global.inMemoryTestimonials.find((t) => t._id === id);
      if (found) {
        Object.assign(found, updates);
        return NextResponse.json({
          success: true,
          message: "Testimonial updated successfully.",
          testimonial: found,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Testimonial updated successfully.",
    });
  } catch (error: any) {
    console.error("[Admin Testimonial PATCH Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update testimonial." },
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
    return NextResponse.json({ success: false, message: "Missing testimonial ID." }, { status: 400 });
  }

  try {
    let deleted = false;
    const db = await connectToDatabase();
    if (db && mongoose.Types.ObjectId.isValid(id)) {
      const res = await Testimonial.findByIdAndDelete(id);
      if (res) deleted = true;
    }

    if (global.inMemoryTestimonials) {
      const idx = global.inMemoryTestimonials.findIndex((t) => t._id === id);
      if (idx !== -1) {
        global.inMemoryTestimonials.splice(idx, 1);
        deleted = true;
      }
    }

    if (!deleted) {
      return NextResponse.json({ success: false, message: "Testimonial not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Testimonial deleted successfully.",
    });
  } catch (error) {
    console.error("[Admin Testimonial DELETE Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to delete testimonial." }, { status: 500 });
  }
}
