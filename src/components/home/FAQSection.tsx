"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FAQ_DATA, FAQItem } from "@/data/faqData";

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#F0FDF4] border-b border-[#DCFCE7] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DCFCE7] text-[#15803D] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 border border-[#BBF7D0] shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Solar Knowledge & Clear Guidance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F291E] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] leading-relaxed">
            Factual answers to help you understand solar PV technology and make an informed decision for your rooftop.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq: FAQItem, idx: number) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border-2 border-[#DCFCE7] overflow-hidden shadow-xs hover:border-[#86EFAC] transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-black text-[#0F291E] hover:text-[#16A34A] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg leading-snug">{faq.question}</span>
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-200 border ${
                      isOpen
                        ? "rotate-180 bg-[#16A34A] text-white border-[#16A34A]"
                        : "bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]"
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-[#475569] text-sm sm:text-base leading-relaxed border-t border-[#F0FDF4] pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Card */}
        <div className="mt-14 text-center p-8 bg-white rounded-3xl border-2 border-[#DCFCE7] shadow-sm">
          <h3 className="font-black text-[#0F291E] text-lg sm:text-xl mb-1">
            Have a question about your specific roof or sanction load?
          </h3>
          <p className="text-xs sm:text-sm text-[#475569] mb-5">
            Our qualified solar engineers are available to review your latest electricity bill and discuss your setup.
          </p>
          <Link
            href="#consultation"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs sm:text-sm shadow-sm transition-all"
          >
            <span>Ask a Solar Engineer Directly</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
        </div>
      </div>
    </section>
  );
};
