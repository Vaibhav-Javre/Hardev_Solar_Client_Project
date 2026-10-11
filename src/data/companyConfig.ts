// Hardev Solar Services × Swayam Infraverse
// Centralized Business & Contact Configuration

import {
  SITE_CONFIG as BASE_CONFIG,
  getWhatsAppUrl as baseGetWhatsAppUrl,
  getPhoneCallUrl as baseGetPhoneCallUrl,
  getSecondaryPhoneCallUrl as baseGetSecondaryPhoneCallUrl,
} from "@/lib/config";

export interface CompanyContact {
  name: string;
  partner: string;
  phone: string;
  displayPhone: string;
  secondaryPhone: string;
  secondaryDisplayPhone: string;
  whatsapp: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    fullAddress: string;
  };
  workingHours: string;
  serviceArea: string;
}

export const COMPANY_CONFIG = {
  name: BASE_CONFIG.name,
  partnerName: BASE_CONFIG.partnerName,
  legalName: BASE_CONFIG.legalName,
  tagline: "Power Your Future with Solar Energy",
  supportingText:
    "Hardev Solar Services delivers solar solutions tailored to your home, business, or industrial project. In partnership with Swayam Infraverse, serving across Maharashtra.",
  primaryCity: "Nashik, Maharashtra",
  serviceArea: "Maharashtra",
  contact: BASE_CONFIG.contact as CompanyContact,
  scope: {
    minCapacityKW: 3,
    maxCapacityKW: 50,
    capacityDisplay: "3 kW – 50 kW & Utility Scale",
    description: "Residential, Commercial, Industrial & Utility-Scale Solar Projects",
    services: BASE_CONFIG.scope.services,
  },
} as const;

export const getWhatsAppUrl = baseGetWhatsAppUrl;
export const getPhoneCallUrl = baseGetPhoneCallUrl;
export const getSecondaryPhoneCallUrl = baseGetSecondaryPhoneCallUrl;
