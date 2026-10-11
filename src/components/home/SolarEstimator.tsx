"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sun,
  Home,
  Building2,
  Zap,
  ArrowRight,
  Sparkles,
  Info,
  IndianRupee,
  Calendar,
} from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import {
  PropertyType,
  BillOption,
  BILL_OPTIONS,
  SYSTEM_SIZES,
  calculateSavingsEstimate,
} from "@/data/savingsEstimatorConfig";
import { COMPANY_CONFIG } from "@/data/companyConfig";

export const SolarEstimator: React.FC = () => {
  const [propertyType, setPropertyType] = useState<PropertyType>("residential");
  const [selectedBill, setSelectedBill] = useState<BillOption>("2500_4000");
  const [selectedSystemSize, setSelectedSystemSize] = useState<number>(5);
  const [selectionMode, setSelectionMode] = useState<"bill" | "system">("bill");

  // When bill changes in bill mode, calculate based on typical capacity of that bill
  const estimate =
    selectionMode === "bill"
      ? calculateSavingsEstimate({ propertyType, billOption: selectedBill })
      : calculateSavingsEstimate({ propertyType, systemSizeKW: selectedSystemSize });

  return (
    <section id="estimator" className="py-20 lg:py-28 bg-[#F0FDF4] border-y border-[#DCFCE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DCFCE7] border border-[#BBF7D0] text-[#15803D] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 shadow-xs">
            <Sun className="w-3.5 h-3.5 fill-[#FACC15] text-[#F59E0B]" />
            <span>Interactive Rooftop Estimator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F291E] tracking-tight">
            How Much Can You Save With Solar?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#475569] leading-relaxed">
            Select your property type and monthly electricity bill or system size to see your estimated generation and indicative electricity cost reductions.
          </p>
        </div>

        {/* Estimator Card Container */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl shadow-[#15803D]/8 border-2 border-[#DCFCE7] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Input Selection Controls */}
            <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 space-y-7">
              {/* 1. Property Type */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0F291E] mb-3">
                  1. Property Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPropertyType("residential")}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-sm border-2 transition-all cursor-pointer ${
                      propertyType === "residential"
                        ? "border-[#16A34A] bg-[#DCFCE7] text-[#15803D] shadow-xs"
                        : "border-[#DCFCE7] text-[#475569] hover:border-[#86EFAC] bg-white"
                    }`}
                  >
                    <Home className="w-4 h-4 text-[#16A34A]" />
                    <span>Residential</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPropertyType("commercial")}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-sm border-2 transition-all cursor-pointer ${
                      propertyType === "commercial"
                        ? "border-[#16A34A] bg-[#DCFCE7] text-[#15803D] shadow-xs"
                        : "border-[#DCFCE7] text-[#475569] hover:border-[#86EFAC] bg-white"
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-[#16A34A]" />
                    <span>Commercial</span>
                  </button>
                </div>
              </div>

              {/* 2. Selection Mode Tabs: By Monthly Bill or Direct System Size */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0F291E]">
                    2. Choose Your Estimation Basis
                  </label>
                  <div className="inline-flex rounded-lg bg-[#F0FDF4] p-1 border border-[#DCFCE7] text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setSelectionMode("bill")}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        selectionMode === "bill"
                          ? "bg-[#16A34A] text-white"
                          : "text-[#475569] hover:text-[#0F291E]"
                      }`}
                    >
                      By Monthly Bill
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectionMode("system")}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        selectionMode === "system"
                          ? "bg-[#16A34A] text-white"
                          : "text-[#475569] hover:text-[#0F291E]"
                      }`}
                    >
                      By System Size
                    </button>
                  </div>
                </div>

                {/* Option A: Monthly Electricity Bill */}
                {selectionMode === "bill" ? (
                  <div className="space-y-2">
                    <p className="text-xs text-[#475569] mb-2">
                      Select your approximate monthly electricity bill:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {BILL_OPTIONS.map((opt) => {
                        const isSelected = selectedBill === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelectedBill(opt.id)}
                            className={`text-left py-3 px-4 rounded-xl border-2 transition-all cursor-pointer ${
                              isSelected
                                ? "border-[#16A34A] bg-[#16A34A] text-white shadow-sm font-bold"
                                : "border-[#DCFCE7] bg-[#F0FDF4]/70 text-[#0F291E] hover:bg-[#DCFCE7] font-semibold"
                            }`}
                          >
                            <div className="text-xs sm:text-sm">{opt.label}</div>
                            <div
                              className={`text-[11px] mt-0.5 ${
                                isSelected ? "text-white/80" : "text-[#475569]"
                              }`}
                            >
                              Est. ~{opt.typicalCapacityKW} kW system
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* Option B: System Size (3, 5, 10, 15, 20, 25, 50 kW) */
                  <div className="space-y-2">
                    <p className="text-xs text-[#475569] mb-2">
                      Select desired rooftop system capacity:
                    </p>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {SYSTEM_SIZES.map((size) => {
                        const isSelected = selectedSystemSize === size;
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSystemSize(size)}
                            className={`py-3 px-2 rounded-xl border-2 font-black text-center transition-all cursor-pointer ${
                              isSelected
                                ? "border-[#16A34A] bg-[#16A34A] text-white shadow-sm"
                                : "border-[#DCFCE7] bg-[#F0FDF4]/70 text-[#0F291E] hover:bg-[#DCFCE7]"
                            }`}
                          >
                            <div className="text-sm sm:text-base font-mono">{size}</div>
                            <div
                              className={`text-[10px] font-semibold ${
                                isSelected ? "text-white/80" : "text-[#475569]"
                              }`}
                            >
                              kW
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Informative Notice & Disclaimer */}
              <div className="flex items-start gap-2.5 p-4 bg-[#F0FDF4] rounded-2xl text-xs text-[#0F291E] border border-[#BBF7D0]">
                <Info className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>Estimated figures only.</strong> Calculations assume typical regional solar generation of ~120 kWh/kW/month. No guaranteed savings claims or subsidies are assumed. Final performance depends on physical roof shadow profiling and DISCOM net-metering norms.
                </span>
              </div>
            </div>

            {/* Right: Output Metrics Display */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#F0FDF4] via-white to-[#DCFCE7] text-[#0F291E] p-6 sm:p-8 md:p-9 flex flex-col justify-between border-t lg:border-t-0 lg:border-l-2 border-[#DCFCE7]">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DCFCE7] text-[#15803D] text-xs font-extrabold rounded-full mb-4 border border-[#BBF7D0]">
                  <Sparkles className="w-3 h-3 text-[#16A34A]" />
                  <span>Estimated Solar Output</span>
                </div>

                <h3 className="text-xl font-black text-[#0F291E] mb-5 tracking-tight">
                  Estimated Sizing & Savings
                </h3>

                {/* Primary Metric 1: Estimated Solar Capacity */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#86EFAC] shadow-md shadow-[#16A34A]/5 mb-4">
                  <div className="text-[11px] uppercase font-extrabold text-[#15803D] mb-1">
                    Estimated Solar Capacity
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-[#16A34A] font-mono">
                      {estimate.systemSizeKW}
                    </span>
                    <span className="text-2xl font-bold text-[#0F291E]">kW</span>
                  </div>
                  <div className="text-xs text-[#475569] mt-1.5">
                    Recommended for {propertyType === "residential" ? "Home / Residential" : "Commercial Facility"}
                  </div>
                </div>

                {/* Secondary 3 Metrics Grid: Generation, Monthly Savings, Annual Savings */}
                <div className="space-y-2.5 mb-5">
                  {/* Estimated Monthly Generation */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#DCFCE7] shadow-xs">
                    <div className="flex items-center gap-2 text-xs text-[#475569]">
                      <Zap className="w-4 h-4 text-[#16A34A]" />
                      <span className="font-semibold">Estimated Monthly Generation:</span>
                    </div>
                    <span className="font-black text-[#0F291E] text-xs sm:text-sm">
                      ~{estimate.estimatedMonthlyUnits.toLocaleString("en-IN")} units
                    </span>
                  </div>

                  {/* Estimated Monthly Savings */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#DCFCE7] shadow-xs">
                    <div className="flex items-center gap-2 text-xs text-[#475569]">
                      <IndianRupee className="w-4 h-4 text-[#16A34A]" />
                      <span className="font-semibold">Estimated Monthly Savings:</span>
                    </div>
                    <span className="font-black text-[#16A34A] text-xs sm:text-sm">
                      ~₹{estimate.estimatedMonthlySavingsINR.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Estimated Annual Savings */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#DCFCE7] shadow-xs">
                    <div className="flex items-center gap-2 text-xs text-[#475569]">
                      <Calendar className="w-4 h-4 text-[#16A34A]" />
                      <span className="font-semibold">Estimated Annual Savings:</span>
                    </div>
                    <span className="font-black text-[#15803D] text-xs sm:text-sm">
                      ~₹{estimate.estimatedAnnualSavingsINR.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-[#DCFCE7]">
                <Link
                  href="#consultation"
                  className="w-full py-3.5 px-4 bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534] text-white font-black rounded-xl text-center text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-[#16A34A]/20"
                >
                  <span>Request Quote for {estimate.systemSizeKW} kW</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Link>

                <WhatsAppButton
                  message={`Hello Hardev Solar Services, I used your solar estimator for a ${estimate.systemSizeKW} kW system (${propertyType}). I would like a free site assessment.`}
                  variant="outline"
                  label="Discuss on WhatsApp"
                  className="w-full text-xs text-[#16A34A] border-[#BBF7D0] hover:bg-[#DCFCE7] py-2.5 bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Also export as CalculatorPreviewSection for seamless compatibility
export const CalculatorPreviewSection = SolarEstimator;
