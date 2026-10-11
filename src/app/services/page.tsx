import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Wrench,
  Zap,
  BatteryCharging,
  Droplets,
  Factory,
  Home,
  Building2,
  Sun,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Phone,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SITE_CONFIG, getPhoneCallUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Solar Solutions & Services | Hardev Solar Services",
  description:
    "Explore solar solutions from Hardev Solar Services: Solar System Installation, On-Grid Solar, Off-Grid Solar, Solar Water Heaters, and Utility-Scale Solar Projects across Maharashtra.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Solar Solutions & Services | Hardev Solar Services",
    description:
      "Hardev Solar Services provides tailored solar solutions across Maharashtra in partnership with Swayam Infraverse.",
    url: `${SITE_CONFIG.website}/services`,
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Services" }]} />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#F0FDF4] via-white to-[#F0FDF4] text-[#0F291E] py-14 sm:py-20 border-b border-[#DCFCE7] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DCFCE7]/60 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 shadow-xs">
              <Sun className="w-3.5 h-3.5 fill-[#FACC15] text-[#F59E0B]" />
              <span>Hardev Solar Services × Swayam Infraverse</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F291E] mb-6 leading-tight">
              Solar Solutions Tailored{" "}
              <span className="text-[#16A34A]">to Your Needs</span>
            </h1>

            <p className="text-[#475569] text-base sm:text-xl leading-relaxed">
              Hardev Solar Services delivers solar solutions tailored to your home, business, or industrial project. In partnership with Swayam Infraverse, we offer comprehensive solar services available across Maharashtra.
            </p>
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Service 1: Solar System Installation */}
          <div
            id="solar-system-installation"
            className="bg-white rounded-3xl border-2 border-[#DCFCE7] p-8 sm:p-12 shadow-sm hover:border-[#86EFAC] transition-all scroll-mt-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center border border-[#BBF7D0] shadow-xs">
                    <Wrench className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-[#15803D] uppercase tracking-wider">
                      Service 01 • Turnkey Installation
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-[#0F291E]">
                      Solar System Installation
                    </h2>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-[#475569] leading-relaxed pt-2">
                  <p>
                    <strong>What it is:</strong> Comprehensive solar system installation services for residential properties, commercial establishments, and industrial premises.
                  </p>
                  <p>
                    <strong>Our Approach:</strong> Every installation is planned to match the structural characteristics of your rooftop or site, ensuring secure mounting, proper cable layout, and dependable electrical connections.
                  </p>
                </div>

                <div className="pt-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#0F291E] mb-2.5">
                    Service Highlights:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#0F291E] font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      <span>Turnkey system planning & physical installation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      <span>Weather-resilient mounting structures</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      <span>Orderly conduit cabling & electrical protection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      <span>Services available across Maharashtra</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href="/#consultation"
                    className="px-6 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2"
                  >
                    <span>Request Installation Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] rounded-3xl p-6 border border-[#BBF7D0] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#15803D] uppercase">End-to-End Scope</span>
                  <div className="text-2xl font-black text-[#0F291E] mt-1 mb-3">Professional Solar Execution</div>
                  <p className="text-xs text-[#475569] leading-relaxed mb-4">
                    Hardev Solar Services manages every step from site review to complete system installation.
                  </p>
                </div>
                <div className="space-y-2 text-xs font-semibold text-[#0F291E]">
                  <div className="p-2.5 bg-white/80 rounded-xl border border-white">
                    Site assessment and roof layout planning
                  </div>
                  <div className="p-2.5 bg-white/80 rounded-xl border border-white">
                    Quality component placement and electrical safety
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service 2: On-Grid Solar Systems */}
          <div
            id="on-grid-solar"
            className="bg-white rounded-3xl border-2 border-[#DCFCE7] p-8 sm:p-12 shadow-sm hover:border-[#86EFAC] transition-all scroll-mt-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center border border-[#BBF7D0] shadow-xs">
                    <Zap className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-[#15803D] uppercase tracking-wider">
                      Service 02 • Grid Synchronization
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-[#0F291E]">
                      On-Grid Solar Systems
                    </h2>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-[#475569] leading-relaxed pt-2">
                  <p>
                    <strong>What it is:</strong> Grid-tied solar installations that connect directly with your building&apos;s electrical distribution and the state electrical utility grid.
                  </p>
                  <p>
                    <strong>How it helps:</strong> During the day, clean solar electricity powers your active appliances. Surplus energy can be fed back through a bi-directional net meter, helping reduce your monthly electricity bills.
                  </p>
                </div>

                <div className="pt-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#0F291E] mb-2.5">
                    Key Features:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#0F291E] font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      <span>Seamless daytime electricity offset</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      <span>Net-metering coordination support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      <span>High-efficiency string inverter technology</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      <span>Suitable for residences, shops & commercial units</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href="/#consultation"
                    className="px-6 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2"
                  >
                    <span>Get On-Grid Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/services/residential-solar"
                    className="text-xs sm:text-sm font-bold text-[#16A34A] hover:text-[#15803D] underline underline-offset-4"
                  >
                    View Residential Solar →
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] rounded-3xl p-6 border border-[#BBF7D0] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#15803D] uppercase">Grid-Tied Efficiency</span>
                  <div className="text-2xl font-black text-[#0F291E] mt-1 mb-3">Daytime Energy Generation</div>
                  <p className="text-xs text-[#475569] leading-relaxed mb-4">
                    Ideal for properties with active daytime power requirements aiming to minimize conventional utility expenses.
                  </p>
                </div>
                <div className="space-y-2 text-xs font-semibold text-[#0F291E]">
                  <div className="p-2.5 bg-white/80 rounded-xl border border-white">
                    Synchronized with DISCOM power standards
                  </div>
                  <div className="p-2.5 bg-white/80 rounded-xl border border-white">
                    Reduced dependence on conventional electricity
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service 3: Off-Grid Solar Systems */}
          <div
            id="off-grid-solar"
            className="bg-white rounded-3xl border-2 border-[#DCFCE7] p-8 sm:p-12 shadow-sm hover:border-[#86EFAC] transition-all scroll-mt-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center border border-[#BBF7D0] shadow-xs">
                    <BatteryCharging className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-[#15803D] uppercase tracking-wider">
                      Service 03 • Energy Independence
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-[#0F291E]">
                      Off-Grid Solar Systems
                    </h2>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-[#475569] leading-relaxed pt-2">
                  <p>
                    <strong>What it is:</strong> Self-sustaining solar power systems configured with dedicated battery energy storage to operate independently from the main grid.
                  </p>
                  <p>
                    <strong>Who it is for:</strong> Properties in regions experiencing frequent load shedding, farmhouses, agricultural setups, remote sites, or facilities needing continuous power security.
                  </p>
                </div>

                <div className="pt-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#0F291E] mb-2.5">
                    Key Features:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#0F291E] font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      <span>Independent power without reliance on the utility grid</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      <span>Battery backup for night-time and overcast hours</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      <span>Dedicated charge controllers & inverters</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      <span>Dependable power solution for remote properties</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <Link
                    href="/#consultation"
                    className="px-6 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2"
                  >
                    <span>Request Off-Grid Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] rounded-3xl p-6 border border-[#BBF7D0] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#15803D] uppercase">Independent Power</span>
                  <div className="text-2xl font-black text-[#0F291E] mt-1 mb-3">Continuous Energy Security</div>
                  <p className="text-xs text-[#475569] leading-relaxed mb-4">
                    Enjoy reliable electricity in non-electrified or load-shedding prone locations with battery-supported solar arrays.
                  </p>
                </div>
                <div className="space-y-2 text-xs font-semibold text-[#0F291E]">
                  <div className="p-2.5 bg-white/80 rounded-xl border border-white">
                    Energy stored for continuous operation
                  </div>
                  <div className="p-2.5 bg-white/80 rounded-xl border border-white">
                    Customized capacity according to appliance load
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service 4: Solar Water Heaters */}
          <div
            id="solar-water-heaters"
            className="bg-white rounded-3xl border-2 border-[#DCFCE7] p-8 sm:p-12 shadow-sm hover:border-[#86EFAC] transition-all scroll-mt-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center border border-[#BBF7D0] shadow-xs">
                    <Droplets className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-[#15803D] uppercase tracking-wider">
                      Service 04 • Thermal Energy
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-[#0F291E]">
                      Solar Water Heaters
                    </h2>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-[#475569] leading-relaxed pt-2">
                  <p>
                    <strong>What it is:</strong> Solar thermal systems that capture solar heat to supply hot water for domestic and commercial uses without running high-wattage electric geysers.
                  </p>
                  <p>
                    <strong>Applications:</strong> Homes, residential apartment complexes, bungalows, hotels, hostels, and hospitals seeking to minimize water heating power consumption.
                  </p>
                </div>

                <div className="pt-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#0F291E] mb-2.5">
                    Key Features:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#0F291E] font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      <span>Efficient thermal water heating from direct sunlight</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      <span>Reduces electrical water heating costs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      <span>Insulated storage tanks to preserve water temperature</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      <span>Durable rooftop mounting frames</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <Link
                    href="/#consultation"
                    className="px-6 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2"
                  >
                    <span>Inquire About Solar Water Heaters</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] rounded-3xl p-6 border border-[#BBF7D0] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#15803D] uppercase">Thermal Technology</span>
                  <div className="text-2xl font-black text-[#0F291E] mt-1 mb-3">Clean Solar Hot Water</div>
                  <p className="text-xs text-[#475569] leading-relaxed mb-4">
                    Harness clean solar thermal energy for your daily hot water requirements, reducing electric geyser load.
                  </p>
                </div>
                <div className="space-y-2 text-xs font-semibold text-[#0F291E]">
                  <div className="p-2.5 bg-white/80 rounded-xl border border-white">
                    Domestic systems for families & bungalows
                  </div>
                  <div className="p-2.5 bg-white/80 rounded-xl border border-white">
                    Commercial solar water heating setups for institutions
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service 5: Utility-Scale Solar Projects */}
          <div
            id="utility-scale-solar"
            className="bg-white rounded-3xl border-2 border-[#DCFCE7] p-8 sm:p-12 shadow-sm hover:border-[#86EFAC] transition-all scroll-mt-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center border border-[#BBF7D0] shadow-xs">
                    <Factory className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-[#15803D] uppercase tracking-wider">
                      Service 05 • High-Capacity Execution
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-[#0F291E]">
                      Utility-Scale Solar Projects
                    </h2>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-[#475569] leading-relaxed pt-2">
                  <p>
                    <strong>What it is:</strong> High-capacity solar installations designed for industrial manufacturing units, commercial complexes, and utility-level clean energy projects.
                  </p>
                  <p>
                    <strong>Our Delivery:</strong> Comprehensive planning, structural framing, high-capacity electrical synchronization, and coordination across Maharashtra.
                  </p>
                </div>

                <div className="pt-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#0F291E] mb-2.5">
                    Project Capabilities:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#0F291E] font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      <span>Industrial and high-capacity system engineering</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      <span>Industrial roof & ground installation support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      <span>HT / LT electrical network synchronization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      <span>Execution in partnership with Swayam Infraverse</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href="/#consultation"
                    className="px-6 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2"
                  >
                    <span>Discuss Utility-Scale Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/services/commercial-solar"
                    className="text-xs sm:text-sm font-bold text-[#16A34A] hover:text-[#15803D] underline underline-offset-4"
                  >
                    View Commercial Solar Details →
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] rounded-3xl p-6 border border-[#BBF7D0] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#15803D] uppercase">High Capacity Scope</span>
                  <div className="text-2xl font-black text-[#0F291E] mt-1 mb-3">Enterprise Energy Planning</div>
                  <p className="text-xs text-[#475569] leading-relaxed mb-4">
                    Tailored for large commercial and industrial consumers aiming to optimize daytime electricity tariffs.
                  </p>
                </div>
                <div className="space-y-2 text-xs font-semibold text-[#0F291E]">
                  <div className="p-2.5 bg-white/80 rounded-xl border border-white">
                    Large-scale rooftop shed & ground setups
                  </div>
                  <div className="p-2.5 bg-white/80 rounded-xl border border-white">
                    Services delivered across Maharashtra
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Consultation CTA Strip */}
      <section className="py-16 bg-[#F0FDF4] border-t border-[#DCFCE7] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F291E] mb-3">
            Contact Hardev Solar Services
          </h2>
          <p className="text-[#475569] text-sm sm:text-base max-w-xl mx-auto mb-8">
            Speak directly with our solar team for an initial site assessment and tailored solar solutions across Maharashtra.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#consultation"
              className="px-7 py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold rounded-xl text-sm shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <WhatsAppButton
              label="Chat on WhatsApp"
              variant="outline"
              className="bg-white py-3 px-6 text-sm"
            />
            <a
              href={getPhoneCallUrl(SITE_CONFIG.primaryPhone)}
              className="px-6 py-3 bg-white hover:bg-[#F0FDF4] text-[#0F291E] font-bold rounded-xl text-sm border border-[#DCFCE7] shadow-xs flex items-center justify-center gap-2"
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
