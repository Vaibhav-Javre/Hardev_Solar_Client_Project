import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Sun,
  Leaf,
  ShieldCheck,
  Users,
  Wrench,
  HeartHandshake,
  ArrowRight,
  Target,
  Sparkles,
  Compass,
  Phone,
  Building2,
  Home,
  Factory,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SITE_CONFIG, getPhoneCallUrl, getSecondaryPhoneCallUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us | Hardev Solar Services",
  description:
    "Learn about Hardev Solar Services, our solar solutions for homes, businesses, and industrial projects, our partnership with Swayam Infraverse, and Maharashtra-wide service.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Hardev Solar Services",
    description:
      "Hardev Solar Services delivers solar solutions across Maharashtra in partnership with Swayam Infraverse.",
    url: `${SITE_CONFIG.website}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "About Us" }]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#F0FDF4] via-white to-[#F0FDF4] text-[#0F291E] py-14 sm:py-20 relative overflow-hidden border-b border-[#DCFCE7]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DCFCE7]/60 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 shadow-xs">
              <Sun className="w-3.5 h-3.5 fill-[#FACC15] text-[#F59E0B]" />
              <span>Hardev Solar Services × Swayam Infraverse</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F291E] mb-6 leading-tight">
              Powering a Smarter, More{" "}
              <span className="text-[#16A34A]">Sustainable Energy Future</span>
            </h1>

            <p className="text-[#475569] text-base sm:text-xl leading-relaxed">
              Welcome to Hardev Solar Services! We provide reliable solar solutions to help you save on your electricity bills. Installing a solar system is not just about generating electricity—it is a step towards a better and smarter future, whether for your home, commercial property, or industrial project.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Who We Are */}
      <section id="who-we-are" className="py-16 sm:py-24 border-b border-[#DCFCE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DCFCE7] text-[#15803D] text-xs font-extrabold rounded-full border border-[#BBF7D0]">
                <Leaf className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Our Business</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#0F291E] tracking-tight">
                Who We Are
              </h2>

              <p className="text-[#0F291E] leading-relaxed text-base sm:text-lg font-medium">
                <strong>Hardev Solar Services</strong> is a dedicated customer-facing solar energy service provider based in Nashik, Maharashtra.
              </p>

              <p className="text-[#475569] leading-relaxed text-sm sm:text-base">
                We provide solar solutions tailored to the unique energy demands of our clients, helping reduce dependence on conventional electricity tariffs. We believe that clean solar energy is one of the most accessible and responsible investments a property owner can make.
              </p>

              <p className="text-[#475569] leading-relaxed text-sm sm:text-base">
                From initial site evaluation and system recommendation to professional installation and ongoing support, Hardev Solar Services delivers dependable service with complete integrity and transparent communication.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-[#0F291E]">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7]">
                  <Home className="w-4 h-4 text-[#16A34A]" />
                  <span>Residential Rooftop Systems</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7]">
                  <Building2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Commercial Solar PV Plants</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7]">
                  <Factory className="w-4 h-4 text-[#16A34A]" />
                  <span>Industrial & Utility Projects</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7]">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                  <span>Maharashtra-Wide Service Coverage</span>
                </div>
              </div>
            </div>

            {/* Right Card: Business Commitments */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#F0FDF4] to-white rounded-3xl p-8 border-2 border-[#DCFCE7] space-y-5 shadow-sm">
              <h3 className="font-black text-[#0F291E] text-xl border-b border-[#DCFCE7] pb-3">
                Core Principles
              </h3>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0 border border-[#BBF7D0]">
                  <Sun className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <div>
                  <div className="font-extrabold text-[#0F291E] text-sm">Tailored Solar Solutions</div>
                  <p className="text-xs text-[#475569] mt-0.5">Customizing system design and capacity to your actual electricity consumption.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0 border border-[#BBF7D0]">
                  <ShieldCheck className="w-5 h-5 text-[#16A34A]" />
                </div>
                <div>
                  <div className="font-extrabold text-[#0F291E] text-sm">Quality Components</div>
                  <p className="text-xs text-[#475569] mt-0.5">Utilizing reliable solar panels, certified inverters, and heavy-duty structural mountings.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0 border border-[#BBF7D0]">
                  <Wrench className="w-5 h-5 text-[#16A34A]" />
                </div>
                <div>
                  <div className="font-extrabold text-[#0F291E] text-sm">Professional Installation</div>
                  <p className="text-xs text-[#475569] mt-0.5">Careful mounting, leak-proof roof clamping, and safe electrical wiring practices.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0 border border-[#BBF7D0]">
                  <HeartHandshake className="w-5 h-5 text-[#16A34A]" />
                </div>
                <div>
                  <div className="font-extrabold text-[#0F291E] text-sm">Customer-Centric Care</div>
                  <p className="text-xs text-[#475569] mt-0.5">Clear advice, transparent proposals without pressure, and responsive support.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Our Approach */}
      <section id="our-approach" className="py-16 sm:py-24 bg-[#F0FDF4] border-b border-[#DCFCE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DCFCE7] text-[#15803D] text-xs font-extrabold rounded-full border border-[#BBF7D0] mb-3">
              <Compass className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>How We Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F291E] tracking-tight">
              Our Approach
            </h2>
            <p className="text-[#475569] text-base mt-3 leading-relaxed">
              We approach every solar project with diligence and practical engineering. Installing solar is an important decision for any household or organization, and we ensure the process is straightforward and well-coordinated from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border-2 border-[#DCFCE7] shadow-sm hover:border-[#86EFAC] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mb-5 border border-[#BBF7D0]">
                <Compass className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-xl font-black text-[#0F291E] mb-3">
                1. Assessment & Sizing
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed">
                We evaluate your past electricity bills, sanctioned power load, and physical roof area to determine the most effective system capacity for your requirements.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border-2 border-[#DCFCE7] shadow-sm hover:border-[#86EFAC] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mb-5 border border-[#BBF7D0]">
                <Wrench className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-xl font-black text-[#0F291E] mb-3">
                2. Methodical Installation
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed">
                Our technicians install mounting frames tailored to your roof structure, securely place the photovoltaic panels, and route certified DC cabling with complete electrical protection.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border-2 border-[#DCFCE7] shadow-sm hover:border-[#86EFAC] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mb-5 border border-[#BBF7D0]">
                <HeartHandshake className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-xl font-black text-[#0F291E] mb-3">
                3. Grid Tie & Long-Term Support
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed">
                We assist with electrical synchronization and documentation, guide you through system operation, and remain available for technical questions and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Solar Solutions for Homes and Businesses */}
      <section id="solutions-homes-businesses" className="py-16 sm:py-24 border-b border-[#DCFCE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DCFCE7] text-[#15803D] text-xs font-extrabold rounded-full border border-[#BBF7D0]">
                <Home className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Rooftop Systems</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#0F291E] tracking-tight">
                Solar Solutions for Homes and Businesses
              </h2>

              <p className="text-[#475569] text-base leading-relaxed">
                Whether you live in an independent bungalow or run an active commercial establishment, our rooftop solar solutions turn unutilized roof space into an active power-generating asset.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7]">
                  <h4 className="font-extrabold text-[#0F291E] text-base mb-1">
                    Residential Solar Systems
                  </h4>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    Designed for homes, bungalows, and housing societies. Offsets daytime appliance consumption, lighting, fans, and air conditioning while reducing dependency on climbing utility tariffs.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7]">
                  <h4 className="font-extrabold text-[#0F291E] text-base mb-1">
                    Commercial Solar PV
                  </h4>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    Tailored for offices, retail showrooms, healthcare clinics, and educational centers where daytime energy usage coincides with peak solar radiation hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] rounded-3xl p-8 border border-[#BBF7D0] space-y-4">
              <h3 className="text-xl font-black text-[#0F291E]">
                What We Provide for Rooftops:
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#0F291E] font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <span>Flat concrete terrace mounting with leak-proof pads</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <span>Elevated frame structures to preserve usable terrace space</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <span>On-grid and off-grid configurations with battery options</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <span>Solar water heaters for domestic and commercial hot water needs</span>
                </li>
              </ul>

              <div className="pt-4">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-[#16A34A] hover:text-[#15803D] underline underline-offset-4"
                >
                  <span>Explore All Services & Solutions →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Industrial and Utility-Scale Solar */}
      <section id="industrial-utility-solar" className="py-16 sm:py-24 bg-[#F0FDF4] border-b border-[#DCFCE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DCFCE7] text-[#15803D] text-xs font-extrabold rounded-full border border-[#BBF7D0]">
                <Factory className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Heavy Energy Demand</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#0F291E] tracking-tight">
                Industrial and Utility-Scale Solar
              </h2>

              <p className="text-[#475569] text-base leading-relaxed">
                Industrial facilities, warehouses, manufacturing units, and utility-scale installations have higher power consumption profiles and require specialized project execution.
              </p>

              <p className="text-[#475569] text-sm sm:text-base leading-relaxed">
                Hardev Solar Services provides utility-scale solar project solutions designed to handle high energy loads. We work closely with facility engineers to plan structural mounting on industrial sheds or open ground, coordinate high-capacity electrical distribution, and ensure robust long-term performance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-bold text-[#0F291E]">
                <div className="p-3 bg-white rounded-xl border border-[#DCFCE7] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Industrial Metal Shed Framing</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#DCFCE7] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Three-Phase Electrical Integration</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#DCFCE7] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Utility-Scale Project Management</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#DCFCE7] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Reduced Operating Electricity Costs</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white rounded-3xl p-8 border-2 border-[#DCFCE7] shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center border border-[#BBF7D0]">
                <Factory className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-xl font-black text-[#0F291E]">
                High-Capacity Execution
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                We handle the end-to-end scope for industrial and high-capacity projects, ensuring adherence to electrical safety protocols and continuous support across Maharashtra.
              </p>
              <div className="pt-2">
                <Link
                  href="/#consultation"
                  className="px-6 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2"
                >
                  <span>Discuss Industrial Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Our Partnership with Swayam Infraverse */}
      <section id="partnership" className="py-16 sm:py-24 border-b border-[#DCFCE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#F0FDF4] via-white to-[#DCFCE7] rounded-3xl p-8 sm:p-12 border-2 border-[#BBF7D0] shadow-sm">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 shadow-xs">
                <HeartHandshake className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Strategic Collaboration</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#0F291E] tracking-tight mb-4">
                Our Partnership with Swayam Infraverse
              </h2>

              <p className="text-[#0F291E] text-base sm:text-lg font-medium leading-relaxed mb-4">
                <strong>Hardev Solar Services</strong> works in close partnership with <strong>Swayam Infraverse</strong> to deliver comprehensive, high-standard solar solutions to our customers.
              </p>

              <p className="text-[#475569] text-sm sm:text-base leading-relaxed mb-4">
                Hardev Solar Services is the main customer-facing solar service provider, managing client consultations, site surveys, and local execution. Through our collaboration with Swayam Infraverse as our business partner, we bring together shared industry knowledge, technical coordination, and dependable project execution.
              </p>

              <p className="text-[#475569] text-sm sm:text-base leading-relaxed">
                This partnership strengthens our ability to deliver residential, commercial, industrial, and utility-scale solar projects with uncompromising reliability across Maharashtra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Serving Customers Across Maharashtra */}
      <section id="maharashtra-coverage" className="py-16 sm:py-24 bg-[#F0FDF4] border-b border-[#DCFCE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DCFCE7] text-[#15803D] text-xs font-extrabold rounded-full border border-[#BBF7D0]">
                <MapPin className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Geographical Reach</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#0F291E] tracking-tight">
                Solar Solutions Across Maharashtra
              </h2>

              <p className="text-[#0F291E] text-base sm:text-lg font-medium leading-relaxed">
                Hardev Solar Services provides solar solutions tailored to residential, commercial, and industrial requirements across Maharashtra.
              </p>

              <p className="text-[#475569] text-sm sm:text-base leading-relaxed">
                Headquartered at our Nashik office, we serve property owners and enterprises throughout the state. Whether you are looking to set up an on-grid rooftop solar system for your home, install an off-grid solar setup, equip your premises with solar water heaters, or undertake a large-scale industrial project, our team is ready to assist you.
              </p>

              <div className="p-4 bg-white rounded-2xl border border-[#DCFCE7] space-y-2 text-xs sm:text-sm text-[#0F291E]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold block">Primary Office Address:</span>
                    <span className="text-[#475569]">{SITE_CONFIG.address}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 pt-1">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold block">Service Coverage:</span>
                    <span className="text-[#475569]">Available across Maharashtra for Residential, Commercial & Industrial Projects</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Contact Details */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-8 border-2 border-[#DCFCE7] shadow-sm space-y-5">
              <h3 className="font-black text-[#0F291E] text-xl border-b border-[#DCFCE7] pb-3">
                Connect Directly
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <span className="text-[11px] font-extrabold uppercase text-[#15803D] block">
                    Contact Person
                  </span>
                  <span className="font-bold text-[#0F291E] text-base">
                    {SITE_CONFIG.contactName}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-extrabold uppercase text-[#15803D] block">
                    Primary Phone
                  </span>
                  <a
                    href={getPhoneCallUrl(SITE_CONFIG.primaryPhone)}
                    className="font-bold text-[#16A34A] hover:underline"
                  >
                    {SITE_CONFIG.displayPrimaryPhone}
                  </a>
                </div>

                <div>
                  <span className="text-[11px] font-extrabold uppercase text-[#15803D] block">
                    Alternative Phone
                  </span>
                  <a
                    href={getSecondaryPhoneCallUrl()}
                    className="font-bold text-[#16A34A] hover:underline"
                  >
                    {SITE_CONFIG.displaySecondaryPhone}
                  </a>
                </div>

                <div>
                  <span className="text-[11px] font-extrabold uppercase text-[#15803D] block">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="font-bold text-[#0F291E] hover:text-[#16A34A] break-all"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <WhatsAppButton
                  label="Chat on WhatsApp"
                  className="w-full text-center justify-center text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Section: Contact Hardev Solar Services */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#F0FDF4] via-white to-[#DCFCE7] text-center border-b border-[#DCFCE7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F291E] tracking-tight mb-4">
            Contact Hardev Solar Services
          </h2>
          <p className="text-[#475569] text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Have questions about rooftop space, system sizing, or site feasibility? Our solar team is ready to guide you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#consultation"
              className="w-full sm:w-auto px-7 py-3.5 bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534] text-white font-extrabold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </Link>

            <WhatsAppButton
              label="Chat on WhatsApp"
              variant="outline"
              className="w-full sm:w-auto bg-white py-3 px-6 text-sm"
            />

            <a
              href={getPhoneCallUrl(SITE_CONFIG.primaryPhone)}
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-[#F0FDF4] text-[#0F291E] font-bold rounded-xl text-sm border border-[#DCFCE7] shadow-xs flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#16A34A]" />
              <span>Call: {SITE_CONFIG.displayPhone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
