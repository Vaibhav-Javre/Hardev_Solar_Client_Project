import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Contact Hardev Solar Services | Solar Energy Consultation",
  description:
    "Get in touch with Hardev Solar Services for solar system installation, on-grid & off-grid solar, solar water heaters, and utility-scale solar projects across Maharashtra.",
  openGraph: {
    title: "Contact Hardev Solar Services",
    description:
      "Contact Hardev Solar Services in Nashik, Maharashtra. Solar solutions delivered across Maharashtra in partnership with Swayam Infraverse.",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
