"use client";

import React from "react";
import {
  TrendingDown,
  Leaf,
  PiggyBank,
  Zap,
  Globe,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { scrollToQuote } from "@/lib/quoteNavigation";

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: TrendingDown,
      title: "Lower Electricity Dependence",
      description:
        "Substantially cut dependency on fluctuating grid tariffs by generating your own on-site clean power directly during peak daytime hours.",
      highlight: "Tariff Protection",
    },
    {
      icon: Leaf,
      title: "Clean Renewable Energy",
      description:
        "Harness 100% emission-free solar irradiance. Eliminate harmful carbon emissions and directly contribute to localized environmental preservation.",
      highlight: "Zero Carbon Emissions",
    },
    {
      icon: PiggyBank,
      title: "Long-Term Savings",
      description:
        "Solar PV panels are designed to generate electricity reliably for decades, translating your initial capital into sustained monthly utility savings.",
      highlight: "Recurring Power Savings",
    },
    {
      icon: Zap,
      title: "Energy Independence",
      description:
        "Insulate your home or business against unexpected power rate escalations and enjoy greater control over your daily energy consumption.",
      highlight: "Self-Reliance",
    },
    {
      icon: Globe,
      title: "Sustainable Future",
      description:
        "Join the global renewable energy transition. Inspire your community and set a benchmark for responsible ecological stewardship.",
      highlight: "Green Impact",
    },
  ];

  return (
    <section id="benefits" className="py-20 lg:py-28 bg-white border-b border-[#DCFCE7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DCFCE7] border border-[#BBF7D0] text-[#15803D] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Why Make The Switch Today</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F291E] tracking-tight">
            Key Benefits of Switching to Solar
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#475569] leading-relaxed">
            Discover why residential homeowners and commercial establishments across Maharashtra are powering their premises with solar energy.
          </p>
        </div>

        {/* 5 Benefits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white border-2 border-[#DCFCE7] rounded-3xl p-8 hover:border-[#86EFAC] hover:shadow-xl hover:shadow-[#16A34A]/10 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative w-14 h-14 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#16A34A] group-hover:bg-[#16A34A] group-hover:text-white transition-colors shadow-xs">
                      <Icon className="w-7 h-7 stroke-[2.2]" />
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#FACC15] border-2 border-white" />
                    </div>

                    <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
                      {item.highlight}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#0F291E] mb-3 group-hover:text-[#16A34A] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-[#475569] text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DCFCE7] flex items-center gap-2 text-xs font-bold text-[#16A34A]">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Sustainable ROI</span>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Call to action invitation in fresh Light Green & White */}
          <div className="bg-gradient-to-br from-[#DCFCE7] via-[#F0FDF4] to-white rounded-3xl p-8 text-[#0F291E] flex flex-col justify-between shadow-lg border-2 border-[#86EFAC]">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#BBF7D0] flex items-center justify-center text-[#16A34A] mb-6 shadow-xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-[#0F291E] mb-3">
                Ready to Experience These Benefits?
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Connect with our solar consultants to evaluate your rooftop solar potential and receive an accurate generation estimate.
              </p>
            </div>

            <div className="pt-6">
              <a
                href="/#consultation"
                onClick={scrollToQuote}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-sm shadow-md shadow-[#16A34A]/20 transition-all cursor-pointer"
              >
                <span>Calculate Your Solar Benefits</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
