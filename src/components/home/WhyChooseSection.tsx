"use client";

import React from "react";
import {
  Users,
  ShieldCheck,
  Wrench,
  Sun,
  HeartHandshake,
  Headphones,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { WHY_CHOOSE_FEATURES, WhyChooseFeature } from "@/data/featuresData";

const iconMap = {
  engineers: Users,
  components: ShieldCheck,
  installation: Wrench,
  reliability: Sun,
  customer: HeartHandshake,
  support: Headphones,
};

export const WhyChooseSection: React.FC = () => {
  return (
    <section id="why-choose" className="py-20 lg:py-28 bg-white border-b border-[#DCFCE7] relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DCFCE7] text-[#15803D] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 border border-[#BBF7D0] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Proven Solar Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F291E] tracking-tight">
            Why Choose Hardev Solar Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] leading-relaxed">
            Hardev Solar Services, in partnership with Swayam Infraverse, brings engineering rigor, quality materials, and respectful customer service to every residential, commercial, and industrial installation across Maharashtra.
          </p>
        </div>

        {/* Six Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_FEATURES.map((card: WhyChooseFeature) => {
            const IconComponent = iconMap[card.iconName] || Sun;
            return (
              <div
                key={card.number}
                className="bg-white rounded-3xl p-7 border-2 border-[#DCFCE7] shadow-sm hover:shadow-xl hover:shadow-[#16A34A]/10 hover:border-[#86EFAC] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  {/* Top: Minimal Icon & Large Clean Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#16A34A] group-hover:bg-[#16A34A] group-hover:text-white transition-all shadow-xs">
                      <IconComponent className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    <span className="text-2xl font-black font-mono text-[#BBF7D0] group-hover:text-[#16A34A] transition-colors">
                      {card.number}
                    </span>
                  </div>

                  {/* Heading */}
                  <h3 className="text-xl font-black text-[#0F291E] mb-3 group-hover:text-[#16A34A] transition-colors">
                    {card.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-[#475569] text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Bottom quality tick */}
                <div className="mt-6 pt-4 border-t border-[#F0FDF4] flex items-center gap-2 text-xs font-bold text-[#16A34A]">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Hardev Solar Quality Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
