"use client";

import React from "react";
import {
  Layers,
  Cpu,
  ShieldCheck,
  Cable,
  Grid,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export const QualityMaterials: React.FC = () => {
  const components = [
    {
      icon: Grid,
      title: "Solar Panels",
      badge: "Tier-1 Photovoltaic",
      description:
        "High-efficiency monocrystalline silicon modules selected from established manufacturers for superior temperature coefficients and reliable generation.",
      specs: "Tempered low-iron solar glass, weather-sealed IP68 junction boxes, durable anodized aluminum frames.",
    },
    {
      icon: Cpu,
      title: "Inverter",
      badge: "Certified On-Grid",
      description:
        "Certified on-grid string inverters equipped with Maximum Power Point Tracking (MPPT) for optimal power conversion and grid synchronization.",
      specs: "High conversion efficiency, dual MPPT tracking options, digital generation monitoring, and safety shutoff.",
    },
    {
      icon: Layers,
      title: "Mounting Structure",
      badge: "Engineered Stability",
      description:
        "Heavy-duty hot-dip galvanized (HDG) or aluminum mounting frames engineered to withstand regional wind velocities without compromising roof waterproofing.",
      specs: "Corrosion-resistant fasteners, certified wind-load stability, non-penetrating clamps for metal roofs.",
    },
    {
      icon: Cable,
      title: "DC/AC Wiring",
      badge: "Solar-Grade Cabling",
      description:
        "Certified UV-stabilized, halogen-free solar DC cables designed to minimize resistive power losses across conduit lengths.",
      specs: "Tinned copper multi-strand conductors, flame-retardant outer sheathing, neat conduit dressing.",
    },
    {
      icon: ShieldCheck,
      title: "Protection Equipment",
      badge: "Electrical Safety",
      description:
        "Complete protection suites including dedicated DC/AC distribution boxes, Class II Surge Protection Devices (SPDs), MCBs, and chemical earthing.",
      specs: "Dedicated earthing pits, copper-bonded electrodes, lightning arrestors to protect people and property.",
    },
  ];

  return (
    <section id="quality" className="py-20 lg:py-28 bg-[#F0FDF4] text-[#0F291E] relative overflow-hidden border-b border-[#DCFCE7]">
      {/* Background eco-ambient highlights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#DCFCE7]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#BBF7D0]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Materials & Engineering Rigor</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F291E] tracking-tight">
            Built With Quality. Designed For Reliability.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#475569] leading-relaxed">
            We prioritize quality components and professional installation to help deliver reliable long-term system performance.
          </p>
        </div>

        {/* 5 Major Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {components.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border-2 border-[#DCFCE7] rounded-3xl p-7 flex flex-col justify-between hover:border-[#86EFAC] hover:shadow-xl hover:shadow-[#16A34A]/10 transition-all duration-300 group hover:-translate-y-1 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] border border-[#BBF7D0] flex items-center justify-center text-[#15803D] group-hover:bg-[#16A34A] group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#0F291E] mb-2 group-hover:text-[#16A34A] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-[#475569] text-sm leading-relaxed mb-5">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DCFCE7] text-xs text-[#15803D] flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item.specs}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Notice */}
        <div className="mt-14 text-center text-xs text-[#475569] max-w-2xl mx-auto bg-white py-3.5 px-6 rounded-2xl border border-[#DCFCE7] shadow-xs">
          * Component brands, specifications, and manufacturer warranty periods are itemized transparently in every engineering proposal.
        </div>
      </div>
    </section>
  );
};

export const QualitySection = QualityMaterials;
