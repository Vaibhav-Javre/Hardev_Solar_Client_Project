// Hardev Solar Services × Swayam Infraverse
// Centralized Business & Contact Configuration
// Single source of truth for business information, contact details, and partnership identity.

export interface AddressConfig {
  street: string;
  city: string;
  state: string;
  country: string;
  fullAddress: string;
}

export interface SiteConfig {
  companyName: string;
  partnerName: string;
  contactName: string;
  primaryPhone: string;
  secondaryPhone: string;
  displayPrimaryPhone: string;
  displaySecondaryPhone: string;
  email: string;
  address: string;
  addressDetails: AddressConfig;
  serviceArea: string;
  legalName: string;
  tagline: string;
  description: string;
  website: string;
  logo: string;
  phone: string;
  displayPhone: string;
  whatsapp: string;
  workingHours: string;
  scope: {
    minCapacityKW: number;
    maxCapacityKW: number;
    capacityRange: string;
    description: string;
    services: string[];
  };
}

export const SITE_CONFIG: SiteConfig = {
  companyName: "Hardev Solar Services",
  partnerName: "Swayam Infraverse",
  contactName: "Chandrakant Palase",
  primaryPhone: "9822823115",
  secondaryPhone: "8830067504",
  displayPrimaryPhone: "+91 98228 23115",
  displaySecondaryPhone: "+91 88300 67504",
  email: "chandrakantpalse@gmail.com",
  address: "7, Tuljai Apt., Indranagari, Kamathwade, Nashik, Maharashtra",
  addressDetails: {
    street: "7, Tuljai Apt., Indranagari, Kamathwade",
    city: "Nashik",
    state: "Maharashtra",
    country: "India",
    fullAddress: "7, Tuljai Apt., Indranagari, Kamathwade, Nashik, Maharashtra",
  },
  serviceArea: "Maharashtra",

  // Legacy & compatibility aliases
  legalName: "Hardev Solar Services",
  tagline: "Power Your Future with Solar Energy",
  description:
    "Hardev Solar Services delivers solar solutions tailored to your home, business, or industrial project. Services available across Maharashtra in partnership with Swayam Infraverse.",
  website: process.env.NEXT_PUBLIC_SITE_URL || "https://hardevsolar.com",
  logo: "/images/logo1.png",
  phone: "+919822823115",
  displayPhone: "+91 98228 23115",
  whatsapp: "919822823115",
  workingHours: "Monday – Saturday: 9:00 AM to 7:00 PM",

  scope: {
    minCapacityKW: 3,
    maxCapacityKW: 50,
    capacityRange: "3 kW to 50 kW & Utility-Scale",
    description: "Residential, Commercial, Industrial & Utility-Scale Solar Projects",
    services: [
      "Solar System Installation",
      "On-Grid Solar Systems",
      "Off-Grid Solar Systems",
      "Solar Water Heaters",
      "Utility-Scale Solar Projects",
    ],
  },
};

/**
 * Generates an official WhatsApp click-to-chat URL with prefilled professional messages
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const number = SITE_CONFIG.whatsapp;
  const defaultMessage =
    "Hello Hardev Solar Services, I am interested in your solar solutions. Please contact me to discuss my requirements.";
  const text = customMessage || defaultMessage;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/**
 * Helper to generate calculator-specific WhatsApp consultation link
 */
export function getCalculatorWhatsAppUrl(billOrBracket: string, capacityKW: string): string {
  const message = `Hello Hardev Solar Services, I calculated my solar requirement on your website (Monthly Bill: ${billOrBracket}, Estimated Capacity: ${capacityKW}). I would like to discuss a site assessment and quotation.`;
  return getWhatsAppUrl(message);
}

/**
 * Helper to generate a safe phone dialer URL for primary or secondary number
 */
export function getPhoneCallUrl(rawPhone?: string): string {
  const target = rawPhone || SITE_CONFIG.primaryPhone;
  const numericOnly = target.replace(/[^0-9]/g, "");
  if (numericOnly.length < 10) {
    return "/contact";
  }
  const cleanDialer = numericOnly.startsWith("91") ? `+${numericOnly}` : `+91${numericOnly}`;
  return `tel:${cleanDialer}`;
}

export function getSecondaryPhoneCallUrl(): string {
  return `tel:+91${SITE_CONFIG.secondaryPhone}`;
}

/**
 * Generates an official WhatsApp click-to-chat URL to message a specific customer/lead directly
 */
export function getCustomerWhatsAppUrl(
  phone?: string,
  customerName?: string,
  serviceName?: string
): string {
  if (!phone) return "#";
  let digits = phone.replace(/\D/g, "");
  if (!digits) return "#";
  if (digits.length === 10) {
    digits = `91${digits}`;
  } else if (digits.length === 11 && digits.startsWith("0")) {
    digits = `91${digits.slice(1)}`;
  } else if (digits.length === 12 && digits.startsWith("91")) {
    // already starts with 91
  }
  const name = customerName?.trim() || "Customer";
  const service = serviceName?.trim() || "solar consultation";
  const text = `Hello ${name}, thank you for contacting Hardev Solar Services. We are following up regarding your ${service} inquiry. How can we assist you today?`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates a clean phone dialer URL to call a specific customer/lead directly
 */
export function getCustomerPhoneCallUrl(rawPhone?: string): string {
  if (!rawPhone) return "#";
  let digits = rawPhone.replace(/\D/g, "");
  if (!digits) return "#";
  if (digits.length === 10) {
    return `tel:+91${digits}`;
  }
  if (digits.length === 11 && digits.startsWith("0")) {
    return `tel:+91${digits.slice(1)}`;
  }
  if (digits.length === 12 && digits.startsWith("91")) {
    return `tel:+${digits}`;
  }
  return `tel:+${digits}`;
}

export default SITE_CONFIG;

