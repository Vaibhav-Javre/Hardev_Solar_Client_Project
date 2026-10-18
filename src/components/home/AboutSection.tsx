"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sun,
  Leaf,
  Wrench,
  HeartHandshake,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export const AboutSection: React.FC = () => {
  const commitments = [
    { label: "Solar System Installation", desc: "Turnkey residential, commercial, and industrial execution." },
    { label: "On-Grid & Off-Grid", desc: "Grid-tied solar systems and independent battery-backed solutions." },
    { label: "Solar Water Heaters", desc: "Energy-saving solar thermal water heating for homes and facilities." },
    { label: "Utility-Scale Projects", desc: "High-capacity solar system planning for industrial facilities." },
    { label: "Quality Materials", desc: "Reliable solar modules, certified inverters, and durable mounting structures." },
    { label: "Professional Installation", desc: "Careful roof mounting, watertight clamps, and safe electrical wiring." },
    { label: "Maharashtra-Wide Reach", desc: "Solar solutions tailored to requirements across Maharashtra." },
    { label: "Swayam Infraverse Partnership", desc: "Collaborating with business partner Swayam Infraverse for robust delivery." },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F0FDF4] border-y border-[#DCFCE7] relative overflow-hidden scroll-mt-16">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DCFCE7]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FACC15]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Mission & Commitments */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-xs font-extrabold uppercase tracking-wider border border-[#BBF7D0] shadow-xs">
              <Leaf className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Hardev Solar Services × Swayam Infraverse</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F291E] tracking-tight leading-tight">
              Building a Smarter, <br className="hidden sm:inline" />
              <span className="text-[#16A34A] underline decoration-[#86EFAC] decoration-4 underline-offset-8">
                Sustainable Future
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#0F291E] leading-relaxed font-medium">
              Welcome to <strong>Hardev Solar Services</strong>! We provide excellent solar solutions to help you save on your electricity bills. Installing a solar system is not just about generating electricity. It is a step towards a better and smarter future, whether for your home or an industrial project.
            </p>

            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              We provide solar solutions tailored to your needs, with services available across Maharashtra. In partnership with Swayam Infraverse, we offer on-grid systems, off-grid solutions, solar water heaters, and utility-scale solar projects executed with professional care.
            </p>

            {/* Commitments Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {commitments.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-[#DCFCE7] shadow-xs"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs sm:text-sm font-extrabold text-[#0F291E]">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-[#475569] mt-0.5 leading-snug">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Button href="/#consultation" variant="primary" size="md" className="w-full sm:w-auto justify-center">
                <span>Get a Free Consultation</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Button>

              <Link
                href="/about"
                className="text-sm font-extrabold text-[#16A34A] hover:text-[#15803D] underline underline-offset-4 decoration-[#86EFAC] text-center py-2 sm:py-0"
              >
                Learn More About Hardev Solar Services →
              </Link>
            </div>
          </div>

          {/* Right Column: Visual White Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#DCFCE7] shadow-xl shadow-[#16A34A]/5 space-y-5">
              {/* Card Header Pill */}
              <div className="flex items-center justify-between border-b border-[#DCFCE7] pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#16A34A]" />
                  <span className="text-xs font-bold text-[#0F291E] uppercase tracking-wider">
                    Hardev Solar Services
                  </span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
                  Maharashtra Coverage
                </span>
              </div>

              {/* Pillar 1 */}
              <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] hover:border-[#86EFAC] transition-all flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0] flex items-center justify-center shrink-0 shadow-xs">
                  <Sun className="w-6 h-6 stroke-[2.3]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0F291E] text-sm">
                    Tailored Solar Solutions
                  </h3>
                  <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                    Customizing solar systems for homes, businesses, and industrial projects to help reduce dependence on conventional electricity.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-2xl bg-white border border-[#DCFCE7] hover:border-[#86EFAC] transition-all flex items-start gap-4 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0] flex items-center justify-center shrink-0 shadow-xs">
                  <ShieldCheck className="w-6 h-6 stroke-[2.3]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0F291E] text-sm">
                    Quality Materials & Standards
                  </h3>
                  <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                    Reliable solar panels, certified inverters, and durable structural mountings designed for long-term endurance.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] hover:border-[#86EFAC] transition-all flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0] flex items-center justify-center shrink-0 shadow-xs">
                  <Wrench className="w-6 h-6 stroke-[2.3]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0F291E] text-sm">
                    Professional Installation
                  </h3>
                  <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                    Executed with leak-proof roof clamping, tidy cabling, and proper safety earthing across all installation types.
                  </p>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#DCFCE7] to-[#F0FDF4] border-2 border-[#86EFAC] text-[#0F291E] flex items-start gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-white text-[#16A34A] border border-[#BBF7D0] flex items-center justify-center shrink-0 shadow-xs">
                  <HeartHandshake className="w-6 h-6 stroke-[2.3]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0F291E] text-sm">
                    In Partnership with Swayam Infraverse
                  </h3>
                  <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                    Delivering dependable solar engineering and collaborative project capabilities to customers across Maharashtra.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
