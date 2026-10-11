import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Testimonial } from "@/models/Testimonial";

export interface TestimonialData {
  _id: string;
  customerName: string;
  location: string;
  review: string;
  rating: number;
  image?: string;
  published: boolean;
  createdAt: string;
}

declare global {
  // eslint-disable-next-line no-var
  var inMemoryTestimonials: TestimonialData[] | undefined;
}

if (!global.inMemoryTestimonials) {
  global.inMemoryTestimonials = [];
}

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const db = await connectToDatabase();
    if (db) {
      const testimonials = await Testimonial.find({}).sort({ createdAt: -1 }).lean();
      if (testimonials && testimonials.length > 0) {
        return NextResponse.json({
          success: true,
          testimonials: testimonials.map((t: any) => ({
            _id: t._id.toString(),
            customerName: t.customerName,
            location: t.location,
            review: t.review,
            rating: t.rating,
            image: t.image,
            published: Boolean(t.published),
            createdAt: t.createdAt?.toISOString?.() || new Date().toISOString(),
          })),
        });
      }
    }

    return NextResponse.json({
      success: true,
      testimonials: global.inMemoryTestimonials || [],
    });
  } catch (error) {
    console.error("[Admin Testimonials GET Error]:", error);
    return NextResponse.json({
      success: true,
      testimonials: global.inMemoryTestimonials || [],
    });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { customerName, location, review, rating, image, published } = body;

    if (!customerName || !location || !review) {
      return NextResponse.json(
        { success: false, message: "Customer name, location, and review text are required." },
        { status: 400 }
      );
    }

    let newId = `TEST-${Date.now()}`;

    try {
      const db = await connectToDatabase();
      if (db) {
        const testimonial = await Testimonial.create({
          customerName: customerName.trim(),
          location: location.trim(),
          review: review.trim(),
          rating: Number(rating) || 5,
          image: image?.trim() || undefined,
          published: published ?? false,
        });
        newId = testimonial._id.toString();
      }
    } catch (dbErr) {
      console.warn("[Admin Testimonial POST] DB fallback:", (dbErr as Error).message);
    }

    const memItem: TestimonialData = {
      _id: newId,
      customerName: customerName.trim(),
      location: location.trim(),
      review: review.trim(),
      rating: Number(rating) || 5,
      image: image?.trim() || undefined,
      published: published ?? false,
      createdAt: new Date().toISOString(),
    };

    if (global.inMemoryTestimonials) {
      global.inMemoryTestimonials.unshift(memItem);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial created successfully.",
        testimonial: memItem,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[Admin Testimonial POST Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create testimonial." },
      { status: 500 }
    );
  }
}
