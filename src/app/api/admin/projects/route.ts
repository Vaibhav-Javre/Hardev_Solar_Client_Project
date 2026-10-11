import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Project } from "@/models/Project";

export interface ProjectData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  capacity: string;
  location: string;
  type: "Residential" | "Commercial" | "Rooftop" | "Solar PV";
  images: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

declare global {
  // eslint-disable-next-line no-var
  var inMemoryProjects: ProjectData[] | undefined;
}

if (!global.inMemoryProjects) {
  global.inMemoryProjects = [];
}

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const db = await connectToDatabase();
    if (db) {
      const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
      if (projects && projects.length > 0) {
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
            published: Boolean(p.published),
            createdAt: p.createdAt?.toISOString?.() || new Date().toISOString(),
            updatedAt: p.updatedAt?.toISOString?.() || new Date().toISOString(),
          })),
        });
      }
    }

    return NextResponse.json({
      success: true,
      projects: global.inMemoryProjects || [],
    });
  } catch (error) {
    console.error("[Admin Projects GET Error]:", error);
    return NextResponse.json({
      success: true,
      projects: global.inMemoryProjects || [],
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
    const { title, slug, description, capacity, location, type, images, published } = body;

    if (!title || !slug || !description || !capacity || !location) {
      return NextResponse.json(
        { success: false, message: "Missing required project fields (title, slug, description, capacity, location)." },
        { status: 400 }
      );
    }

    const cleanSlug = slug
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    let newId = `PROJ-${Date.now()}`;

    try {
      const db = await connectToDatabase();
      if (db) {
        const existing = await Project.findOne({ slug: cleanSlug });
        if (existing) {
          return NextResponse.json(
            { success: false, message: "A project with this slug already exists. Please choose a unique slug." },
            { status: 400 }
          );
        }

        const project = await Project.create({
          title: title.trim(),
          slug: cleanSlug,
          description: description.trim(),
          capacity: capacity.trim(),
          location: location.trim(),
          type: type || "Residential",
          images: Array.isArray(images) ? images : [],
          published: published ?? true,
        });

        newId = project._id.toString();
      }
    } catch (dbErr) {
      console.warn("[Admin Projects POST] MongoDB fallback:", (dbErr as Error).message);
    }

    const memItem: ProjectData = {
      _id: newId,
      title: title.trim(),
      slug: cleanSlug,
      description: description.trim(),
      capacity: capacity.trim(),
      location: location.trim(),
      type: type || "Residential",
      images: Array.isArray(images) ? images : [],
      published: published ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (global.inMemoryProjects) {
      global.inMemoryProjects.unshift(memItem);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully.",
        project: memItem,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[Admin Project POST Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create project." },
      { status: 500 }
    );
  }
}
