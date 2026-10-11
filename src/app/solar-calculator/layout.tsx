import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Solar Calculator | Hardev Solar Services",
  description:
    "Estimate your solar requirement and explore potential savings with Hardev Solar Services. Solar solutions tailored for homes, businesses, and industrial projects across Maharashtra.",
  openGraph: {
    title: "Solar Calculator | Hardev Solar Services",
    description:
      "Estimate your solar requirement and explore potential savings with Hardev Solar Services in partnership with Swayam Infraverse.",
    type: "website",
  },
};

export default function SolarCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
