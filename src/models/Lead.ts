import mongoose, { Schema, Document, Model } from "mongoose";

export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "SITE_VISIT",
  "QUOTATION_SENT",
  "CONVERTED",
  "CLOSED",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const PROPERTY_TYPES = ["Residential", "Commercial", "Other"] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const INTERESTED_SERVICES = [
  "Residential Solar",
  "Commercial Solar",
  "Rooftop Solar",
  "Solar PV",
  "General Consultation",
] as const;
export type InterestedService = (typeof INTERESTED_SERVICES)[number];

export interface ILead extends Document {
  fullName: string;
  name?: string; // Compatibility alias
  phone: string;
  email?: string;
  city: string;
  location?: string; // Compatibility alias
  propertyType: PropertyType;
  monthlyElectricityBill?: string;
  monthlyBill?: string; // Compatibility alias
  interestedService: InterestedService | string;
  estimatedCapacityKW?: string;
  message?: string;
  source: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  status: LeadStatus;
  calculatorUsed?: boolean;
  estimatedSystemSize?: string;
  estimatedMonthlyGeneration?: number;
  estimatedAnnualGeneration?: number;
  estimatedMonthlySavings?: number;
  estimatedAnnualSavings?: number;
  estimatedPaybackYears?: number;
  roofAreaSqFt?: number;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    fullName: {
      type: String,
      required: [true, "Customer full name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    name: {
      // Maintained for backward compatibility with existing views
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Contact phone number is required"],
      trim: true,
      index: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    city: {
      type: String,
      required: [true, "City/Location is required"],
      trim: true,
      maxlength: [100, "City cannot exceed 100 characters"],
    },
    location: {
      // Maintained for backward compatibility
      type: String,
      trim: true,
    },
    propertyType: {
      type: String,
      enum: PROPERTY_TYPES,
      default: "Residential",
    },
    monthlyElectricityBill: {
      type: String,
      trim: true,
    },
    monthlyBill: {
      type: String,
      trim: true,
    },
    interestedService: {
      type: String,
      default: "General Consultation",
      trim: true,
    },
    estimatedCapacityKW: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    source: {
      type: String,
      default: "website",
      trim: true,
      maxlength: 100,
    },
    utmSource: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    utmMedium: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    utmCampaign: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    status: {
      type: String,
      enum: LEAD_STATUSES,
      default: "NEW",
      index: true,
    },
    calculatorUsed: {
      type: Boolean,
      default: false,
    },
    estimatedSystemSize: {
      type: String,
      trim: true,
    },
    estimatedMonthlyGeneration: {
      type: Number,
    },
    estimatedAnnualGeneration: {
      type: Number,
    },
    estimatedMonthlySavings: {
      type: Number,
    },
    estimatedAnnualSavings: {
      type: Number,
    },
    estimatedPaybackYears: {
      type: Number,
    },
    roofAreaSqFt: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to ensure compatibility fields stay synchronized
LeadSchema.pre("save", function () {
  if (this.fullName && !this.name) {
    this.name = this.fullName;
  } else if (this.name && !this.fullName) {
    this.fullName = this.name;
  }
  if (this.city && !this.location) {
    this.location = this.city;
  } else if (this.location && !this.city) {
    this.city = this.location;
  }
  if (this.monthlyElectricityBill && !this.monthlyBill) {
    this.monthlyBill = this.monthlyElectricityBill;
  } else if (this.monthlyBill && !this.monthlyElectricityBill) {
    this.monthlyElectricityBill = this.monthlyBill;
  }
});

// Explicit database indexes
LeadSchema.index({ status: 1 });
LeadSchema.index({ createdAt: -1 });
LeadSchema.index({ phone: 1 });

export const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
