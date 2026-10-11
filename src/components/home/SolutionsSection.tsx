"use client";

import React from "react";
import Link from "next/link";
import {
  Wrench,
  Zap,
  BatteryCharging,
  Droplets,
  Factory,
  ArrowRight,
  Sparkles,
  Sun,
  Building2,
  Home,
} from "lucide-react";
import { SOLAR_SOLUTIONS, SolarSolution } from "@/data/solutionsData";

const iconMap: Record<string, React.ElementType> = {
  installation: Wrench,
  "on-grid": Zap,
  "off-grid": BatteryCharging,
  "water-heater": Droplets,
  utility: Factory,
  residential: Home,
  commercial: Building2,
};

export const SolutionsSection: React.FC = () => {
  return (
    <section id="solutions" className="py-20 lg:py-28 bg-[#F0FDF4]/50 border-b border-[#DCFCE7] relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DCFCE7] text-[#15803D] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 border border-[#BBF7D0] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Tailored Solar Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F291E] tracking-tight">
              Solar Solutions For Every Need
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#475569] leading-relaxed">
              Hardev Solar Services delivers solar solutions tailored to your home, business, or industrial project. In partnership with Swayam Infraverse, our services are available across Maharashtra.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="#consultation"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold rounded-xl text-sm shadow-md shadow-[#16A34A]/20 transition-all"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SOLAR_SOLUTIONS.map((item: SolarSolution, idx: number) => {
            const Icon = iconMap[item.iconType] || Sun;
            const isAltBg = idx % 2 === 1;

            return (
              <div
                key={item.id}
                className={`${
                  isAltBg ? "bg-[#F0FDF4]" : "bg-white"
                } rounded-3xl border-2 ${
                  isAltBg ? "border-[#BBF7D0]" : "border-[#DCFCE7]"
                } p-8 shadow-sm hover:shadow-xl hover:shadow-[#16A34A]/10 hover:border-[#86EFAC] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1`}
              >
                <div>
                  {/* Visual Header / Icon Banner */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-[#BBF7D0] shadow-xs flex items-center justify-center text-[#16A34A] group-hover:bg-[#16A34A] group-hover:text-white transition-colors">
                      <Icon className="w-7 h-7 stroke-[2.2]" />
                    </div>

                    <span className="text-xs font-extrabold px-3 py-1 bg-[#DCFCE7] border border-[#BBF7D0] rounded-full text-[#15803D]">
                      {item.capacityScope}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-[#0F291E] mb-3 group-hover:text-[#16A34A] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#475569] text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Key Highlights */}
                  <ul className="space-y-2 mb-6">
                    {item.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 text-xs sm:text-sm text-[#0F291E]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action */}
                <div className="pt-5 border-t border-[#DCFCE7] flex items-center justify-between">
                  <Link
                    href={item.slug}
                    className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#16A34A] hover:text-[#15803D] group-hover:underline underline-offset-4"
                  >
                    <span>View Details →</span>
                  </Link>

                  <Link
                    href="#consultation"
                    className="text-xs font-bold px-3.5 py-2 bg-white hover:bg-[#DCFCE7] text-[#0F291E] border border-[#BBF7D0] rounded-xl shadow-xs transition-colors"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
