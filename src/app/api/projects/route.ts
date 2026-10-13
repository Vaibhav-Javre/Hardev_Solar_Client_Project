import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Project } from "@/models/Project";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db) {
      const projects = await Project.find({ published: true })
        .sort({ createdAt: -1 })
        .lean();

      return NextResponse.json({
        success: true,
        projects: projects.map((p: any) => ({
          _id: p._id.toString(),
          title: p.title,
          slug: p.slug,
          description: p.description,
          capacity: p.capacity,
          location: p.location,
          type: p.type,
          images: p.images || [],
          published: p.published,
          createdAt: p.createdAt?.toISOString?.() || new Date().toISOString(),
        })),
      });
    }

    const memPublished = (global.inMemoryProjects || []).filter((p) => p.published);
    return NextResponse.json({ success: true, projects: memPublished });
  } catch (error) {
    console.error("[Public Projects API Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch projects." },
      { status: 500 }
    );
  }
}
