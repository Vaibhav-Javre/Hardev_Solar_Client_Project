"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, ShieldCheck, Sun, Zap, Leaf } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { COMPANY_CONFIG, getPhoneCallUrl } from "@/data/companyConfig";
import { scrollToQuote } from "@/lib/quoteNavigation";

export const FinalCTASection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-[#F0FDF4] via-white to-[#DCFCE7] text-[#0F291E] relative overflow-hidden border-t border-[#DCFCE7]">
      {/* Background solar irradiance rays & radial glow */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#DCFCE7]/70 rounded-full blur-3xl pointer-events-none animate-solar-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#BBF7D0]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Renewable Energy Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] text-xs font-extrabold rounded-full uppercase tracking-wider mb-6 shadow-xs">
          <Sun className="w-3.5 h-3.5 fill-[#FACC15] text-[#F59E0B]" />
          <span>Switch to Clean Solar Energy</span>
        </div>

        {/* Heading: Ready to Switch to Solar? */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#0F291E] mb-5 leading-tight">
          Ready to Switch to Solar?
        </h2>

        {/* Supporting text: Talk to our team about the right solar solution for your home or business. */}
        <p className="text-[#475569] text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Talk to our team about the right solar solution for your home or business.
        </p>

        {/* Buttons: Get Free Consultation, Contact Us */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
          <a
            href="/#consultation"
            onClick={scrollToQuote}
            className="w-full sm:w-auto px-8 py-4 bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534] text-white font-black rounded-2xl text-base shadow-xl shadow-[#16A34A]/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
          >
            <span>Get Free Consultation</span>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
          </a>

          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-[#F0FDF4] active:bg-[#DCFCE7] text-[#0F291E] font-extrabold rounded-2xl text-base border-2 border-[#BBF7D0] hover:border-[#86EFAC] flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            <span>Contact Us</span>
          </Link>
        </div>

        {/* WhatsApp & Phone Direct Contacts */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <WhatsAppButton
            label="Chat with Our Engineers on WhatsApp"
            variant="solid"
            className="py-3 px-6 text-sm font-bold shadow-sm"
          />
          <a
            href={getPhoneCallUrl(COMPANY_CONFIG.contact.phone)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-[#F0FDF4] text-[#15803D] text-sm font-bold border border-[#BBF7D0] shadow-xs transition-colors"
          >
            <Phone className="w-4 h-4 text-[#16A34A]" />
            <span>Call: {COMPANY_CONFIG.contact.displayPhone}</span>
          </a>
        </div>

        {/* Highlights Bar */}
        <div className="inline-flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-[#DCFCE7] text-xs sm:text-sm text-[#15803D] font-bold">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <span>Zero Obligation Site Survey</span>
          </span>
          <span className="hidden sm:inline text-[#86EFAC]">•</span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#16A34A]" />
            <span>3 kW to 50 kW Scope</span>
          </span>
          <span className="hidden sm:inline text-[#86EFAC]">•</span>
          <span className="flex items-center gap-1.5">
            <Leaf className="w-4 h-4 text-[#16A34A]" />
            <span>100% Clean Solar Power</span>
          </span>
        </div>
      </div>
    </section>
  );
};
