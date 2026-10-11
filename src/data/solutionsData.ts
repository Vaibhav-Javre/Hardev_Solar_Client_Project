// Hardev Solar Services × Swayam Infraverse
// Approved Solar Service Categories from Business Details

export interface SolarSolution {
  id: string;
  title: string;
  slug: string;
  description: string;
  capacityScope: string;
  features: string[];
  iconType: "installation" | "on-grid" | "off-grid" | "water-heater" | "utility" | "residential" | "commercial";
}

export const SOLAR_SOLUTIONS: SolarSolution[] = [
  {
    id: "solar-system-installation",
    title: "Solar System Installation",
    slug: "/services#solar-system-installation",
    description:
      "Professional end-to-end solar system installation services for residential properties, commercial setups, and industrial facilities.",
    capacityScope: "Turnkey Installation",
    features: [
      "Turnkey installation tailored to site conditions",
      "Careful structural mounting and wiring integration",
      "Suitable for homes, businesses, and industrial roofs",
      "Services available across Maharashtra",
    ],
    iconType: "installation",
  },
  {
    id: "on-grid-solar",
    title: "On-Grid Solar Systems",
    slug: "/services#on-grid-solar",
    description:
      "Grid-connected solar power systems that supply clean power to your premises and synchronize with the electrical utility grid to help reduce electricity bills.",
    capacityScope: "Grid-Connected PV",
    features: [
      "Synchronized operation with utility electrical grid",
      "Powers daytime electrical loads seamlessly",
      "Bi-directional net-metering integration support",
      "Ideal for homes and commercial establishments",
    ],
    iconType: "on-grid",
  },
  {
    id: "off-grid-solar",
    title: "Off-Grid Solar Systems",
    slug: "/services#off-grid-solar",
    description:
      "Independent solar power solutions equipped with energy storage to provide reliable electricity in areas with frequent grid interruptions or remote locations.",
    capacityScope: "Battery-Backed Autonomy",
    features: [
      "Independent power generation without grid dependence",
      "Battery storage support for nighttime and backup use",
      "Reliable electricity for remote and rural properties",
      "Engineered for consistent daily operation",
    ],
    iconType: "off-grid",
  },
  {
    id: "solar-water-heaters",
    title: "Solar Water Heaters",
    slug: "/services#solar-water-heaters",
    description:
      "Clean solar thermal water heating solutions for residential homes, housing complexes, hospitals, and commercial facilities.",
    capacityScope: "Solar Thermal Heating",
    features: [
      "Harnesses solar thermal energy for hot water needs",
      "Helps lower electric geyser and water heating expenses",
      "Durable collector tanks and weather-resistant piping",
      "Suitable for individual homes and collective housing",
    ],
    iconType: "water-heater",
  },
  {
    id: "utility-scale-solar",
    title: "Utility-Scale Solar Projects",
    slug: "/services#utility-scale-solar",
    description:
      "Large-scale solar installations designed to meet high energy demands for industrial enterprises, commercial campuses, and extensive infrastructure facilities.",
    capacityScope: "Utility & Industrial Scale",
    features: [
      "High-capacity solar system planning and execution",
      "Engineered for industrial facilities and enterprise infrastructure",
      "Structured for long-term operational performance",
      "Tailored project execution across Maharashtra",
    ],
    iconType: "utility",
  },
];
