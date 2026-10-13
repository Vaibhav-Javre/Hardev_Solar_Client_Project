import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Lead } from "@/models/Lead";
import {
  leadSubmissionSchema,
  sanitizeString,
  normalizeIndianPhone,
} from "@/lib/validations";
import { sendLeadNotificationEmail } from "@/lib/email";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export interface LeadItem {
  _id: string;
  fullName: string;
  name?: string;
  phone: string;
  email?: string;
  city: string;
  location?: string;
  propertyType: "Residential" | "Commercial" | "Other";
  monthlyElectricityBill?: string;
  monthlyBill?: string;
  interestedService?: string;
  estimatedCapacityKW?: string;
  message?: string;
  source: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  status: "NEW" | "CONTACTED" | "SITE_VISIT" | "QUOTATION_SENT" | "CONVERTED" | "CLOSED";
  calculatorUsed?: boolean;
  estimatedSystemSize?: string;
  estimatedMonthlyGeneration?: number;
  estimatedAnnualGeneration?: number;
  estimatedMonthlySavings?: number;
  estimatedAnnualSavings?: number;
  estimatedPaybackYears?: number;
  roofAreaSqFt?: number;
  createdAt: string;
}

// In-memory fallback cache for development/offline test runs
declare global {
  // eslint-disable-next-line no-var
  var inMemoryLeads: LeadItem[] | undefined;
  // eslint-disable-next-line no-var
  var rateLimitMap: Map<string, { count: number; resetAt: number }> | undefined;
}

if (!global.inMemoryLeads) {
  global.inMemoryLeads = [];
}

if (!global.rateLimitMap) {
  global.rateLimitMap = new Map();
}

/**
 * Basic prototype-level IP rate limiting
 * Limits to 5 lead submissions per 60 seconds per IP
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 5;

  const current = global.rateLimitMap?.get(ip);
  if (!current || now > current.resetAt) {
    // Periodic garbage collection of expired entries when map grows
    if (global.rateLimitMap && global.rateLimitMap.size > 500) {
      for (const [key, val] of global.rateLimitMap.entries()) {
        if (now > val.resetAt) global.rateLimitMap.delete(key);
      }
    }
    global.rateLimitMap?.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count++;
  return true;
}

export async function GET() {
  try {
    let leads: LeadItem[] = [];

    try {
      const db = await connectToDatabase();
      if (db) {
        const dbLeads = await Lead.find({}).sort({ createdAt: -1 }).lean();
        if (dbLeads && dbLeads.length > 0) {
          leads = dbLeads.map((l: any) => ({
            _id: l._id.toString(),
            fullName: l.fullName || l.name || "Customer",
            name: l.name || l.fullName || "Customer",
            phone: l.phone,
            email: l.email,
            city: l.city || l.location || "Maharashtra",
            location: l.location || l.city || "Maharashtra",
            propertyType: l.propertyType || "Residential",
            monthlyElectricityBill: l.monthlyElectricityBill || l.monthlyBill,
            monthlyBill: l.monthlyBill || l.monthlyElectricityBill,
            interestedService: l.interestedService || "General Consultation",
            estimatedCapacityKW: l.estimatedCapacityKW,
            message: l.message,
            source: l.source || "website",
            utmSource: l.utmSource,
            utmMedium: l.utmMedium,
            utmCampaign: l.utmCampaign,
            status: l.status || "NEW",
            calculatorUsed: Boolean(l.calculatorUsed),
            estimatedSystemSize: l.estimatedSystemSize,
            estimatedMonthlyGeneration: l.estimatedMonthlyGeneration,
            estimatedAnnualGeneration: l.estimatedAnnualGeneration,
            estimatedMonthlySavings: l.estimatedMonthlySavings,
            estimatedAnnualSavings: l.estimatedAnnualSavings,
            estimatedPaybackYears: l.estimatedPaybackYears,
            roofAreaSqFt: l.roofAreaSqFt,
            createdAt: l.createdAt?.toISOString?.() || new Date().toISOString(),
          }));
        }
      }
    } catch (dbErr) {
      console.warn("[Leads API GET] DB read fallback:", (dbErr as Error).message);
    }

    if (leads.length === 0) {
      leads = global.inMemoryLeads || [];
    }

    // Status breakdown counts
    const statusCounts: Record<string, number> = {
      NEW: 0,
      CONTACTED: 0,
      SITE_VISIT: 0,
      QUOTATION_SENT: 0,
      CONVERTED: 0,
      CLOSED: 0,
    };

    leads.forEach((l) => {
      if (statusCounts[l.status] !== undefined) {
        statusCounts[l.status]++;
      }
    });

    return NextResponse.json({
      success: true,
      total: leads.length,
      counts: statusCounts,
      leads,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error fetching leads";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting Check
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please wait a moment before submitting again.",
        },
        { status: 429 }
      );
    }

    // 2. Parse body
    const body = await req.json();

    // 3. Honeypot Anti-Spam Check
    if (body.website || body.honeypot || body._hp) {
      console.warn("[Anti-Spam] Bot honeypot triggered from IP:", ip);
      // Reject bot submission without exposing details
      return NextResponse.json(
        {
          success: false,
          message: "Request could not be validated. Please try again.",
        },
        { status: 400 }
      );
    }

    // Compatibility shim for legacy payload fields
    const rawPayload = {
      fullName: body.fullName || body.name,
      phone: body.phone,
      email: body.email,
      city: body.city || body.location,
      location: body.location || body.city,
      propertyType: body.propertyType || "Residential",
      monthlyElectricityBill: body.monthlyElectricityBill || body.monthlyBill,
      monthlyBill: body.monthlyBill || body.monthlyElectricityBill,
      interestedService: body.interestedService || "General Consultation",
      estimatedCapacityKW: body.estimatedCapacityKW,
      message: body.message,
      source: body.source || "website",
      calculatorUsed: Boolean(body.calculatorUsed),
      estimatedSystemSize: body.estimatedSystemSize,
      estimatedMonthlyGeneration: typeof body.estimatedMonthlyGeneration === "number" ? body.estimatedMonthlyGeneration : undefined,
      estimatedAnnualGeneration: typeof body.estimatedAnnualGeneration === "number" ? body.estimatedAnnualGeneration : undefined,
      estimatedMonthlySavings: typeof body.estimatedMonthlySavings === "number" ? body.estimatedMonthlySavings : undefined,
      estimatedAnnualSavings: typeof body.estimatedAnnualSavings === "number" ? body.estimatedAnnualSavings : undefined,
      estimatedPaybackYears: typeof body.estimatedPaybackYears === "number" ? body.estimatedPaybackYears : undefined,
      roofAreaSqFt: typeof body.roofAreaSqFt === "number" ? body.roofAreaSqFt : undefined,
      utmSource: body.utmSource || body.utm_source,
      utmMedium: body.utmMedium || body.utm_medium,
      utmCampaign: body.utmCampaign || body.utm_campaign,
    };

    // 4. Server-Side Zod Validation
    const validationResult = leadSubmissionSchema.safeParse(rawPayload);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please verify your inputs.",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const validData = validationResult.data;

    // 5. Sanitize user-controlled text inputs
    const sanitizedFullName = sanitizeString(validData.fullName);
    const sanitizedPhone = normalizeIndianPhone(validData.phone);
    const sanitizedEmail = validData.email ? sanitizeString(validData.email) : undefined;
    const sanitizedCity = sanitizeString(validData.city || validData.location);
    const sanitizedMessage = validData.message ? sanitizeString(validData.message) : undefined;
    const sanitizedBill = validData.monthlyElectricityBill || validData.monthlyBill;

    let leadId = `LEAD-${Date.now()}`;

    // 6. Connect to MongoDB and create Lead
    let dbSaved = false;
    try {
      const db = await connectToDatabase();
      if (db) {
        const doc = await Lead.create({
          fullName: sanitizedFullName,
          name: sanitizedFullName,
          phone: sanitizedPhone,
          email: sanitizedEmail || undefined,
          city: sanitizedCity,
          location: sanitizedCity,
          propertyType: validData.propertyType,
          monthlyElectricityBill: sanitizedBill || "Not specified",
          monthlyBill: sanitizedBill || "Not specified",
          interestedService: validData.interestedService || "General Consultation",
          estimatedCapacityKW: validData.estimatedCapacityKW || (validData.estimatedSystemSize ? `${validData.estimatedSystemSize} kW` : "To be determined"),
          calculatorUsed: Boolean(validData.calculatorUsed),
          estimatedSystemSize: validData.estimatedSystemSize,
          estimatedMonthlyGeneration: validData.estimatedMonthlyGeneration,
          estimatedAnnualGeneration: validData.estimatedAnnualGeneration,
          estimatedMonthlySavings: validData.estimatedMonthlySavings,
          estimatedAnnualSavings: validData.estimatedAnnualSavings,
          estimatedPaybackYears: validData.estimatedPaybackYears,
          roofAreaSqFt: validData.roofAreaSqFt,
          message: sanitizedMessage || "Requested solar consultation",
          source: validData.source || "website",
          utmSource: validData.utmSource,
          utmMedium: validData.utmMedium,
          utmCampaign: validData.utmCampaign,
          status: "NEW",
        });
        leadId = doc._id.toString();
        dbSaved = true;
        console.log("[Leads API] Saved lead to MongoDB:", leadId);
      }
    } catch (dbError) {
      console.warn("[Leads API] Initial MongoDB save attempt error:", (dbError as Error).message);
    }

    // If initial attempt failed and MONGODB_URI is configured, retry once
    if (!dbSaved && process.env.MONGODB_URI) {
      try {
        console.warn("[Leads API] Retrying MongoDB connection and write...");
        const db = await connectToDatabase();
        if (db) {
          const doc = await Lead.create({
            fullName: sanitizedFullName,
            name: sanitizedFullName,
            phone: sanitizedPhone,
            email: sanitizedEmail || undefined,
            city: sanitizedCity,
            location: sanitizedCity,
            propertyType: validData.propertyType,
            monthlyElectricityBill: sanitizedBill || "Not specified",
            monthlyBill: sanitizedBill || "Not specified",
            interestedService: validData.interestedService || "General Consultation",
            estimatedCapacityKW: validData.estimatedCapacityKW || (validData.estimatedSystemSize ? `${validData.estimatedSystemSize} kW` : "To be determined"),
            calculatorUsed: Boolean(validData.calculatorUsed),
            estimatedSystemSize: validData.estimatedSystemSize,
            estimatedMonthlyGeneration: validData.estimatedMonthlyGeneration,
            estimatedAnnualGeneration: validData.estimatedAnnualGeneration,
            estimatedMonthlySavings: validData.estimatedMonthlySavings,
            estimatedAnnualSavings: validData.estimatedAnnualSavings,
            estimatedPaybackYears: validData.estimatedPaybackYears,
            roofAreaSqFt: validData.roofAreaSqFt,
            message: sanitizedMessage || "Requested solar consultation",
            source: validData.source || "website",
            utmSource: validData.utmSource,
            utmMedium: validData.utmMedium,
            utmCampaign: validData.utmCampaign,
            status: "NEW",
          });
          leadId = doc._id.toString();
          dbSaved = true;
          console.log("[Leads API] Saved lead to MongoDB on retry:", leadId);
        }
      } catch (retryErr) {
        console.error("[Leads API] MongoDB retry save error:", (retryErr as Error).message);
      }
    }

    // Maintain in-memory store for fallback/fast reads
    const memoryLead: LeadItem = {
      _id: leadId,
      fullName: sanitizedFullName,
      name: sanitizedFullName,
      phone: sanitizedPhone,
      email: sanitizedEmail,
      city: sanitizedCity,
      location: sanitizedCity,
      propertyType: validData.propertyType,
      monthlyElectricityBill: sanitizedBill || "Not specified",
      monthlyBill: sanitizedBill || "Not specified",
      interestedService: validData.interestedService || "General Consultation",
      estimatedCapacityKW: validData.estimatedCapacityKW || (validData.estimatedSystemSize ? `${validData.estimatedSystemSize} kW` : "To be determined"),
      calculatorUsed: Boolean(validData.calculatorUsed),
      estimatedSystemSize: validData.estimatedSystemSize,
      estimatedMonthlyGeneration: validData.estimatedMonthlyGeneration,
      estimatedAnnualGeneration: validData.estimatedAnnualGeneration,
      estimatedMonthlySavings: validData.estimatedMonthlySavings,
      estimatedAnnualSavings: validData.estimatedAnnualSavings,
      estimatedPaybackYears: validData.estimatedPaybackYears,
      roofAreaSqFt: validData.roofAreaSqFt,
      message: sanitizedMessage || "Requested solar consultation",
      source: validData.source || "website",
      utmSource: validData.utmSource,
      utmMedium: validData.utmMedium,
      utmCampaign: validData.utmCampaign,
      status: "NEW",
      createdAt: new Date().toISOString(),
    };

    if (global.inMemoryLeads) {
      global.inMemoryLeads.unshift(memoryLead);
    }

    // 7. Send Internal Email Notification via Resend (Non-blocking / Fault-tolerant)
    try {
      await sendLeadNotificationEmail({
        fullName: sanitizedFullName,
        phone: sanitizedPhone,
        email: sanitizedEmail,
        city: sanitizedCity,
        propertyType: validData.propertyType,
        interestedService: validData.interestedService,
        monthlyElectricityBill: sanitizedBill,
        message: sanitizedMessage,
        source: validData.source,
        leadId,
      });
    } catch (emailErr) {
      // Intentionally caught: email failure never fails the lead submission
      console.warn("[Leads API] Notification email dispatch warning:", (emailErr as Error).message);
    }

    // 8. Return 201 Success Response
    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your enquiry has been received. Our team will contact you soon.",
        leadId,
      },
      { status: 201 }
    );
  } catch (error) {
    // Log unexpected errors safely on the server without exposing internals to the user
    console.error("[Leads API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { leadId, status } = await req.json();

    if (!leadId || !status) {
      return NextResponse.json(
        { success: false, message: "Missing leadId or status" },
        { status: 400 }
      );
    }

    try {
      const db = await connectToDatabase();
      if (db && !leadId.startsWith("LEAD-")) {
        await Lead.findByIdAndUpdate(leadId, { status });
      }
    } catch (err) {
      console.warn("[Leads PATCH] DB update fallback:", (err as Error).message);
    }

    if (global.inMemoryLeads) {
      const found = global.inMemoryLeads.find((l) => l._id === leadId);
      if (found) {
        found.status = status;
      }
    }

    return NextResponse.json({ success: true, leadId, status });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error updating lead";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
