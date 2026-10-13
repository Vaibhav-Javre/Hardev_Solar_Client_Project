import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  let dbStatus = "not_configured";
  try {
    const db = await connectToDatabase();
    if (db) {
      dbStatus = "connected";
    }
  } catch {
    dbStatus = "error";
  }

  return NextResponse.json({
    status: "ok",
    company: "Hardev Solar Services",
    partner: "Swayam Infraverse",
    service: "Solar Solutions Across Maharashtra",
    capacityScope: "3 kW to 50 kW & Utility-Scale",
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
}
