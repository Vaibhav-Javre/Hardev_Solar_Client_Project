import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Solar Projects Portfolio | Hardev Solar Services",
  description:
    "Explore our portfolio of residential, commercial, and rooftop solar installations executed by Hardev Solar Services across Maharashtra.",
  openGraph: {
    title: "Solar Projects Portfolio | Hardev Solar Services",
    description:
      "Explore residential, commercial, and rooftop solar installations executed by Hardev Solar Services in partnership with Swayam Infraverse.",
    type: "website",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
