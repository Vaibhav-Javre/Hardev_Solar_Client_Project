import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Lead } from "@/models/Lead";

export async function GET(req: NextRequest) {
  // 1. Verify Admin Session
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Admin session required." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = req.nextUrl;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)));
    const search = (searchParams.get("search") || "").trim();
    const status = searchParams.get("status");
    const propertyType = searchParams.get("propertyType");
    const service = searchParams.get("service");
    const sort = searchParams.get("sort") || "newest";

    const db = await connectToDatabase();

    // Query builder
    const query: any = {};

    if (status && status !== "ALL") {
      query.status = status;
    }

    if (propertyType && propertyType !== "ALL") {
      query.propertyType = propertyType;
    }

    if (service && service !== "ALL") {
      query.interestedService = { $regex: new RegExp(service, "i") };
    }

    if (search) {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { fullName: searchRegex },
        { name: searchRegex },
        { phone: searchRegex },
        { email: searchRegex },
        { city: searchRegex },
        { location: searchRegex },
      ];
    }

    // Sort order
    let sortOptions: any = { createdAt: -1 };
    if (sort === "oldest") {
      sortOptions = { createdAt: 1 };
    } else if (sort === "name") {
      sortOptions = { fullName: 1 };
    }

    if (db) {
      const total = await Lead.countDocuments(query);
      const skip = (page - 1) * limit;

      const leadsDocs = await Lead.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean();

      // Overall pipeline count stats
      const [
        totalAll,
        countNew,
        countContacted,
        countSiteVisit,
        countQuotation,
        countConverted,
        countClosed,
      ] = await Promise.all([
        Lead.countDocuments({}),
        Lead.countDocuments({ status: "NEW" }),
        Lead.countDocuments({ status: "CONTACTED" }),
        Lead.countDocuments({ status: "SITE_VISIT" }),
        Lead.countDocuments({ status: "QUOTATION_SENT" }),
        Lead.countDocuments({ status: "CONVERTED" }),
        Lead.countDocuments({ status: "CLOSED" }),
      ]);

      const counts = {
        total: totalAll,
        NEW: countNew,
        CONTACTED: countContacted,
        SITE_VISIT: countSiteVisit,
        QUOTATION_SENT: countQuotation,
        CONVERTED: countConverted,
        CLOSED: countClosed,
      };

      const leads = leadsDocs.map((doc: any) => ({
        _id: doc._id.toString(),
        fullName: doc.fullName || doc.name || "Customer",
        phone: doc.phone,
        email: doc.email || "",
        city: doc.city || doc.location || "Maharashtra",
        propertyType: doc.propertyType || "Residential",
        monthlyElectricityBill: doc.monthlyElectricityBill || doc.monthlyBill || "",
        interestedService: doc.interestedService || "General Consultation",
        estimatedCapacityKW: doc.estimatedCapacityKW || "",
        message: doc.message || "",
        source: doc.source || "website",
        utmSource: doc.utmSource || "",
        utmMedium: doc.utmMedium || "",
        utmCampaign: doc.utmCampaign || "",
        status: doc.status || "NEW",
        calculatorUsed: Boolean(doc.calculatorUsed),
        estimatedSystemSize: doc.estimatedSystemSize,
        estimatedMonthlyGeneration: doc.estimatedMonthlyGeneration,
        estimatedAnnualGeneration: doc.estimatedAnnualGeneration,
        estimatedMonthlySavings: doc.estimatedMonthlySavings,
        estimatedAnnualSavings: doc.estimatedAnnualSavings,
        estimatedPaybackYears: doc.estimatedPaybackYears,
        roofAreaSqFt: doc.roofAreaSqFt,
        createdAt: doc.createdAt?.toISOString?.() || new Date().toISOString(),
        updatedAt: doc.updatedAt?.toISOString?.() || new Date().toISOString(),
      }));

      return NextResponse.json({
        success: true,
        leads,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
        counts,
      });
    }

    // In-memory fallback if DB not yet connected
    let memoryLeads = (global.inMemoryLeads || []).map((l) => ({
      _id: l._id,
      fullName: l.fullName || l.name || "Customer",
      phone: l.phone,
      email: l.email || "",
      city: l.city || l.location || "Maharashtra",
      propertyType: l.propertyType || "Residential",
      monthlyElectricityBill: l.monthlyElectricityBill || l.monthlyBill || "",
      interestedService: l.interestedService || "General Consultation",
      estimatedCapacityKW: l.estimatedCapacityKW || "",
      message: l.message || "",
      source: l.source || "website",
      utmSource: l.utmSource || "",
      utmMedium: l.utmMedium || "",
      utmCampaign: l.utmCampaign || "",
      status: l.status || "NEW",
      calculatorUsed: Boolean(l.calculatorUsed),
      estimatedSystemSize: l.estimatedSystemSize,
      estimatedMonthlyGeneration: l.estimatedMonthlyGeneration,
      estimatedAnnualGeneration: l.estimatedAnnualGeneration,
      estimatedMonthlySavings: l.estimatedMonthlySavings,
      estimatedAnnualSavings: l.estimatedAnnualSavings,
      estimatedPaybackYears: l.estimatedPaybackYears,
      roofAreaSqFt: l.roofAreaSqFt,
      createdAt: l.createdAt,
      updatedAt: l.createdAt,
    }));

    if (status && status !== "ALL") {
      memoryLeads = memoryLeads.filter((l) => l.status === status);
    }
    if (propertyType && propertyType !== "ALL") {
      memoryLeads = memoryLeads.filter((l) => l.propertyType === propertyType);
    }
    if (search) {
      const s = search.toLowerCase();
      memoryLeads = memoryLeads.filter(
        (l) =>
          l.fullName.toLowerCase().includes(s) ||
          l.phone.includes(s) ||
          l.city.toLowerCase().includes(s) ||
          (l.email && l.email.toLowerCase().includes(s))
      );
    }

    const total = memoryLeads.length;
    const skip = (page - 1) * limit;
    const paginated = memoryLeads.slice(skip, skip + limit);

    return NextResponse.json({
      success: true,
      leads: paginated,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
      counts: {
        total: (global.inMemoryLeads || []).length,
        NEW: (global.inMemoryLeads || []).filter((l) => l.status === "NEW").length,
        CONTACTED: (global.inMemoryLeads || []).filter((l) => l.status === "CONTACTED").length,
        SITE_VISIT: (global.inMemoryLeads || []).filter((l) => l.status === "SITE_VISIT").length,
        QUOTATION_SENT: (global.inMemoryLeads || []).filter((l) => l.status === "QUOTATION_SENT").length,
        CONVERTED: (global.inMemoryLeads || []).filter((l) => l.status === "CONVERTED").length,
        CLOSED: (global.inMemoryLeads || []).filter((l) => l.status === "CLOSED").length,
      },
    });
  } catch (error) {
    console.error("[Admin Leads GET Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch leads." },
      { status: 500 }
    );
  }
}
