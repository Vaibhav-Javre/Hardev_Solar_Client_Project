// Hardev Solar Services × Swayam Infraverse - Testimonials Configuration & Placeholder Data
// Ready for client customer reviews. Clearly marked as placeholders to prevent fabricated claims.

export interface TestimonialItem {
  id: string;
  customerName: string;
  location: string;
  testimonial: string;
  rating: number; // 1 to 5
  customerPhoto?: string;
  systemType?: string;
  isPlaceholder?: boolean;
}

/**
 * CLIENT NOTICE:
 * Replace these placeholder entries with authenticated customer reviews and photos
 * as they are collected from completed installations.
 */
export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "review-placeholder-1",
    customerName: "Residential Homeowner",
    location: "Pune, Maharashtra",
    testimonial:
      "The engineering team conducted a thorough shadow analysis and proposed a neat 5 kW elevated structure. Installation was completed cleanly without damaging our terrace waterproofing.",
    rating: 5,
    customerPhoto: "",
    systemType: "5 kW Residential Rooftop",
    isPlaceholder: true,
  },
  {
    id: "review-placeholder-2",
    customerName: "Commercial Facility Owner",
    location: "Navi Mumbai, Maharashtra",
    testimonial:
      "Professional site assessment, quality balance-of-system components, and continuous updates throughout the project execution. Our daytime grid power dependency has dropped notably.",
    rating: 5,
    customerPhoto: "",
    systemType: "25 kW Commercial Solar PV",
    isPlaceholder: true,
  },
  {
    id: "review-placeholder-3",
    customerName: "Bungalow Owner",
    location: "Nashik, Maharashtra",
    testimonial:
      "We wanted to preserve our usable rooftop area. Hardev Solar Services designed an elevated galvanized frame with tidy wiring and reliable safety earthing. Honest and transparent team.",
    rating: 5,
    customerPhoto: "",
    systemType: "8 kW Rooftop Solar",
    isPlaceholder: true,
  },
];
