"use client";

import React, { useState, useMemo } from "react";
import {
  calculateSolarRequirement,
  PropertyType,
  snapToPracticalSystemSize,
} from "@/lib/solar-calculator";
import {
  DEFAULT_BILL_BRACKETS,
  PRACTICAL_SYSTEM_SIZES_KW,
  CALCULATOR_DISCLAIMER,
} from "@/lib/solar-config";
import {
  Zap,
  Home,
  Building2,
  Maximize2,
  Leaf,
  Info,
  Sun,
  Sparkles,
  MapPin,
  IndianRupee,
  Calendar,
  Clock,
  ArrowDown,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getWhatsAppUrl } from "@/lib/site-config";

type InputBasis = "bill" | "units" | "capacity";

export default function SolarCalculatorPage() {
  const [propertyType, setPropertyType] = useState<PropertyType>("residential");
  const [city, setCity] = useState<string>("");
  const [inputBasis, setInputBasis] = useState<InputBasis>("bill");

  // Bill mode state
  const [useExactBill, setUseExactBill] = useState(false);
  const [selectedBracketId, setSelectedBracketId] = useState<string>("2500_4000");
  const [customBill, setCustomBill] = useState<number>(3500);

  // Units mode state
  const [customUnits, setCustomUnits] = useState<number>(450);

  // Preferred capacity mode state
  const [preferredCapacity, setPreferredCapacity] = useState<number>(5);

  // Optional Roof Area state
  const [availableRoofArea, setAvailableRoofArea] = useState<string>("");

  // Sanitized roof area number
  const parsedRoofArea = useMemo(() => {
    const val = parseFloat(availableRoofArea);
    return !isNaN(val) && val > 0 ? val : undefined;
  }, [availableRoofArea]);

  // Compute calculation results deterministically
  const calculation = useMemo(() => {
    if (inputBasis === "units") {
      const validUnits = customUnits > 0 ? customUnits : 120;
      return calculateSolarRequirement({
        propertyType,
        monthlyUnitsKWh: validUnits,
        availableRoofAreaSqFt: parsedRoofArea,
        city: city.trim() || undefined,
      });
    }

    if (inputBasis === "capacity") {
      return calculateSolarRequirement({
        propertyType,
        preferredSystemSizeKW: preferredCapacity,
        availableRoofAreaSqFt: parsedRoofArea,
        city: city.trim() || undefined,
      });
    }

    // Default: Bill mode
    if (useExactBill) {
      const validBill = customBill > 0 ? customBill : 1000;
      return calculateSolarRequirement({
        propertyType,
        monthlyBill: validBill,
        availableRoofAreaSqFt: parsedRoofArea,
        city: city.trim() || undefined,
      });
    }

    return calculateSolarRequirement({
      propertyType,
      billBracket: selectedBracketId,
      availableRoofAreaSqFt: parsedRoofArea,
      city: city.trim() || undefined,
    });
  }, [
    propertyType,
    inputBasis,
    customUnits,
    preferredCapacity,
    useExactBill,
    customBill,
    selectedBracketId,
    parsedRoofArea,
    city,
  ]);

  // Generate customized WhatsApp query message
  const whatsappQueryMessage = useMemo(() => {
    const propertyLabel = propertyType === "commercial" ? "Commercial Facility" : "Residential Home";
    const cityText = city.trim() ? city.trim() : "Not specified";
    const billOrUnits =
      inputBasis === "units"
        ? `${customUnits} units/month`
        : calculation.billRangeDisplay;

    return `Hello Hardev Solar Services, I used your solar calculator and would like to discuss a solar installation.

Property Type: ${propertyLabel}
City: ${cityText}
Monthly Electricity Usage: ${billOrUnits}
Estimated Solar Requirement: ${calculation.estimatedSystemSize} kW
Estimated Monthly Generation: ~${calculation.estimatedMonthlyGeneration} units

Please help me with the next steps and quotation.`;
  }, [propertyType, city, inputBasis, customUnits, calculation]);

  const scrollToConsultation = () => {
    const el = document.getElementById("consultation");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#F0FDF4] via-white to-[#F0FDF4] text-[#0F291E] py-14 sm:py-20 text-center relative overflow-hidden border-b border-[#DCFCE7]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DCFCE7]/60 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 shadow-xs">
            <Sun className="w-3.5 h-3.5 fill-[#FACC15] text-[#F59E0B]" />
            <span>Interactive Solar Sizing & Savings Estimator</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F291E] mb-5">
            Calculate Your Solar Requirement
          </h1>
          <p className="text-[#475569] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Estimate your required rooftop solar PV system capacity (3 kW to 50 kW), monthly energy generation, and indicative electricity bill savings based on typical regional insolation.
          </p>
        </div>
      </section>

      {/* Main Interactive Grid */}
      <section className="py-12 sm:py-20 bg-[#F0FDF4]/50 border-b border-[#DCFCE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Input Selection Panel */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 md:p-9 shadow-lg shadow-[#16A34A]/5 border-2 border-[#DCFCE7] space-y-7">
              {/* 1. Customer Category */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0F291E] mb-2.5">
                  1. Property Category <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3.5">
                  <button
                    type="button"
                    onClick={() => setPropertyType("residential")}
                    className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl font-bold text-sm sm:text-base border-2 transition-all cursor-pointer ${
                      propertyType === "residential"
                        ? "border-[#16A34A] bg-[#DCFCE7] text-[#0F291E] shadow-xs"
                        : "border-[#DCFCE7] text-[#475569] hover:border-[#86EFAC] bg-[#F0FDF4]/30"
                    }`}
                  >
                    <Home className="w-5 h-5 text-[#16A34A]" />
                    <span>Residential</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPropertyType("commercial")}
                    className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl font-bold text-sm sm:text-base border-2 transition-all cursor-pointer ${
                      propertyType === "commercial"
                        ? "border-[#16A34A] bg-[#DCFCE7] text-[#0F291E] shadow-xs"
                        : "border-[#DCFCE7] text-[#475569] hover:border-[#86EFAC] bg-[#F0FDF4]/30"
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-[#16A34A]" />
                    <span>Commercial</span>
                  </button>
                </div>
              </div>

              {/* 2. City / Location Input */}
              <div>
                <label
                  htmlFor="calc-city"
                  className="block text-xs font-extrabold uppercase tracking-wider text-[#0F291E] mb-2"
                >
                  2. Installation City / District
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#16A34A]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    id="calc-city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Pune, Baner, Nashik, or PCMC"
                    className="w-full pl-10 pr-4 py-3 bg-[#F0FDF4]/50 border border-[#DCFCE7] rounded-2xl text-sm font-semibold text-[#0F291E] placeholder:text-[#475569]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
                  />
                </div>
              </div>

              {/* 3. Estimation Basis Selector */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0F291E]">
                    3. Estimation Method
                  </label>
                  <div className="inline-flex rounded-xl bg-[#F0FDF4] p-1 border border-[#DCFCE7] text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setInputBasis("bill")}
                      className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        inputBasis === "bill"
                          ? "bg-[#16A34A] text-white shadow-xs"
                          : "text-[#475569] hover:text-[#0F291E]"
                      }`}
                    >
                      Monthly Bill
                    </button>
                    <button
                      type="button"
                      onClick={() => setInputBasis("units")}
                      className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        inputBasis === "units"
                          ? "bg-[#16A34A] text-white shadow-xs"
                          : "text-[#475569] hover:text-[#0F291E]"
                      }`}
                    >
                      Units (kWh)
                    </button>
                    <button
                      type="button"
                      onClick={() => setInputBasis("capacity")}
                      className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        inputBasis === "capacity"
                          ? "bg-[#16A34A] text-white shadow-xs"
                          : "text-[#475569] hover:text-[#0F291E]"
                      }`}
                    >
                      System Size
                    </button>
                  </div>
                </div>

                {/* Sub-Option A: By Monthly Bill */}
                {inputBasis === "bill" && (
                  <div className="space-y-4 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#475569] font-medium">
                        {useExactBill ? "Enter exact monthly bill amount:" : "Select your approximate monthly electricity bill:"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setUseExactBill(!useExactBill)}
                        className="text-[#16A34A] hover:underline font-bold cursor-pointer"
                      >
                        {useExactBill ? "← Choose from standard ranges" : "Enter exact amount →"}
                      </button>
                    </div>

                    {useExactBill ? (
                      <div className="p-4 bg-[#F0FDF4]/50 border border-[#DCFCE7] rounded-2xl space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-black text-[#15803D] font-mono">₹</span>
                          <input
                            type="number"
                            min={500}
                            max={100000}
                            step={250}
                            value={customBill || ""}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value);
                              setCustomBill(isNaN(val) ? 0 : Math.max(0, val));
                            }}
                            className="w-full text-xl sm:text-2xl font-black text-[#0F291E] px-4 py-2.5 bg-white border border-[#DCFCE7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                          />
                        </div>
                        <input
                          type="range"
                          min={1000}
                          max={50000}
                          step={500}
                          value={customBill || 1000}
                          onChange={(e) => setCustomBill(Number(e.target.value))}
                          className="w-full accent-[#16A34A] cursor-pointer"
                        />
                        <div className="flex justify-between text-[11px] text-[#475569]">
                          <span>₹1,000 / mo</span>
                          <span>₹25,000 / mo</span>
                          <span>₹50,000+ / mo</span>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {DEFAULT_BILL_BRACKETS.map((bracket) => {
                          const isSelected = selectedBracketId === bracket.id;
                          return (
                            <button
                              key={bracket.id}
                              type="button"
                              onClick={() => setSelectedBracketId(bracket.id)}
                              className={`text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                                isSelected
                                  ? "border-[#16A34A] bg-[#16A34A] text-white shadow-sm"
                                  : "border-[#DCFCE7] bg-[#F0FDF4]/60 text-[#0F291E] hover:bg-[#DCFCE7]"
                              }`}
                            >
                              <div className="font-extrabold text-xs sm:text-sm">{bracket.label}</div>
                              <div
                                className={`text-[11px] mt-0.5 ${
                                  isSelected ? "text-[#DCFCE7]" : "text-[#475569]"
                                }`}
                              >
                                Approx. ~{bracket.typicalCapacityKW} kW plant
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Sub-Option B: By Monthly Units (kWh) */}
                {inputBasis === "units" && (
                  <div className="space-y-3 pt-1">
                    <p className="text-xs text-[#475569]">
                      Enter your average monthly units (kWh) from your latest electricity bill:
                    </p>
                    <div className="p-4 bg-[#F0FDF4]/50 border border-[#DCFCE7] rounded-2xl space-y-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min={50}
                          max={15000}
                          step={25}
                          value={customUnits || ""}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setCustomUnits(isNaN(val) ? 0 : Math.max(0, val));
                          }}
                          className="w-full text-xl sm:text-2xl font-black text-[#0F291E] px-4 py-2.5 bg-white border border-[#DCFCE7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                        />
                        <span className="text-sm font-bold text-[#15803D] shrink-0">units / mo</span>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {[150, 300, 500, 800, 1200, 2500].map((quickUnits) => (
                          <button
                            key={quickUnits}
                            type="button"
                            onClick={() => setCustomUnits(quickUnits)}
                            className="px-2.5 py-1 text-xs rounded-lg border border-[#BBF7D0] bg-white text-[#15803D] font-bold hover:bg-[#DCFCE7] cursor-pointer"
                          >
                            {quickUnits} kWh
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-Option C: By System Size Direct */}
                {inputBasis === "capacity" && (
                  <div className="space-y-3 pt-1">
                    <p className="text-xs text-[#475569]">
                      Select preferred rooftop solar capacity within Hardev Solar Services verified scope:
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                      {PRACTICAL_SYSTEM_SIZES_KW.map((size) => {
                        const isSelected = preferredCapacity === size;
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setPreferredCapacity(size)}
                            className={`py-3 px-2 rounded-xl border-2 font-black text-center transition-all cursor-pointer ${
                              isSelected
                                ? "border-[#16A34A] bg-[#16A34A] text-white shadow-sm"
                                : "border-[#DCFCE7] bg-[#F0FDF4]/60 text-[#0F291E] hover:bg-[#DCFCE7]"
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

              {/* 4. Optional Available Roof Area */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="calc-roof"
                    className="block text-xs font-extrabold uppercase tracking-wider text-[#0F291E]"
                  >
                    4. Available Shadow-Free Roof Area (Optional)
                  </label>
                  <span className="text-[11px] text-[#475569]">Terrace / Shed</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#16A34A]">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <input
                    id="calc-roof"
                    type="number"
                    min={0}
                    max={50000}
                    value={availableRoofArea}
                    onChange={(e) => setAvailableRoofArea(e.target.value)}
                    placeholder="e.g. 500 (in square feet)"
                    className="w-full pl-10 pr-16 py-3 bg-[#F0FDF4]/50 border border-[#DCFCE7] rounded-2xl text-sm font-semibold text-[#0F291E] placeholder:text-[#475569]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
                  />
                  <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-[#475569] pointer-events-none">
                    sq. ft
                  </span>
                </div>
                <p className="text-[11px] text-[#475569] mt-1.5">
                  Typically, ~90 sq. ft of shadow-free rooftop area is required per 1 kW of solar PV.
                </p>
              </div>

              {/* Informative Assumption Notes */}
              <div className="p-4 bg-[#F0FDF4] rounded-2xl border border-[#BBF7D0] flex items-start gap-3 text-xs text-[#0F291E]">
                <Info className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold mb-1">Calculation Assumptions & Methodology</p>
                  <p className="leading-relaxed text-[#475569]">
                    Assumes typical regional insolation (~120 units per kW/month) and average DISCOM tariffs (~₹8/unit Residential, ~₹10/unit Commercial). Payback estimates are indicative based on benchmark EPC turnkey installations.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Results Panel */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#F0FDF4] via-white to-[#DCFCE7] text-[#0F291E] rounded-3xl p-6 sm:p-8 md:p-9 shadow-xl shadow-[#16A34A]/10 border-2 border-[#BBF7D0] space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-[#15803D] text-xs font-extrabold rounded-full border border-[#BBF7D0] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Estimated Solar Sizing & Savings</span>
              </div>

              <div>
                <h2 className="text-2xl font-black text-[#0F291E]">
                  Your Estimated Sizing
                </h2>
                <p className="text-xs text-[#475569] mt-1">
                  Based on the information provided, your indicative solar requirement is:
                </p>
              </div>

              {/* Primary Capacity Card */}
              <div className="bg-white rounded-2xl p-6 border-2 border-[#86EFAC] shadow-md shadow-[#16A34A]/5">
                <div className="text-xs uppercase font-extrabold text-[#15803D] mb-1">
                  Estimated Solar System Size
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-[#15803D] font-mono">
                    {calculation.estimatedSystemSize}
                  </span>
                  <span className="text-2xl font-black text-[#0F291E]">kW</span>
                </div>
                <div className="text-xs text-[#475569] mt-2 font-medium flex items-center justify-between">
                  <span>Hardev Solar Services Scope (3 kW – 50 kW)</span>
                  <span className="font-bold text-[#15803D]">{calculation.propertyTypeDisplay}</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="space-y-3">
                {/* Generation */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#DCFCE7] shadow-xs">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#475569] font-medium">
                    <Zap className="w-4 h-4 text-[#16A34A]" />
                    <span>Estimated Monthly Generation:</span>
                  </div>
                  <span className="font-bold text-[#0F291E] text-sm font-mono">
                    ~{calculation.estimatedMonthlyGeneration.toLocaleString("en-IN")} units
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#DCFCE7] shadow-xs">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#475569] font-medium">
                    <Calendar className="w-4 h-4 text-[#16A34A]" />
                    <span>Estimated Annual Generation:</span>
                  </div>
                  <span className="font-bold text-[#0F291E] text-sm font-mono">
                    ~{calculation.estimatedAnnualGeneration.toLocaleString("en-IN")} units
                  </span>
                </div>

                {/* Savings */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#DCFCE7] shadow-xs">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#475569] font-medium">
                    <IndianRupee className="w-4 h-4 text-[#16A34A]" />
                    <span>Estimated Monthly Savings:</span>
                  </div>
                  <span className="font-black text-[#15803D] text-sm">
                    ~₹{calculation.estimatedMonthlySavings.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#DCFCE7] shadow-xs">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#475569] font-medium">
                    <IndianRupee className="w-4 h-4 text-[#16A34A]" />
                    <span>Estimated Annual Savings:</span>
                  </div>
                  <span className="font-black text-[#15803D] text-sm">
                    ~₹{calculation.estimatedAnnualSavings.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Payback */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#DCFCE7] shadow-xs">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#475569] font-medium">
                    <Clock className="w-4 h-4 text-[#16A34A]" />
                    <span>Estimated Payback Period:</span>
                  </div>
                  <span className="font-bold text-[#0F291E] text-sm font-mono">
                    ~{calculation.estimatedPaybackPeriodYears} Years
                  </span>
                </div>

                {/* Roof Area Required & Feasibility */}
                <div className="p-3.5 rounded-xl bg-white border border-[#DCFCE7] shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-[#475569] font-medium">
                      <Maximize2 className="w-4 h-4 text-[#16A34A]" />
                      <span>Shadow-Free Roof Area Needed:</span>
                    </div>
                    <span className="font-bold text-[#0F291E] text-sm">
                      ~{calculation.estimatedRoofAreaRequiredSqFt} sq. ft
                    </span>
                  </div>

                  {calculation.roofAreaFits !== null && (
                    <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[#475569]">Your Roof Area: {parsedRoofArea} sq. ft</span>
                      {calculation.roofAreaFits ? (
                        <span className="inline-flex items-center gap-1 text-[#15803D] font-extrabold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                          Sufficient Terrace Space
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-700 font-extrabold text-[11px]">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                          Site Survey Recommended
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* CO2 Offset */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#DCFCE7] shadow-xs">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#475569] font-medium">
                    <Leaf className="w-4 h-4 text-[#16A34A]" />
                    <span>Est. Annual CO2 Reduction:</span>
                  </div>
                  <span className="font-bold text-[#0F291E] text-sm">
                    ~{calculation.estimatedCO2OffsetKgPerYear.toLocaleString("en-IN")} kg / yr
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={scrollToConsultation}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#16A34A]/20 transition-all cursor-pointer"
                >
                  <span>Get a Free Solar Consultation</span>
                  <ArrowDown className="w-4 h-4" />
                </button>

                <WhatsAppButton
                  message={whatsappQueryMessage}
                  label="Discuss This Sizing on WhatsApp"
                  className="w-full"
                />
              </div>

              {/* Standard Mandatory Disclaimer */}
              <p className="text-[11px] text-[#475569] text-center leading-relaxed bg-[#F0FDF4] p-3 rounded-xl border border-[#BBF7D0]">
                {CALCULATOR_DISCLAIMER}
              </p>
            </div>
          </div>

          {/* Consultation Form Anchor */}
          <div id="consultation" className="mt-16 sm:mt-24 max-w-3xl mx-auto scroll-mt-24">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#DCFCE7] text-[#15803D] text-xs font-bold rounded-full mb-3 border border-[#BBF7D0]">
                <span>Pre-Filled From Calculator</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-[#0F291E]">
                Confirm Your Free Solar Consultation
              </h3>
              <p className="text-[#475569] text-sm sm:text-base mt-2 max-w-xl mx-auto">
                We have pre-filled your estimated <strong>{calculation.estimatedSystemSize} kW</strong> requirement below. Submit to request a physical rooftop feasibility survey from Hardev Solar Services.
              </p>
            </div>

            <LeadForm
              title="Request On-Site Technical Proposal"
              subtitle={`We will prepare an engineering proposal tailored for your estimated ${calculation.estimatedSystemSize} kW system.`}
              initialPropertyType={propertyType === "commercial" ? "Commercial" : "Residential"}
              initialBill={calculation.billRangeDisplay}
              initialCapacity={`${calculation.estimatedSystemSize} kW`}
              initialCity={city}
              source="solar_calculator"
              calculatorContext={{
                calculatorUsed: true,
                estimatedSystemSize: calculation.estimatedSystemSize,
                estimatedMonthlyGeneration: calculation.estimatedMonthlyGeneration,
                estimatedAnnualGeneration: calculation.estimatedAnnualGeneration,
                estimatedMonthlySavings: calculation.estimatedMonthlySavings,
                estimatedAnnualSavings: calculation.estimatedAnnualSavings,
                estimatedPaybackYears: calculation.estimatedPaybackPeriodYears,
                roofAreaSqFt: calculation.estimatedRoofAreaRequiredSqFt,
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
