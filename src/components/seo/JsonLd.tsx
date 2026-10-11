import React from "react";
import { SITE_CONFIG } from "@/lib/site-config";

export const JsonLd: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_CONFIG.companyName,
    legalName: SITE_CONFIG.legalName,
    url: SITE_CONFIG.website,
    logo: `${SITE_CONFIG.website}${SITE_CONFIG.logo}`,
    image: `${SITE_CONFIG.website}${SITE_CONFIG.logo}`,
    description: SITE_CONFIG.description,
    telephone: `+91${SITE_CONFIG.primaryPhone}`,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.addressDetails.street,
      addressLocality: SITE_CONFIG.addressDetails.city,
      addressRegion: SITE_CONFIG.addressDetails.state,
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "State",
      name: SITE_CONFIG.serviceArea,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Solar Energy Solutions",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Solar System Installation",
            description:
              "Turnkey solar system installation for residential, commercial, and industrial properties.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "On-Grid Solar Systems",
            description:
              "Grid-connected solar systems with net-metering integration across Maharashtra.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Off-Grid Solar Systems",
            description:
              "Independent solar power systems with battery backup storage.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Solar Water Heaters",
            description:
              "Clean solar thermal water heating solutions for homes and commercial facilities.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Utility-Scale Solar Projects",
            description:
              "High-capacity solar installations for industrial facilities and enterprises.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
