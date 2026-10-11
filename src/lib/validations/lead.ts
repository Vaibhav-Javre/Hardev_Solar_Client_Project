import { z } from "zod";
import { normalizeIndianPhone } from "@/lib/validations";

export { normalizeIndianPhone, sanitizeString, leadSubmissionSchema } from "@/lib/validations";
export type { LeadSubmissionPayload } from "@/lib/validations";

const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;

// Schema specifically tailored for React Hook Form client components
export const leadFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name (at least 2 characters)." })
    .max(80, { message: "Name cannot exceed 80 characters." }),
  phone: z
    .string()
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
  location: z
    .string()
    .trim()
    .min(2, { message: "Please provide your city, area, or district." })
    .max(100, { message: "Location cannot exceed 100 characters." }),
  city: z.string().trim().optional(),
  propertyType: z.enum(["Residential", "Commercial", "Other"]),
  monthlyBill: z.string().optional(),
  monthlyElectricityBill: z.string().optional(),
  interestedService: z.string().optional(),
  estimatedCapacityKW: z.string().optional(),
  calculatorUsed: z.boolean().optional(),
  estimatedSystemSize: z.string().optional(),
  estimatedMonthlyGeneration: z.number().optional(),
  estimatedAnnualGeneration: z.number().optional(),
  estimatedMonthlySavings: z.number().optional(),
  estimatedAnnualSavings: z.number().optional(),
  estimatedPaybackYears: z.number().optional(),
  roofAreaSqFt: z.number().optional(),
  message: z.string().max(1000, { message: "Message cannot exceed 1000 characters." }).optional(),
  source: z.string().optional(),
  website: z.string().optional(), // Honeypot field
});

export type LeadFormInput = z.infer<typeof leadFormSchema>;
