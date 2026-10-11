// Hardev Solar Services × Swayam Infraverse - 6-Step Installation Process
// "From Consultation to Installation"

export interface ProcessStep {
  step: string;
  title: string;
  shortDesc: string;
  details: string;
  iconName: "consultation" | "assessment" | "design" | "installation" | "testing" | "support";
}

export const INSTALLATION_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Consultation",
    shortDesc: "Understanding your power needs",
    details:
      "We discuss your average monthly electricity bill, power requirements, and solar aspirations to determine your ideal capacity.",
    iconName: "consultation",
  },
  {
    step: "02",
    title: "Site Assessment",
    shortDesc: "Physical rooftop survey",
    details:
      "Our qualified engineers inspect your rooftop, evaluate shadow free area, azimuth orientation, and assess structural integrity.",
    iconName: "assessment",
  },
  {
    step: "03",
    title: "System Design",
    shortDesc: "Custom engineering schematics",
    details:
      "We engineer an optimized module layout, select matching inverter capacity, and prepare an itemized bill of materials.",
    iconName: "design",
  },
  {
    step: "04",
    title: "Professional Installation",
    shortDesc: "Watertight mounting & cabling",
    details:
      "Trained engineers mount galvanized structures, install Tier-1 PV modules, route solar-grade DC cables, and set up earthing pits.",
    iconName: "installation",
  },
  {
    step: "05",
    title: "Testing & Handover",
    shortDesc: "Pre-commissioning quality checks",
    details:
      "Complete string testing, voltage verification, inverter configuration, and net-metering synchronization support.",
    iconName: "testing",
  },
  {
    step: "06",
    title: "Support & Service",
    shortDesc: "Reliable post-install assistance",
    details:
      "System documentation handover, homeowner orientation, and dependable customer service for ongoing operational queries.",
    iconName: "support",
  },
];
