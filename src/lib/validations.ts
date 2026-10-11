import { z } from "zod";

// Indian mobile number regex: 10 digits starting with 6, 7, 8, or 9
const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;

/**
 * Normalizes Indian phone numbers:
 * Strips whitespace, hyphens, parentheses, and leading "+91" or "0"
 */
export function normalizeIndianPhone(input: string): string {
  if (!input) return "";
  let cleaned = input.replace(/[\s\-()]/g, "");
  if (cleaned.startsWith("+91")) {
    cleaned = cleaned.substring(3);
  } else if (cleaned.startsWith("91") && cleaned.length === 12) {
    cleaned = cleaned.substring(2);
  } else if (cleaned.startsWith("0") && cleaned.length === 11) {
    cleaned = cleaned.substring(1);
  }
  return cleaned;
}

/**
 * Simple HTML sanitizer to strip dangerous script tags and HTML tags
 */
export function sanitizeString(input: string | undefined | null): string {
  if (!input) return "";
  return input
    .replace(/<[^>]*>?/gm, "") // Strip HTML tags
    .trim();
}

export const leadSubmissionSchema = z.object({
  fullName: z
    .string({ error: "Please enter your full name." })
    .trim()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(80, { message: "Name cannot exceed 80 characters." }),
  
  phone: z
    .string({ error: "Please provide your contact phone number." })
    .trim()
    .transform((val) => normalizeIndianPhone(val))
    .refine((val) => INDIAN_PHONE_REGEX.test(val), {
      message: "Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).",
    }),

  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." })
    .optional()
    .or(z.literal("")),

  // Accepts either city or location
  city: z
    .string()
    .trim()
    .min(2, { message: "Please provide your city or district." })
    .max(100, { message: "City cannot exceed 100 characters." })
    .optional(),

  location: z
    .string()
    .trim()
    .min(2, { message: "Please provide your city, area, or district." })
    .max(100, { message: "Location cannot exceed 100 characters." })
    .optional(),

  propertyType: z
    .enum(["Residential", "Commercial", "Other"])
    .default("Residential"),

  monthlyElectricityBill: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => {
      if (typeof val === "number") {
        return val >= 0 ? `₹${val.toLocaleString("en-IN")}` : "";
      }
      return val || "";
    }),

  monthlyBill: z.string().optional(),

  interestedService: z
    .string()
    .max(100)
    .optional()
    .default("General Consultation"),

  estimatedCapacityKW: z.string().max(50).optional(),

  calculatorUsed: z.boolean().optional(),
  estimatedSystemSize: z.string().max(50).optional(),
  estimatedMonthlyGeneration: z.number().optional(),
  estimatedAnnualGeneration: z.number().optional(),
  estimatedMonthlySavings: z.number().optional(),
  estimatedAnnualSavings: z.number().optional(),
  estimatedPaybackYears: z.number().optional(),
  roofAreaSqFt: z.number().optional(),

  message: z
    .string()
    .max(1000, { message: "Message cannot exceed 1000 characters." })
    .optional(),

  source: z.string().max(100).optional().default("website"),

  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),

  // Anti-spam Honeypot field (hidden in UI; bots will auto-fill it)
  website: z.string().max(100).optional(),
  honeypot: z.string().max(100).optional(),
}).refine(
  (data) => Boolean(data.city || data.location),
  {
    message: "City / Location is required.",
    path: ["city"],
  }
);

export type LeadSubmissionPayload = z.infer<typeof leadSubmissionSchema>;
