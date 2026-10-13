import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Testimonial } from "@/models/Testimonial";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db) {
      const testimonials = await Testimonial.find({ published: true })
        .sort({ createdAt: -1 })
        .lean();

      return NextResponse.json({
        success: true,
        testimonials: testimonials.map((t: any) => ({
          _id: t._id.toString(),
          customerName: t.customerName,
          location: t.location,
          review: t.review,
          rating: t.rating,
          image: t.image,
          published: t.published,
          createdAt: t.createdAt?.toISOString?.() || new Date().toISOString(),
        })),
      });
    }

    const memPublished = (global.inMemoryTestimonials || []).filter((t) => t.published);
    return NextResponse.json({ success: true, testimonials: memPublished });
  } catch (error) {
    console.error("[Public Testimonials API Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch testimonials." },
      { status: 500 }
    );
  }
}
