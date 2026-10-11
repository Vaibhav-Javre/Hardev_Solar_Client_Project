"use client";

import React from "react";
import Link from "next/link";
import {
  Wrench,
  ShieldCheck,
  Compass,
  ArrowRight,
} from "lucide-react";
import { ConsultationForm } from "@/components/forms/ConsultationForm";

export const HeroSection: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat text-white pt-8 pb-12 lg:pt-12 lg:pb-16 border-b border-[#0F291E]/20"
      style={{
        backgroundImage: "url('/images/hardev-solar-hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Light, subtle gradient overlay on the left text area only - keeps the sunny rooftop, workers, and sky bright and clearly visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Compact Headline, Short Paragraph, CTAs & 3 Simple Feature Labels */}
          <div className="lg:col-span-7 space-y-4 text-left pt-2 sm:pt-6 lg:pt-8">
            {/* Clean, professional headline that fits on one or two lines */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-md">
              Power Your Home with{" "}
              <span className="text-[#4ADE80]">Solar</span>
            </h1>

            {/* Short, easy-to-read paragraph */}
            <p className="text-sm sm:text-base lg:text-lg text-white/95 max-w-xl font-normal leading-relaxed drop-shadow-sm">
              Smart solar solutions for homes, businesses, and industries across Maharashtra.
            </p>

            {/* Two Primary Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                href="#hero-consultation"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534] text-white font-black text-sm sm:text-base shadow-lg shadow-[#16A34A]/30 transition-all border border-[#22C55E] group cursor-pointer"
              >
                <span>Get a Free Consultation</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#solutions"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 active:bg-white/35 text-white font-bold text-sm sm:text-base border border-white/40 shadow-sm transition-all"
              >
                <span>Explore Solar Solutions</span>
              </Link>
            </div>

            {/* 3 Compact Feature Labels */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-white">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/30 backdrop-blur-sm border border-white/15 shadow-xs">
                <Wrench className="w-3.5 h-3.5 text-[#4ADE80] shrink-0" />
                <span>Professional Installation</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/30 backdrop-blur-sm border border-white/15 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4ADE80] shrink-0" />
                <span>Quality Solar Systems</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/30 backdrop-blur-sm border border-white/15 shadow-xs">
                <Compass className="w-3.5 h-3.5 text-[#4ADE80] shrink-0" />
                <span>Maharashtra-Wide Service</span>
              </div>
            </div>
          </div>

          {/* Right Column: Existing Quote / Consultation Form */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="shadow-2xl rounded-3xl overflow-hidden">
                <ConsultationForm id="hero-consultation" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
