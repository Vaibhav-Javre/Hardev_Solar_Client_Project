// Hardev Solar Services × Swayam Infraverse - 6 Why Choose Us Feature Cards
// Verified information & approved value propositions

export interface WhyChooseFeature {
  number: string;
  title: string;
  description: string;
  iconName: "engineers" | "components" | "installation" | "reliability" | "customer" | "support";
}

export const WHY_CHOOSE_FEATURES: WhyChooseFeature[] = [
  {
    number: "01",
    title: "Experienced & Trained Engineers",
    description:
      "Our qualified technical team brings specialized electrical knowledge to assess your rooftop, model shadow patterns, and plan an optimal solar system.",
    iconName: "engineers",
  },
  {
    number: "02",
    title: "High-Quality Components",
    description:
      "We source Tier-1 monocrystalline panels, certified on-grid inverters, and heavy-duty structural mountings from established solar manufacturers.",
    iconName: "components",
  },
  {
    number: "03",
    title: "Professional Installation",
    description:
      "Systematic installation practices with watertight roof fastenings, certified solar-grade DC cabling, and dedicated chemical earthing systems.",
    iconName: "installation",
  },
  {
    number: "04",
    title: "Reliable Solar Systems",
    description:
      "Engineered for consistent daily generation throughout Indian seasons, ensuring dependable clean power output across the entire 3 kW to 50 kW range.",
    iconName: "reliability",
  },
  {
    number: "05",
    title: "Customer-Centric Service",
    description:
      "Honest energy guidance and transparent proposals with no exaggerated generation claims or high-pressure sales tactics.",
    iconName: "customer",
  },
  {
    number: "06",
    title: "Long-Term Support",
    description:
      "Comprehensive handover orientation, net-metering synchronization assistance, and dependable ongoing customer support whenever you need it.",
    iconName: "support",
  },
];
