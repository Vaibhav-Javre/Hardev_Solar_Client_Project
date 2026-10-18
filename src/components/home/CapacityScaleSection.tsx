"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sun,
  Maximize2,
  Zap,
  ArrowRight,
  CheckCircle2,
  Building,
} from "lucide-react";
import { scrollToQuote } from "@/lib/quoteNavigation";

interface ScaleTier {
  kw: string;
  category: "Residential" | "Residential / Semi-Commercial" | "Commercial";
  recommendedFor: string;
  approxArea: string;
  approxGeneration: string;
  idealAppliances: string;
  roofType: string;
}

export const CapacityScaleSection: React.FC = () => {
  const [selectedKw, setSelectedKw] = useState<string>("5 kW");

  const scaleTiers: ScaleTier[] = [
    {
      kw: "3 kW",
      category: "Residential",
      recommendedFor: "1–2 BHK Homes / Baseline Daytime Loads",
      approxArea: "~270 – 300 sq. ft",
      approxGeneration: "~360 units / month",
      idealAppliances: "Lights, fans, refrigerator, TV, 1 Inverter AC",
      roofType: "RCC Flat Terrace / Bungalow Rooftop",
    },
    {
      kw: "5 kW",
      category: "Residential",
      recommendedFor: "3–4 BHK Independent Homes & Villas",
      approxArea: "~450 – 500 sq. ft",
      approxGeneration: "~600 units / month",
      idealAppliances: "Multiple ACs, water pumps, washing machine, home appliances",
      roofType: "RCC Terrace / Elevated Frame",
    },
    {
      kw: "10 kW",
      category: "Residential / Semi-Commercial",
      recommendedFor: "Large Bungalows, Farmhouses & Clinics",
      approxArea: "~900 – 1,000 sq. ft",
      approxGeneration: "~1,200 units / month",
      idealAppliances: "Full home electrification, multiple ACs, high-capacity water heaters",
      roofType: "RCC Flat Rooftop / Custom Structure",
    },
    {
      kw: "20 kW",
      category: "Commercial",
      recommendedFor: "Offices, Commercial Showrooms & Nursing Homes",
      approxArea: "~1,800 – 2,000 sq. ft",
      approxGeneration: "~2,400 units / month",
      idealAppliances: "Daytime office ACs, IT workstations, diagnostic machines",
      roofType: "Commercial RCC / Industrial Profile Roof",
    },
    {
      kw: "30 kW",
      category: "Commercial",
      recommendedFor: "Schools, Colleges & Commercial Complexes",
      approxArea: "~2,700 – 3,000 sq. ft",
      approxGeneration: "~3,600 units / month",
      idealAppliances: "Multiple office floors, campus lighting, lab machinery",
      roofType: "Commercial Building Rooftop",
    },
    {
      kw: "50 kW",
      category: "Commercial",
      recommendedFor: "Industrial Facilities & Medium Warehouses",
      approxArea: "~4,500 – 5,000 sq. ft",
      approxGeneration: "~6,000 units / month",
      idealAppliances: "Motors, heavy cooling plants, warehouse illumination",
      roofType: "Metal Sheet Sheds / Heavy Industrial RCC",
    },
  ];

  const currentTier =
    scaleTiers.find((t) => t.kw === selectedKw) || scaleTiers[1];

  return (
    <section id="capacity" className="py-20 lg:py-28 bg-white border-b border-[#DCFCE7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DCFCE7] text-[#15803D] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 border border-[#BBF7D0] shadow-xs">
            <Zap className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Project Capacity Range</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F291E] tracking-tight">
            Solar Projects From 3 kW to 50 kW
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#475569] leading-relaxed">
            Hardev Solar Services delivers solar solutions ranging from <strong>3 kW to 50 kW and utility scale</strong>. Explore our project capacity range below to understand typical roof footprint requirements and estimated energy outputs.
          </p>
        </div>

        {/* Visual Horizontal Interactive Capacity Scale */}
        <div className="bg-[#F0FDF4] rounded-3xl p-4 sm:p-8 md:p-10 border-2 border-[#DCFCE7] shadow-lg shadow-[#16A34A]/5">
          {/* Visual Scale Tabs: 3 kW, 5 kW, 10 kW, 20 kW, 30 kW, 50 kW */}
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold text-[#15803D] mb-3 px-1 uppercase tracking-wider">
              <span>Residential Range</span>
              <span>Commercial & Industrial Range</span>
            </div>

            {/* Stepper Buttons (Scale 3 kW, 5 kW, 10 kW, 20 kW, 30 kW, 50 kW) */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 relative">
              {scaleTiers.map((tier) => {
                const isSelected = tier.kw === selectedKw;
                return (
                  <button
                    key={tier.kw}
                    onClick={() => setSelectedKw(tier.kw)}
                    className={`relative py-3 sm:py-4 px-2 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer font-bold ${
                      isSelected
                        ? "bg-[#16A34A] text-white shadow-lg shadow-[#16A34A]/25 sm:scale-105 border-2 border-[#86EFAC]"
                        : "bg-white text-[#0F291E] hover:bg-[#DCFCE7] border border-[#BBF7D0]"
                    }`}
                  >
                    <span className="text-base sm:text-xl font-black tracking-tight">
                      {tier.kw}
                    </span>
                    <span
                      className={`text-[10px] mt-1 font-semibold uppercase tracking-wider ${
                        isSelected ? "text-white/90" : "text-[#475569]"
                      }`}
                    >
                      {tier.category === "Residential" ? "Home" : "Commercial"}
                    </span>

                    {isSelected && (
                      <span className="hidden sm:block absolute -bottom-2 w-3 h-3 bg-[#16A34A] rotate-45 border-r border-b border-[#86EFAC]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Spec Panel for Selected Tier */}
          <div className="bg-white rounded-2xl p-4 sm:p-8 border border-[#DCFCE7] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column */}
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F0FDF4] text-[#15803D] text-xs font-bold rounded-full border border-[#BBF7D0]">
                  <Sun className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Capacity Tier Details</span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-black text-[#0F291E]">
                    {currentTier.kw}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#475569] uppercase tracking-wide">
                    Installation Tier
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-[#0F291E]">
                  {currentTier.recommendedFor}
                </h3>

                <p className="text-xs text-[#475569] leading-relaxed">
                  Engineered using Tier-1 PV modules and matching inverter capacity. Exact layout depends on rooftop shadow analysis during site survey.
                </p>

                <div className="pt-2">
                  <a
                    href="/#consultation"
                    onClick={scrollToQuote}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-extrabold shadow-sm transition-all cursor-pointer"
                  >
                    <span>Request Quote for {currentTier.kw}</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </a>
                </div>
              </div>

              {/* Right Column: Engineering Requirements */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#15803D] mb-1">
                    <Maximize2 className="w-4 h-4 text-[#16A34A]" />
                    <span>Shadow-Free Roof Area</span>
                  </div>
                  <div className="text-base font-black text-[#0F291E]">
                    {currentTier.approxArea}
                  </div>
                  <div className="text-[11px] text-[#475569] mt-1">
                    Calculated at ~90-100 sq. ft per kW
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#15803D] mb-1">
                    <Sun className="w-4 h-4 text-[#F59E0B]" />
                    <span>Est. Monthly Generation</span>
                  </div>
                  <div className="text-base font-black text-[#0F291E]">
                    {currentTier.approxGeneration}
                  </div>
                  <div className="text-[11px] text-[#475569] mt-1">
                    Based on typical regional irradiance
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#15803D] mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    <span>Typical Load Offset</span>
                  </div>
                  <div className="text-xs font-bold text-[#0F291E] leading-snug">
                    {currentTier.idealAppliances}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#15803D] mb-1">
                    <Building className="w-4 h-4 text-[#16A34A]" />
                    <span>Structure Compatibility</span>
                  </div>
                  <div className="text-xs font-bold text-[#0F291E] leading-snug">
                    {currentTier.roofType}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
