// Hardev Solar Services × Swayam Infraverse - Centralized Project Data Architecture
// Single source of truth for Project Gallery, Filtered Lists, and Individual Project Pages.
// Structured so data can seamlessly be connected to MongoDB in production.

export type ProjectCategory = "All" | "Residential" | "Commercial" | "Rooftop";

export interface SystemDetails {
  moduleType?: string;
  inverterType?: string;
  structureType?: string;
  monitoring?: string;
  gridType?: string;
}

export interface ProjectRecord {
  id: string;
  title: string;
  slug: string;
  description: string;
  overview: string;
  capacity: string;
  location: string;
  type: "Residential" | "Commercial" | "Rooftop";
  category: "Residential" | "Commercial" | "Rooftop";
  coverImage?: string;
  images: string[];
  systemDetails: SystemDetails;
  isRepresentative: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * CLIENT NOTICE:
 * Replace representative records below with authentic site data and photos
 * as completed installations are documented.
 */
export const PROJECTS_COLLECTION: ProjectRecord[] = [
  {
    id: "proj-residential-5kw",
    title: "5 kW Residential Rooftop Solar PV",
    slug: "5-kw-residential-rooftop-solar",
    description:
      "High-efficiency monocrystalline solar array installed on an independent bungalow flat RCC terrace to offset daytime household loads.",
    overview:
      "Designed for a residential property to minimize grid electricity dependence. The system utilizes Tier-1 monocrystalline modules coupled with an on-grid string inverter featuring dual MPPT tracking. Structural anchoring was engineered with watertight roof pads to safeguard terrace waterproofing.",
    capacity: "5 kW",
    location: "Pune, Maharashtra",
    type: "Residential",
    category: "Residential",
    coverImage: "/images/projects/residential-5kw.jpg",
    images: ["/images/projects/residential-5kw.jpg"],
    systemDetails: {
      moduleType: "Tier-1 Monocrystalline PV Modules",
      inverterType: "Single-Phase On-Grid String Inverter",
      structureType: "Hot-Dip Galvanized Flat Terrace Mounting",
      monitoring: "Integrated Inverter Generation Display",
      gridType: "Single-Phase LT Grid-Tie",
    },
    isRepresentative: true,
    published: true,
    createdAt: "2026-01-15T10:00:00.000Z",
    updatedAt: "2026-03-01T12:00:00.000Z",
  },
  {
    id: "proj-commercial-25kw",
    title: "25 kW Commercial Rooftop Solar System",
    slug: "25-kw-commercial-facility-solar",
    description:
      "Three-phase grid-tied commercial rooftop installation engineered to reduce high daytime tariff expenses for business facilities.",
    overview:
      "Engineered for an active commercial facility with significant daytime power demand. The solar PV plant directly powers office cooling, equipment loads, and computing systems, synchronizing cleanly with the three-phase utility feed.",
    capacity: "25 kW",
    location: "Navi Mumbai, Maharashtra",
    type: "Commercial",
    category: "Commercial",
    coverImage: "/images/projects/commercial-25kw.jpg",
    images: ["/images/projects/commercial-25kw.jpg"],
    systemDetails: {
      moduleType: "High-Efficiency Photovoltaic Modules",
      inverterType: "Three-Phase Industrial String Inverter",
      structureType: "Heavy-Duty Hot-Dip Galvanized Truss System",
      monitoring: "Digital Plant Generation Interface",
      gridType: "Three-Phase 415V HT/LT Interconnection",
    },
    isRepresentative: true,
    published: true,
    createdAt: "2026-02-10T10:00:00.000Z",
    updatedAt: "2026-03-05T12:00:00.000Z",
  },
  {
    id: "proj-rooftop-8kw",
    title: "8 kW Elevated Terrace Solar Installation",
    slug: "8-kw-elevated-terrace-rooftop-solar",
    description:
      "Elevated structure solar installation planned to preserve 100% usable recreational space on the homeowner's terrace.",
    overview:
      "A tailored rooftop solution built on a raised galvanized framework. The elevated installation allows the family to continue utilizing their terrace for evening leisure and laundry while harvesting clean solar electricity overhead.",
    capacity: "8 kW",
    location: "Nashik, Maharashtra",
    type: "Rooftop",
    category: "Rooftop",
    coverImage: "/images/projects/elevated-8kw.jpg",
    images: ["/images/projects/elevated-8kw.jpg"],
    systemDetails: {
      moduleType: "Tier-1 Solar Photovoltaic Modules",
      inverterType: "Certified On-Grid String Inverter",
      structureType: "Elevated Super-Structure with 8-ft Head Clearance",
      monitoring: "Digital Performance Display",
      gridType: "Three-Phase Domestic Connection",
    },
    isRepresentative: true,
    published: true,
    createdAt: "2026-02-20T10:00:00.000Z",
    updatedAt: "2026-03-10T12:00:00.000Z",
  },
  {
    id: "proj-commercial-45kw",
    title: "45 kW Commercial Building PV Plant",
    slug: "45-kw-commercial-building-solar",
    description:
      "Turnkey commercial rooftop project powering daytime lighting, centralized ventilation, and office workstations.",
    overview:
      "Designed to buffer commercial power expenses across peak operating hours. Features multi-string surge suppression protection, certified solar-grade DC conduits, and dedicated chemical earthing pits for complete operational safety.",
    capacity: "45 kW",
    location: "Thane, Maharashtra",
    type: "Commercial",
    category: "Commercial",
    coverImage: "/images/projects/commercial-45kw.jpg",
    images: ["/images/projects/commercial-45kw.jpg"],
    systemDetails: {
      moduleType: "Certified Solar PV Panels",
      inverterType: "Dual String Three-Phase Inverter Array",
      structureType: "Non-Penetrating Metal Profile Roof Anchoring",
      monitoring: "Commercial Generation Monitoring",
      gridType: "Three-Phase Commercial Synchronization",
    },
    isRepresentative: true,
    published: true,
    createdAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-03-15T12:00:00.000Z",
  },
  {
    id: "proj-residential-3kw",
    title: "3 kW Independent Home Solar Solution",
    slug: "3-kw-residential-solar-home",
    description:
      "Compact rooftop solar system suited for 1-2 BHK independent houses seeking basic electricity bill relief.",
    overview:
      "An entry-level 3 kW solar array tailored for independent homes. Designed to offset standard refrigerator, fan, television, and daytime inverter air conditioner loads reliably throughout the year.",
    capacity: "3 kW",
    location: "Aurangabad, Maharashtra",
    type: "Residential",
    category: "Residential",
    coverImage: "/images/projects/residential-3kw.jpg",
    images: ["/images/projects/residential-3kw.jpg"],
    systemDetails: {
      moduleType: "Tier-1 Monocrystalline Modules",
      inverterType: "Single-Phase Solar Inverter",
      structureType: "Flat Terrace Modular Clamps",
      monitoring: "Digital Inverter Indicator",
      gridType: "Single-Phase Domestic Supply",
    },
    isRepresentative: true,
    published: true,
    createdAt: "2026-03-08T10:00:00.000Z",
    updatedAt: "2026-03-20T12:00:00.000Z",
  },
  {
    id: "proj-rooftop-35kw",
    title: "35 kW Institutional Rooftop Installation",
    slug: "35-kw-institutional-rooftop-solar",
    description:
      "Robust rooftop installation on educational / institutional premises engineered for long-term structural resilience.",
    overview:
      "Installed on an institutional building rooftop to reduce daytime campus electricity costs. Fully equipped with heavy-duty structural mountings tested against regional wind-shear, dedicated chemical earthing, and lightning arrestors.",
    capacity: "35 kW",
    location: "Kolhapur, Maharashtra",
    type: "Rooftop",
    category: "Rooftop",
    coverImage: "/images/projects/institutional-35kw.jpg",
    images: ["/images/projects/institutional-35kw.jpg"],
    systemDetails: {
      moduleType: "Tier-1 Solar Photovoltaic Modules",
      inverterType: "Three-Phase Grid-Tied Inverter",
      structureType: "Heavy-Duty Elevated Structure",
      monitoring: "Real-Time Digital System Dashboard",
      gridType: "Three-Phase Interconnection",
    },
    isRepresentative: true,
    published: true,
    createdAt: "2026-03-12T10:00:00.000Z",
    updatedAt: "2026-03-22T12:00:00.000Z",
  },
];

// Helper functions for accessing project records
export function getAllProjects(): ProjectRecord[] {
  return PROJECTS_COLLECTION.filter((p) => p.published);
}

export function getProjectBySlug(slug: string): ProjectRecord | undefined {
  return PROJECTS_COLLECTION.find((p) => p.slug === slug && p.published);
}

export function getProjectsByCategory(category: ProjectCategory): ProjectRecord[] {
  if (category === "All") return getAllProjects();
  return PROJECTS_COLLECTION.filter((p) => p.category === category && p.published);
}

// Backward-compatibility adapters for existing components
export interface ProjectCardData {
  id: string;
  title: string;
  slug: string;
  category: "Residential" | "Commercial" | "Rooftop";
  systemCapacity: string;
  location: string;
  scopeSummary: string;
  imageSrc?: string;
  isRepresentative?: boolean;
}

export const PROJECTS_DATA: ProjectCardData[] = PROJECTS_COLLECTION.map((p) => ({
  id: p.id,
  title: p.title,
  slug: p.slug,
  category: p.category,
  systemCapacity: p.capacity,
  location: p.location,
  scopeSummary: p.description,
  imageSrc: p.coverImage || "",
  isRepresentative: p.isRepresentative,
}));
