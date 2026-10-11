import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  TrendingDown,
  Leaf,
  Maximize2,
  ShieldCheck,
  Calendar,
  ArrowRight,
  Briefcase,
  Store,
  Building,
  Factory,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Commercial Solar Solutions | Hardev Solar Services",
  description:
    "Smarter energy solutions for businesses, offices, commercial buildings, and industrial facilities across Maharashtra. In partnership with Swayam Infraverse.",
  alternates: {
    canonical: "/services/commercial-solar",
  },
  openGraph: {
    title: "Commercial Solar Solutions | Hardev Solar Services",
    description:
      "Reliable commercial solar solutions designed to lower daytime operational power costs for businesses across Maharashtra.",
    url: `${SITE_CONFIG.website}/services/commercial-solar`,
  },
};

export default function CommercialSolarPage() {
  const suitableProperties = [
    { title: "Offices", desc: "Corporate workspaces with daytime air conditioning and computing loads.", icon: Briefcase },
    { title: "Shops & Showrooms", desc: "Retail spaces seeking to reduce high commercial electricity tariff slabs.", icon: Store },
    { title: "Commercial Buildings", desc: "Multi-tenant properties, institutions, and administrative centers.", icon: Building },
    { title: "Industrial Units", desc: "Workshops and light industrial facilities with consistent daytime operating hours.", icon: Factory },
  ];

  const processSteps = [
    { number: "01", title: "Preliminary Energy Review", desc: "Analyzing utility bills, peak daytime electricity curves, and sanctioned grid load." },
    { number: "02", title: "Structural Survey", desc: "Technical evaluation of concrete rooftop, elevated structure feasibility, or industrial metal sheds." },
    { number: "03", title: "Tailored Engineering", desc: "Optimal string inverter planning, cable pathways, and electrical safety design." },
    { number: "04", title: "Professional Installation", desc: "Heavy-duty structural framing, certified DC wiring, and low-resistance earthing pits." },
    { number: "05", title: "Testing & Synchronization", desc: "Pre-commissioning safety checks and electrical utility grid-tie synchronization." },
    { number: "06", title: "Handover & Support", desc: "Plant documentation, operational handover, and responsive technical support." },
  ];

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Services", href: "/services" },
          { label: "Commercial Solar" },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#F0FDF4] via-white to-[#F0FDF4] text-[#0F291E] py-14 sm:py-20 border-b border-[#DCFCE7] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DCFCE7]/60 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 shadow-xs">
              <Building2 className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Commercial & Industrial Solar • Hardev Solar Services</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F291E] mb-6 leading-tight">
              Smarter Energy Solutions{" "}
              <span className="text-[#16A34A]">for Businesses</span>
            </h1>

            <p className="text-[#475569] text-base sm:text-xl leading-relaxed mb-8">
              Commercial establishments face higher electricity tariffs during peak daytime operating hours. Hardev Solar Services delivers tailored solar solutions for commercial and industrial facilities across Maharashtra in partnership with Swayam Infraverse.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="#consultation"
                className="px-7 py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <span>Discuss Your Solar Project</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </Link>
              <WhatsAppButton
                message="Hello Hardev Solar Services, I would like to discuss a commercial or industrial solar project for our facility."
                label="Discuss on WhatsApp"
                variant="outline"
                className="bg-white py-3 px-6 text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Target Properties */}
      <section className="py-16 sm:py-20 border-b border-[#DCFCE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F291E] tracking-tight">
              Suitable Commercial Properties
            </h2>
            <p className="text-[#475569] text-base mt-3">
              We design commercial solar systems for properties with dedicated daytime operations and accessible roof space.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {suitableProperties.map((prop, idx) => {
              const Icon = prop.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border-2 border-[#DCFCE7] shadow-sm hover:border-[#86EFAC] transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mb-4 border border-[#BBF7D0]">
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <h3 className="text-lg font-black text-[#0F291E] mb-2">{prop.title}</h3>
                  <p className="text-xs text-[#475569] leading-relaxed">{prop.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Businesses Consider Solar & Benefits */}
      <section className="py-16 sm:py-24 bg-[#F0FDF4] border-b border-[#DCFCE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F291E] tracking-tight">
                Why Businesses Consider Solar
              </h2>

              <p className="text-[#475569] text-base leading-relaxed">
                Electricity represents one of the largest recurrent operational costs for commercial facilities. Because business energy consumption peaks during daylight hours—precisely when solar irradiance is highest—commercial solar PV aligns naturally with business demand curves.
              </p>

              <p className="text-[#475569] text-sm leading-relaxed">
                Hardev Solar Services helps enterprises hedge against future tariff increases, reduce reliance on conventional grid power, and strengthen sustainable operations.
              </p>
            </div>

            <div className="lg:col-span-6 space-y-3">
              <div className="p-4 bg-white rounded-2xl border border-[#DCFCE7] flex items-start gap-3.5 shadow-xs">
                <TrendingDown className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-extrabold text-[#0F291E]">Reduce Dependence on Grid Electricity</h4>
                  <p className="text-xs text-[#475569] mt-0.5">Offset commercial power usage during daytime business hours with on-site clean solar energy.</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#DCFCE7] flex items-start gap-3.5 shadow-xs">
                <Maximize2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-extrabold text-[#0F291E]">Utilize Unused Rooftop Space</h4>
                  <p className="text-xs text-[#475569] mt-0.5">Convert non-revenue generating commercial rooftops or metal sheds into energy assets.</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#DCFCE7] flex items-start gap-3.5 shadow-xs">
                <Leaf className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-extrabold text-[#0F291E]">Generate Renewable Energy</h4>
                  <p className="text-xs text-[#475569] mt-0.5">Produce clean power on-site and visibly demonstrate environmental responsibility.</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#DCFCE7] flex items-start gap-3.5 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-extrabold text-[#0F291E]">Support Sustainability Goals</h4>
                  <p className="text-xs text-[#475569] mt-0.5">Meet environmental and corporate benchmarks with verified clean generation.</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#DCFCE7] flex items-start gap-3.5 shadow-xs">
                <Calendar className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-extrabold text-[#0F291E]">Long-Term Energy Planning</h4>
                  <p className="text-xs text-[#475569] mt-0.5">Gain predictable operating costs with systems engineered for durable daily generation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Installation Process */}
      <section className="py-16 sm:py-24 border-b border-[#DCFCE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F291E] tracking-tight">
              Commercial Installation Workflow
            </h2>
            <p className="text-[#475569] text-base mt-3">
              Rigorous engineering planning tailored around your facility&apos;s daily operations to ensure safe execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((st) => (
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

      {/* Commercial Consultation Form Section */}
      <section id="consultation" className="py-16 sm:py-24 bg-[#F0FDF4] border-b border-[#DCFCE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F291E] tracking-tight">
                Discuss Your Commercial Solar Project
              </h2>

              <p className="text-[#475569] text-base leading-relaxed">
                Connect with our technical team to schedule a preliminary site inspection and feasibility analysis for your commercial or industrial property across Maharashtra.
              </p>

              <div className="space-y-3 text-xs sm:text-sm font-semibold text-[#0F291E]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Turnkey commercial and industrial solar capability</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Three-phase string inverter synchronization</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Serving businesses across Maharashtra</span>
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
