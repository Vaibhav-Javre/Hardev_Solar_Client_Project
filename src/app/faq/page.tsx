"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight, Sun, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

interface CategorizedFAQ {
  category: "Solar Basics" | "Installation" | "Residential Solar" | "Commercial Solar" | "Maintenance" | "General";
  question: string;
  answer: string;
}

const FAQS_LIST: CategorizedFAQ[] = [
  {
    category: "Solar Basics",
    question: "What is rooftop solar?",
    answer:
      "Rooftop solar is a photovoltaic system mounted on the roof of a residential or commercial building. It converts sunlight directly into clean, usable electricity using semiconductor solar cells.",
  },
  {
    category: "Solar Basics",
    question: "How does a solar PV system work?",
    answer:
      "Solar panels absorb sunlight and produce Direct Current (DC) electricity. An on-grid string inverter then converts this into Alternating Current (AC) power, which directly powers your lights and appliances. Any excess daytime electricity flows into the utility grid via a bi-directional net meter.",
  },
  {
    category: "Solar Basics",
    question: "How do I determine the right system size?",
    answer:
      "System sizing depends on your average monthly electricity bill and available shadow-free rooftop space. As a benchmark, 1 kW requires approximately 90–100 sq. ft of shadow-free roof space and generates roughly 120 units (kWh) per month in India.",
  },
  {
    category: "Installation",
    question: "Can solar be installed on any rooftop?",
    answer:
      "Solar can be installed on flat concrete (RCC) terraces, elevated custom steel structures (to preserve usable terrace space), and industrial or commercial metal profile roofs. A site assessment is conducted by our engineers to evaluate shadow profiling and structural strength.",
  },
  {
    category: "Installation",
    question: "How long does installation take?",
    answer:
      "Physical rooftop installation for a residential solar system typically takes 3 to 7 working days once equipment arrives on site. Larger commercial systems (10 kW to 50 kW) generally take 1 to 3 weeks depending on rooftop structural requirements. Final utility net-metering synchronization follows local DISCOM schedules.",
  },
  {
    category: "Residential Solar",
    question: "Do you provide residential solar?",
    answer:
      "Yes, residential rooftop solar is one of our primary specializations. We design and install turnkey grid-tied systems ranging from 3 kW to 10 kW for independent bungalows, row houses, and residential housing societies.",
  },
  {
    category: "Commercial Solar",
    question: "Do you provide commercial solar?",
    answer:
      "Yes, we provide commercial rooftop solar systems ranging from 10 kW to 50 kW for offices, retail stores, healthcare facilities, and small industries looking to lower daytime commercial electricity expenses.",
  },
  {
    category: "Maintenance",
    question: "What maintenance does a solar system require?",
    answer:
      "Solar PV systems have no moving mechanical parts. Routine maintenance primarily consists of washing the glass surface of the solar panels with clean water every 2 to 4 weeks to remove accumulated dust, along with periodic visual inspections of cable conduits and earthing connections.",
  },
  {
    category: "General",
    question: "How can I request a quotation?",
    answer:
      "You can submit our consultation form on this website, message our engineering helpline on WhatsApp, or call our team directly. Our qualified solar engineers will review your requirement and arrange an initial site survey.",
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    "All",
    "Solar Basics",
    "Installation",
    "Residential Solar",
    "Commercial Solar",
    "Maintenance",
    "General",
  ];

  const filtered =
    activeCategory === "All"
      ? FAQS_LIST
      : FAQS_LIST.filter((f) => f.category === activeCategory);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS_LIST.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "FAQ" }]} />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#F0FDF4] via-white to-[#F0FDF4] text-[#0F291E] py-14 sm:py-20 border-b border-[#DCFCE7] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DCFCE7]/60 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 shadow-xs">
              <HelpCircle className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Clear & Factual Guidance</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F291E] mb-6 leading-tight">
              Frequently Asked Questions
            </h1>

            <p className="text-[#475569] text-base sm:text-xl leading-relaxed">
              Find transparent, accurate answers to common questions about rooftop solar technology, installation workflows, and system planning.
            </p>
          </div>
        </div>
      </section>

      {/* Main FAQ Accordion with Category Filter Tabs */}
      <section className="py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#16A34A] text-white shadow-md shadow-[#16A34A]/20 border-2 border-[#86EFAC]"
                    : "bg-white text-[#0F291E] hover:bg-[#DCFCE7] border border-[#DCFCE7]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion Items */}
          <div className="space-y-4">
            {filtered.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border-2 border-[#DCFCE7] overflow-hidden shadow-xs hover:border-[#86EFAC] transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 font-black text-[#0F291E] hover:text-[#16A34A] transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#15803D] bg-[#F0FDF4] px-2.5 py-0.5 rounded-full border border-[#BBF7D0] inline-block mb-1.5">
                        {item.category}
                      </span>
                      <h3 className="text-base sm:text-lg leading-snug">{item.question}</h3>
                    </div>
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
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Support Strip */}
          <div className="mt-14 p-8 bg-[#F0FDF4] rounded-3xl border-2 border-[#DCFCE7] text-center shadow-sm">
            <h3 className="text-xl font-black text-[#0F291E] mb-2">
              Have a question about your specific rooftop?
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] mb-6 max-w-md mx-auto">
              Our qualified solar engineers are available to review your latest electricity bill and discuss system feasibility.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/#consultation"
                className="w-full sm:w-auto px-6 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Request Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <WhatsAppButton
                label="Ask on WhatsApp"
                variant="outline"
                className="w-full sm:w-auto bg-white py-3 px-6 text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
