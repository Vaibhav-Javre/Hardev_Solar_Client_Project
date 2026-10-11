import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Lead } from "@/models/Lead";
import { Project } from "@/models/Project";
import { Testimonial } from "@/models/Testimonial";

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const db = await connectToDatabase();

    if (db) {
      const [
        totalLeads,
        newLeads,
        contacted,
        siteVisits,
        quotations,
        converted,
        closed,
        totalProjects,
        publishedProjects,
        totalTestimonials,
        publishedTestimonials,
        recentLeadsDocs,
      ] = await Promise.all([
        Lead.countDocuments({}),
        Lead.countDocuments({ status: "NEW" }),
        Lead.countDocuments({ status: "CONTACTED" }),
        Lead.countDocuments({ status: "SITE_VISIT" }),
        Lead.countDocuments({ status: "QUOTATION_SENT" }),
        Lead.countDocuments({ status: "CONVERTED" }),
        Lead.countDocuments({ status: "CLOSED" }),
        Project.countDocuments({}),
        Project.countDocuments({ published: true }),
        Testimonial.countDocuments({}),
        Testimonial.countDocuments({ published: true }),
        Lead.find({}).sort({ createdAt: -1 }).limit(5).lean(),
      ]);

      const recentLeads = recentLeadsDocs.map((doc: any) => ({
        _id: doc._id.toString(),
        fullName: doc.fullName || doc.name || "Customer",
        phone: doc.phone,
        email: doc.email || "",
        city: doc.city || doc.location || "Maharashtra",
        propertyType: doc.propertyType || "Residential",
        monthlyElectricityBill: doc.monthlyElectricityBill || doc.monthlyBill || "",
        interestedService: doc.interestedService || "General Consultation",
        status: doc.status || "NEW",
        createdAt: doc.createdAt?.toISOString?.() || new Date().toISOString(),
      }));

      return NextResponse.json({
        success: true,
        stats: {
          totalLeads,
          newLeads,
          contacted,
          siteVisits,
          quotations,
          converted,
          closed,
          totalProjects,
          publishedProjects,
          totalTestimonials,
          publishedTestimonials,
        },
        recentLeads,
      });
    }

    // In-memory fallback
    const memLeads = global.inMemoryLeads || [];
    const memProjects = global.inMemoryProjects || [];
    const memTestimonials = global.inMemoryTestimonials || [];

    return NextResponse.json({
      success: true,
      stats: {
        totalLeads: memLeads.length,
        newLeads: memLeads.filter((l) => l.status === "NEW").length,
        contacted: memLeads.filter((l) => l.status === "CONTACTED").length,
        siteVisits: memLeads.filter((l) => l.status === "SITE_VISIT").length,
        quotations: memLeads.filter((l) => l.status === "QUOTATION_SENT").length,
        converted: memLeads.filter((l) => l.status === "CONVERTED").length,
        closed: memLeads.filter((l) => l.status === "CLOSED").length,
        totalProjects: memProjects.length,
        publishedProjects: memProjects.filter((p) => p.published).length,
        totalTestimonials: memTestimonials.length,
        publishedTestimonials: memTestimonials.filter((t) => t.published).length,
      },
      recentLeads: memLeads.slice(0, 5),
    });
  } catch (error) {
    console.error("[Admin Stats GET Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load dashboard metrics." },
      { status: 500 }
    );
  }
}
