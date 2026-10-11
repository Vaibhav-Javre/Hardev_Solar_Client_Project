import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  Sun,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  Leaf,
  Maximize2,
  Calendar,
  Sparkles,
  Zap,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Residential Solar Solutions | Hardev Solar Services",
  description:
    "Make your home more energy independent with reliable rooftop solar PV systems. Turnkey residential solar installations from 3 kW to 10 kW across Maharashtra.",
  alternates: {
    canonical: "/services/residential-solar",
  },
  openGraph: {
    title: "Residential Solar Solutions | Hardev Solar Services",
    description:
      "Reliable rooftop solar solutions designed for independent bungalows, villas, and homes across Maharashtra.",
    url: `${SITE_CONFIG.website}/services/residential-solar`,
  },
};

export default function ResidentialSolarPage() {
  const steps = [
    { number: "01", title: "Consultation", desc: "Understanding your current power bills, appliances, and energy goals." },
    { number: "02", title: "Site Assessment", desc: "Physical rooftop survey to evaluate shadow-free area and roof orientation." },
    { number: "03", title: "System Planning", desc: "Custom PV array layout, string inverter sizing, and transparent proposal." },
    { number: "04", title: "Installation", desc: "Watertight mounting frame setup, module installation, and certified cabling." },
    { number: "05", title: "Testing", desc: "Pre-commissioning electrical testing, inverter configuration, and safety checks." },
    { number: "06", title: "Handover", desc: "Net-metering coordination, documentation handover, and system orientation." },
  ];

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Services", href: "/services" },
          { label: "Residential Solar" },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#F0FDF4] via-white to-[#F0FDF4] text-[#0F291E] py-14 sm:py-20 border-b border-[#DCFCE7] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DCFCE7]/60 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 shadow-xs">
              <Home className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Residential Solar • Hardev Solar Services</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F291E] mb-6 leading-tight">
              Make Your Home More{" "}
              <span className="text-[#16A34A]">Energy Independent</span>
            </h1>

            <p className="text-[#475569] text-base sm:text-xl leading-relaxed mb-8">
              Residential rooftop solar empowers homeowners to produce clean electricity right from their terrace, reducing monthly utility bills while utilizing abundant sunlight.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="#consultation"
                className="px-7 py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <span>Get a Free Consultation</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </Link>
              <WhatsAppButton
                message="Hello Hardev Solar Services, I am interested in a residential solar system for my home."
                label="Discuss on WhatsApp"
                variant="outline"
                className="bg-white py-3 px-6 text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What is Residential Solar & Why Choose It */}
      <section className="py-16 sm:py-20 border-b border-[#DCFCE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#DCFCE7] text-[#15803D] text-xs font-extrabold rounded-full border border-[#BBF7D0]">
                <Sun className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Clean Home Electricity</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-[#0F291E] tracking-tight">
                What is Residential Solar?
              </h2>

              <p className="text-[#475569] text-base leading-relaxed">
                Residential solar is a photovoltaic system installed on your home&apos;s rooftop. The solar modules absorb clean daylight, converting it into electricity to power your lights, fans, refrigerator, televisions, washing machine, and air conditioning units during the day.
              </p>

              <h3 className="text-xl font-black text-[#0F291E] pt-2">
                Why Choose Rooftop Solar?
              </h3>

              <p className="text-[#475569] text-sm leading-relaxed">
                Conventional electricity tariffs tend to rise over time as energy demand expands. Rooftop solar offers households an effective way to generate their own power on-site, locking in clean energy production for decades to come with minimal disruption to your home.
              </p>
            </div>

            {/* Visual Box with Key Residential Benefits */}
            <div className="bg-[#F0FDF4] rounded-3xl p-8 border-2 border-[#DCFCE7] space-y-4 shadow-sm">
              <h3 className="font-black text-[#0F291E] text-xl mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#16A34A]" />
                <span>Benefits of Home Solar</span>
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 bg-white rounded-2xl border border-[#DCFCE7] flex items-start gap-3">
                  <TrendingDown className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0F291E]">Reduce Dependence on Conventional Electricity</h4>
                    <p className="text-xs text-[#475569] mt-0.5">Offset high daytime tariff consumption directly with on-site solar power.</p>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border border-[#DCFCE7] flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0F291E]">Generate Clean Energy</h4>
                    <p className="text-xs text-[#475569] mt-0.5">Produce 100% emission-free electricity directly from natural sunlight.</p>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border border-[#DCFCE7] flex items-start gap-3">
                  <Maximize2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0F291E]">Make Better Use of Rooftop Space</h4>
                    <p className="text-xs text-[#475569] mt-0.5">Turn an underutilized flat or shed roof into a productive clean energy asset.</p>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border border-[#DCFCE7] flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0F291E]">Long-Term Energy Solution</h4>
                    <p className="text-xs text-[#475569] mt-0.5">Engineered with high-quality components designed for long-term daily performance.</p>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border border-[#DCFCE7] flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0F291E]">Sustainable Energy Choice</h4>
                    <p className="text-xs text-[#475569] mt-0.5">Inspire family and neighbors with responsible environmental leadership.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Residential Installation Works (1 to 6) */}
      <section className="py-16 sm:py-24 bg-[#F0FDF4] border-b border-[#DCFCE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F291E] tracking-tight">
              How Residential Installation Works
            </h2>
            <p className="text-[#475569] text-base mt-3">
              Our 6-step engineering process ensures a smooth, safe, and transparent transition to solar power for your home.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((st) => (
              <div
                key={st.number}
                className="bg-white rounded-3xl p-6 border-2 border-[#DCFCE7] shadow-sm hover:border-[#86EFAC] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#15803D] font-black text-sm flex items-center justify-center font-mono border border-[#BBF7D0]">
                      {st.number}
                    </span>
                    <span className="text-[11px] font-bold text-[#15803D] bg-[#F0FDF4] px-2.5 py-0.5 rounded-full border border-[#BBF7D0]">
                      Phase {st.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-[#0F291E] mb-2">{st.title}</h3>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Is Solar Right For Your Home? + Consultation Form */}
      <section id="consultation" className="py-16 sm:py-24 border-b border-[#DCFCE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DCFCE7] text-[#15803D] text-xs font-extrabold rounded-full border border-[#BBF7D0]">
                <Zap className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Home Suitability Check</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#0F291E] tracking-tight">
                Is Solar Right For Your Home?
              </h2>

              <p className="text-[#475569] text-base leading-relaxed">
                If you have an independent house, bungalow, or row house with accessible shadow-free rooftop space, rooftop solar is a practical and viable clean energy investment. Hardev Solar Services provides services across Maharashtra.
              </p>

              <div className="space-y-3 text-xs sm:text-sm font-semibold text-[#0F291E]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Flat concrete terrace or elevated structure options</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Custom sizing tailored to your consumption</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Leak-proof mounting with structural care</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
