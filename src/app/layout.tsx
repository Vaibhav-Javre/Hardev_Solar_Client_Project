import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | Solar Solutions Across Maharashtra`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Hardev Solar Services",
    "Swayam Infraverse",
    "Solar System Installation",
    "On-Grid Solar Systems",
    "Off-Grid Solar Systems",
    "Solar Water Heaters",
    "Utility-Scale Solar Projects",
    "Solar solutions Maharashtra",
    "Rooftop solar Nashik",
    "Commercial solar Maharashtra",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    title: `${SITE_CONFIG.name} | In partnership with ${SITE_CONFIG.partnerName}`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | Solar Solutions Across Maharashtra`,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <JsonLd />
      </head>
      <body className={`min-h-full flex flex-col bg-white text-[#123524] ${inter.variable} font-sans antialiased pb-16 lg:pb-0`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyMobileCTA />
        <FloatingContact />
      </body>
    </html>
  );
}
