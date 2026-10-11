"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFormSchema, LeadFormInput } from "@/lib/validations/lead";
import { CheckCircle2, Loader2, MapPin, User, Mail, Send, Phone, Zap } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SITE_CONFIG, getPhoneCallUrl } from "@/lib/site-config";
import { useLeadSubmit } from "@/lib/useLeadSubmit";

export interface LeadCalculatorContext {
  calculatorUsed: boolean;
  estimatedSystemSize?: string | number;
  estimatedMonthlyGeneration?: number;
  estimatedAnnualGeneration?: number;
  estimatedMonthlySavings?: number;
  estimatedAnnualSavings?: number;
  estimatedPaybackYears?: number;
  roofAreaSqFt?: number;
}

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  initialPropertyType?: "Residential" | "Commercial" | "Other";
  initialBill?: string;
  initialCapacity?: string;
  initialCity?: string;
  source?: string;
  calculatorContext?: LeadCalculatorContext;
  onSuccessCallback?: () => void;
  compact?: boolean;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  title = "Request a Quote from Hardev Solar Services",
  subtitle = "Talk to our solar team for a transparent rooftop assessment and customized quotation across Maharashtra.",
  initialPropertyType = "Residential",
  initialBill = "",
  initialCapacity = "",
  initialCity = "",
  source,
  calculatorContext,
  onSuccessCallback,
  compact = false,
}) => {
  const [lastSubmittedPhone, setLastSubmittedPhone] = useState("");

  const {
    submitLead,
    isSubmitting,
    isSuccess,
    errorMessage,
    resetState,
  } = useLeadSubmit({
    defaultSource: source || (calculatorContext?.calculatorUsed ? "solar_calculator" : "lead_form"),
    onSuccess: () => {
      onSuccessCallback?.();
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<LeadFormInput>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      location: initialCity,
      propertyType: initialPropertyType,
      monthlyBill: initialBill,
      estimatedCapacityKW: initialCapacity,
      message: "",
      website: "",
    },
  });

  // Dynamically update form when incoming calculator props change
  React.useEffect(() => {
    if (initialPropertyType) {
      setValue("propertyType", initialPropertyType);
    }
  }, [initialPropertyType, setValue]);

  React.useEffect(() => {
    if (initialBill) {
      setValue("monthlyBill", initialBill);
    }
  }, [initialBill, setValue]);

  React.useEffect(() => {
    if (initialCapacity) {
      setValue("estimatedCapacityKW", initialCapacity);
    }
  }, [initialCapacity, setValue]);

  React.useEffect(() => {
    if (initialCity) {
      setValue("location", initialCity);
    }
  }, [initialCity, setValue]);

  const selectedPropertyType = watch("propertyType");

  const onSubmit = async (data: LeadFormInput) => {
    const success = await submitLead({
      ...data,
      city: data.location,
      monthlyElectricityBill: data.monthlyBill,
      interestedService: `${data.propertyType} Solar`,
      source: source || (calculatorContext?.calculatorUsed ? "solar_calculator" : "lead_form"),
      calculatorUsed: calculatorContext?.calculatorUsed,
      estimatedSystemSize: calculatorContext?.estimatedSystemSize?.toString(),
      estimatedMonthlyGeneration: calculatorContext?.estimatedMonthlyGeneration,
      estimatedAnnualGeneration: calculatorContext?.estimatedAnnualGeneration,
      estimatedMonthlySavings: calculatorContext?.estimatedMonthlySavings,
      estimatedAnnualSavings: calculatorContext?.estimatedAnnualSavings,
      estimatedPaybackYears: calculatorContext?.estimatedPaybackYears,
      roofAreaSqFt: calculatorContext?.roofAreaSqFt,
    });

    if (success) {
      setLastSubmittedPhone(data.phone);
      reset();
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-[#BBF7D0] text-center">
        <div className="w-16 h-16 bg-[#DCFCE7] text-[#16A34A] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#BBF7D0] shadow-xs">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-[#0F291E] mb-2">
          Consultation Request Received!
        </h3>
        <p className="text-[#475569] mb-6 text-sm sm:text-base max-w-md mx-auto">
          Thank you for reaching out to <strong>{SITE_CONFIG.companyName}</strong>. Our qualified solar engineers will review your requirement and contact you at{" "}
          <span className="font-extrabold text-[#0F291E]">+91 {lastSubmittedPhone}</span> shortly.
        </p>

        <div className="p-4 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl mb-6 text-left text-xs sm:text-sm text-[#0F291E]">
          <p className="font-bold mb-1">What happens next?</p>
          <ul className="list-disc pl-4 space-y-1 text-[#475569]">
            <li>Preliminary rooftop viability & shadow analysis</li>
            <li>System capacity planning (3 kW to 50 kW scope)</li>
            <li>Customized technical proposal with transparent component breakdown</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <WhatsAppButton
            message={`Hello Hardev Solar Services, I just submitted a consultation request for phone +91 ${lastSubmittedPhone}. Please connect with me.`}
            label="Chat on WhatsApp for Faster Response"
            className="w-full sm:w-auto"
          />
          <button
            type="button"
            onClick={resetState}
            className="text-xs font-bold text-[#16A34A] hover:text-[#15803D] underline mt-2 sm:mt-0 cursor-pointer"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      id="consultation"
      className={`bg-white rounded-3xl shadow-xl shadow-[#16A34A]/5 border-2 border-[#DCFCE7] ${
        compact ? "p-5 sm:p-7" : "p-6 sm:p-8 md:p-10"
      }`}
    >
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DCFCE7] text-[#15803D] text-xs font-extrabold rounded-full mb-2 border border-[#BBF7D0] shadow-xs">
          <Zap className="w-3.5 h-3.5 text-[#16A34A]" />
          <span>Professional Solar Assessment</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-[#0F291E] tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-[#475569] mt-2 text-xs sm:text-sm leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs sm:text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Anti-spam Honeypot field (hidden) */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          style={{ display: "none" }}
          {...register("website")}
        />

        {/* Customer Type Selector */}
        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0F291E] mb-2">
            Customer Type <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["Residential", "Commercial", "Other"] as const).map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setValue("propertyType", type, { shouldValidate: true })}
                className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold border text-center transition-all cursor-pointer ${
                  selectedPropertyType === type
                    ? "bg-[#16A34A] text-white border-[#16A34A] shadow-md shadow-[#16A34A]/20"
                    : "bg-[#F0FDF4] text-[#0F291E] border-[#DCFCE7] hover:bg-[#DCFCE7]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label
            htmlFor="lead-fullName"
            className="block text-xs font-bold uppercase tracking-wider text-[#0F291E] mb-1"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#475569]">
              <User className="w-4 h-4" />
            </div>
            <input
              id="lead-fullName"
              type="text"
              placeholder="e.g. Ramesh Patil"
              {...register("fullName")}
              className={`w-full pl-9 pr-3.5 py-2.5 bg-[#F0FDF4]/50 border rounded-xl text-xs sm:text-sm text-[#0F291E] placeholder:text-[#475569]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all ${
                errors.fullName ? "border-red-400 bg-red-50/30" : "border-[#DCFCE7]"
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label
            htmlFor="lead-phone"
            className="block text-xs font-bold uppercase tracking-wider text-[#0F291E] mb-1"
          >
            Mobile Number (WhatsApp preferred) <span className="text-red-500">*</span>
          </label>
          <div className="relative flex">
            <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#DCFCE7] bg-[#DCFCE7] text-[#15803D] text-xs sm:text-sm font-bold">
              +91
            </span>
            <input
              id="lead-phone"
              type="tel"
              maxLength={10}
              placeholder="10-digit mobile number"
              {...register("phone")}
              className={`w-full px-3 py-2.5 bg-[#F0FDF4]/50 border rounded-r-xl text-xs sm:text-sm text-[#0F291E] placeholder:text-[#475569]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all ${
                errors.phone ? "border-red-400 bg-red-50/30" : "border-[#DCFCE7]"
              }`}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* Email (Optional) */}
        <div>
          <label
            htmlFor="lead-email"
            className="block text-xs font-bold uppercase tracking-wider text-[#0F291E] mb-1"
          >
            Email Address (Optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#475569]">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="lead-email"
              type="email"
              placeholder="name@example.com"
              {...register("email")}
              className="w-full pl-9 pr-3.5 py-2.5 bg-[#F0FDF4]/50 border border-[#DCFCE7] rounded-xl text-xs sm:text-sm text-[#0F291E] placeholder:text-[#475569]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* City / Location */}
        <div>
          <label
            htmlFor="lead-location"
            className="block text-xs font-bold uppercase tracking-wider text-[#0F291E] mb-1"
          >
            Installation City / Area <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#475569]">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              id="lead-location"
              type="text"
              placeholder="e.g. Pune, Baner or Nashik"
              {...register("location")}
              className={`w-full pl-9 pr-3.5 py-2.5 bg-[#F0FDF4]/50 border rounded-xl text-xs sm:text-sm text-[#0F291E] placeholder:text-[#475569]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all ${
                errors.location ? "border-red-400 bg-red-50/30" : "border-[#DCFCE7]"
              }`}
            />
          </div>
          {errors.location && (
            <p className="mt-1 text-xs text-red-600">{errors.location.message}</p>
          )}
        </div>

        {/* Monthly Bill & Estimated Capacity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="lead-bill"
              className="block text-xs font-bold uppercase tracking-wider text-[#0F291E] mb-1"
            >
              Avg. Monthly Bill
            </label>
            <select
              id="lead-bill"
              {...register("monthlyBill")}
              className="w-full px-3 py-2.5 bg-[#F0FDF4]/50 border border-[#DCFCE7] rounded-xl text-xs sm:text-sm text-[#0F291E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
            >
              <option value="">Select bill range</option>
              <option value="Below ₹1,500">Below ₹1,500</option>
              <option value="₹1,500 – ₹2,500">₹1,500 – ₹2,500</option>
              <option value="₹2,500 – ₹4,000">₹2,500 – ₹4,000</option>
              <option value="₹4,000 – ₹8,000">₹4,000 – ₹8,000</option>
              <option value="Above ₹8,000">Above ₹8,000</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="lead-capacity"
              className="block text-xs font-bold uppercase tracking-wider text-[#0F291E] mb-1"
            >
              Estimated Capacity
            </label>
            <select
              id="lead-capacity"
              {...register("estimatedCapacityKW")}
              className="w-full px-3 py-2.5 bg-[#F0FDF4]/50 border border-[#DCFCE7] rounded-xl text-xs sm:text-sm text-[#0F291E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
            >
              <option value="">Select or let engineer suggest</option>
              <option value="3 kW">3 kW (Standard Home)</option>
              <option value="5 kW">5 kW (Medium Home)</option>
              <option value="8 kW">8 kW (Large Home / Bungalow)</option>
              <option value="10 kW">10 kW (Commercial / Villa)</option>
              <option value="15 kW">15 kW (Small Commercial)</option>
              <option value="25 kW">25 kW (Commercial / Facility)</option>
              <option value="50 kW">50 kW (Mid Commercial / Industrial)</option>
              <option value="Need Site Assessment">Not Sure - Need Engineer Assessment</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="lead-message"
            className="block text-xs font-bold uppercase tracking-wider text-[#0F291E] mb-1"
          >
            Message / Specific Rooftop Notes (Optional)
          </label>
          <textarea
            id="lead-message"
            rows={2}
            placeholder="e.g. Flat RCC terrace, looking to preserve usable space with elevated structure"
            {...register("message")}
            className="w-full px-3.5 py-2.5 bg-[#F0FDF4]/50 border border-[#DCFCE7] rounded-xl text-xs sm:text-sm text-[#0F291E] placeholder:text-[#475569]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
          />
        </div>

        {/* Primary CTA */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 bg-[#16A34A] hover:bg-[#15803D] active:bg-[#14532D] text-white font-extrabold rounded-xl text-sm sm:text-base shadow-lg shadow-[#16A34A]/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-white" />
              <span>Submitting Your Request...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5 text-white" />
              <span>Request Free Consultation</span>
            </>
          )}
        </button>

        {/* Direct Contact Options */}
        <div className="pt-3 border-t border-[#DCFCE7] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <a
            href={getPhoneCallUrl(SITE_CONFIG.phone)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#0F291E] font-bold border border-[#DCFCE7] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#16A34A]" />
            <span>Call Us: {SITE_CONFIG.displayPhone}</span>
          </a>

          <WhatsAppButton
            label="WhatsApp Us"
            className="w-full sm:w-auto py-2 px-4 text-xs font-bold"
          />
        </div>

        <p className="text-center text-[10px] text-[#475569]">
          🔒 Your contact details are secure. We respect your privacy and never spam.
        </p>
      </form>
    </div>
  );
};
