"use client";

import React from "react";
import {
  MessageSquareCheck,
  Compass,
  FileCode2,
  Wrench,
  CheckCircle2,
  Headphones,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { INSTALLATION_STEPS, ProcessStep } from "@/data/processData";

const iconMap = {
  consultation: MessageSquareCheck,
  assessment: Compass,
  design: FileCode2,
  installation: Wrench,
  testing: CheckCircle2,
  support: Headphones,
};

export const InstallationProcess: React.FC = () => {
  return (
    <section id="process" className="py-20 lg:py-28 bg-[#F0FDF4] border-b border-[#DCFCE7] relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#BBF7D0]/40 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DCFCE7] border border-[#BBF7D0] text-[#15803D] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Turnkey Engineering Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F291E] tracking-tight">
            From Consultation to Installation
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] leading-relaxed">
            From your very first inquiry to long-term post-commissioning support, we follow a transparent, systematic path to clean energy.
          </p>
        </div>

        {/* Connected Timeline: Horizontal on Desktop (6 columns), Vertical on Mobile */}
        <div className="relative">
          {/* Connected horizontal line on desktop across steps */}
          <div className="hidden lg:block absolute top-[52px] left-[6%] right-[6%] h-1 bg-[#BBF7D0] z-0" />

          {/* Connected vertical line on mobile */}
          <div className="lg:hidden absolute top-8 bottom-8 left-[38px] w-1 bg-[#BBF7D0] z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 relative z-10">
            {INSTALLATION_STEPS.map((item: ProcessStep, index: number) => {
              const Icon = iconMap[item.iconName] || MessageSquareCheck;
              return (
                <div
                  key={item.step}
                  className="bg-white border-2 border-[#DCFCE7] rounded-3xl p-5 sm:p-6 flex flex-col justify-between hover:border-[#86EFAC] hover:shadow-xl hover:shadow-[#16A34A]/10 transition-all duration-300 group hover:-translate-y-1 ml-6 lg:ml-0"
                >
                  <div>
                    {/* Step Number & Minimal Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="w-11 h-11 rounded-2xl bg-[#DCFCE7] text-[#15803D] font-black text-lg flex items-center justify-center font-mono shadow-xs border-2 border-[#BBF7D0] group-hover:scale-105 group-hover:bg-[#16A34A] group-hover:text-white transition-all">
                        {item.step}
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#16A34A] group-hover:bg-[#16A34A] group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5 stroke-[2.2]" />
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-[#0F291E] mb-1.5 group-hover:text-[#16A34A] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-[11px] font-bold text-[#15803D] uppercase tracking-wide mb-3">
                      {item.shortDesc}
                    </p>

                    <p className="text-[#475569] text-xs leading-relaxed">
                      {item.details}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#F0FDF4] flex items-center justify-between text-[10px] font-bold text-[#16A34A]">
                    <span>Step {index + 1} of 6</span>
                    {index < INSTALLATION_STEPS.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-[#86EFAC] hidden lg:inline" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Prompt */}
        <div className="mt-14 p-6 sm:p-8 bg-white border-2 border-[#DCFCE7] rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-[#0F291E]">
              Ready to begin Step 01 with a free consultation?
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Our qualified engineers are ready to assess your rooftop space and calculate your energy potential.
            </p>
          </div>
          <Link
            href="#consultation"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold rounded-xl text-sm shrink-0 shadow-md shadow-[#16A34A]/20 transition-all"
          >
            <span>Book Initial Consultation</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export const HowItWorksSection = InstallationProcess;
