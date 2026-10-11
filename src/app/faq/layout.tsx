import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Solar FAQ | Frequently Asked Questions | Hardev Solar Services",
  description:
    "Find answers to frequently asked questions about solar system installations, on-grid and off-grid solar, solar water heaters, and utility-scale projects from Hardev Solar Services.",
  openGraph: {
    title: "Solar FAQ | Hardev Solar Services",
    description:
      "Frequently asked questions about solar solutions, installation, and services across Maharashtra from Hardev Solar Services.",
    type: "website",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
