// Hardev Solar Services × Swayam Infraverse
// Centralized Business & Contact Configuration
import {
  SITE_CONFIG as CENTRAL_CONFIG,
  getWhatsAppUrl as centralGetWhatsAppUrl,
  getPhoneCallUrl as centralGetPhoneCallUrl,
  getSecondaryPhoneCallUrl as centralGetSecondaryPhoneCallUrl,
} from "./site-config";

export const SITE_CONFIG = {
  name: CENTRAL_CONFIG.companyName,
  companyName: CENTRAL_CONFIG.companyName,
  partnerName: CENTRAL_CONFIG.partnerName,
  contactName: CENTRAL_CONFIG.contactName,
  legalName: CENTRAL_CONFIG.legalName,
  tagline: CENTRAL_CONFIG.tagline,
  description: CENTRAL_CONFIG.description,
  url: CENTRAL_CONFIG.website,
  logo: CENTRAL_CONFIG.logo,
  serviceArea: CENTRAL_CONFIG.serviceArea,

  // Contact details
  contact: {
    name: CENTRAL_CONFIG.contactName,
    partner: CENTRAL_CONFIG.partnerName,
    phone: `+91${CENTRAL_CONFIG.primaryPhone}`,
    displayPhone: CENTRAL_CONFIG.displayPrimaryPhone,
    secondaryPhone: `+91${CENTRAL_CONFIG.secondaryPhone}`,
    secondaryDisplayPhone: CENTRAL_CONFIG.displaySecondaryPhone,
    whatsapp: CENTRAL_CONFIG.whatsapp,
    email: CENTRAL_CONFIG.email,
    address: {
      street: CENTRAL_CONFIG.addressDetails.street,
      city: CENTRAL_CONFIG.addressDetails.city,
      state: CENTRAL_CONFIG.addressDetails.state,
      country: CENTRAL_CONFIG.addressDetails.country,
      fullAddress: CENTRAL_CONFIG.addressDetails.fullAddress,
    },
    workingHours: CENTRAL_CONFIG.workingHours,
    serviceArea: CENTRAL_CONFIG.serviceArea,
  },

  // Verified Services & Scope
  scope: {
    capacityRange: CENTRAL_CONFIG.scope.capacityRange,
    minCapacityKW: CENTRAL_CONFIG.scope.minCapacityKW,
    maxCapacityKW: CENTRAL_CONFIG.scope.maxCapacityKW,
    services: CENTRAL_CONFIG.scope.services,
    qualityPillars: [
      "Qualified & Educated Staff",
      "Trained Engineers",
      "Professional Installation",
      "High-Quality Materials",
      "Quality Wiring & Protection Components",
      "Reliable Systems with Reduced Maintenance",
    ],
  },

  // WhatsApp Pre-filled message generator
  whatsappTemplates: {
    general:
      "Hello Hardev Solar Services, I am interested in your solar solutions. Please contact me to discuss my requirements.",
    calculator: (bill: string, capacity: string) =>
      `Hello Hardev Solar Services, I calculated my solar requirement on your website (Monthly Bill: ${bill}, Estimated Capacity: ${capacity}). I would like to discuss my solar solution and quotation.`,
    residential:
      "Hello Hardev Solar Services, I am looking for a residential solar system for my home. Please provide consultation.",
    commercial:
      "Hello Hardev Solar Services, I am inquiring about a commercial / industrial solar solution for my business or project.",
  },

  // Navigation Links
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    {
      label: "Services",
      href: "/services",
      submenu: [
        { label: "All Services", href: "/services" },
        { label: "Residential Solar", href: "/services/residential-solar" },
        { label: "Commercial Solar", href: "/services/commercial-solar" },
      ],
    },
    { label: "Projects", href: "/projects" },
    { label: "Solar Calculator", href: "/solar-calculator" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const getWhatsAppUrl = centralGetWhatsAppUrl;
export const getPhoneCallUrl = centralGetPhoneCallUrl;
export const getSecondaryPhoneCallUrl = centralGetSecondaryPhoneCallUrl;

export default SITE_CONFIG;
