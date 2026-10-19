"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFormSchema, LeadFormInput } from "@/lib/validations/lead";
import {
  CheckCircle2,
  Loader2,
  MapPin,
  User,
  ShieldCheck,
  ArrowRight,
  Phone,
  MessageSquare,
  Mail,
  Home,
  Building2,
  Factory,
} from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SITE_CONFIG, getPhoneCallUrl } from "@/lib/site-config";
import { useLeadSubmit } from "@/lib/useLeadSubmit";

interface ConsultationFormProps {
  className?: string;
  id?: string;
  defaultPropertyType?: "Residential" | "Commercial" | "Other";
  source?: string;
  onSuccessCallback?: () => void;
}

const BILL_OPTIONS = [
  "Below ₹1,500",
  "₹1,500 – ₹2,500",
  "₹2,500 – ₹4,000",
  "₹4,000 – ₹8,000",
  "Above ₹8,000",
];

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  className = "",
  id = "consultation",
  defaultPropertyType = "Residential",
  source = "homepage",
  onSuccessCallback,
}) => {
  const [lastSubmittedPhone, setLastSubmittedPhone] = useState("");

  const {
    submitLead,
    isSubmitting,
    isSuccess,
    errorMessage,
    resetState,
  } = useLeadSubmit({
    defaultSource: source,
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
      location: "",
      monthlyBill: "₹2,500 – ₹4,000",
      propertyType: defaultPropertyType,
      website: "",
      message: "",
    },
  });

  const selectedBill = watch("monthlyBill");
  const selectedPropertyType = watch("propertyType") || defaultPropertyType;

  const onSubmit = async (data: LeadFormInput) => {
    const selectedProp = data.propertyType || defaultPropertyType;
    const dynamicService =
      selectedProp === "Commercial"
        ? "Commercial Solar"
        : selectedProp === "Other"
        ? "General Consultation"
        : "Residential Solar";

    const success = await submitLead({
      ...data,
      email: data.email?.trim() || undefined,
      propertyType: selectedProp,
      city: data.location,
      monthlyElectricityBill: data.monthlyBill,
      interestedService: dynamicService,
      message: data.message,
      source: source,
    });

    if (success) {
      setLastSubmittedPhone(data.phone);
      reset({
        fullName: "",
        phone: "",
        email: "",
        location: "",
        monthlyBill: "₹2,500 – ₹4,000",
        propertyType: defaultPropertyType,
        website: "",
        message: "",
      });
    }
  };

  if (isSuccess) {
    return (
      <div
        id={id}
        className={`bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-[#BBF7D0] text-center ${className}`}
      >
        <div className="w-14 h-14 bg-[#DCFCE7] text-[#16A34A] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#BBF7D0] shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-black text-[#0F291E] mb-2 tracking-tight">
          Consultation Request Received!
        </h3>
        <p className="text-[#475569] mb-5 text-sm sm:text-base max-w-md mx-auto">
          Thank you for trusting <strong>{SITE_CONFIG.companyName}</strong>. Our qualified solar engineers will review your energy profile and reach out to{" "}
          <span className="font-extrabold text-[#0F291E]">+91 {lastSubmittedPhone}</span> shortly.
        </p>

        <div className="p-4 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl mb-6 text-left text-xs sm:text-sm text-[#0F291E]">
          <p className="font-bold mb-1.5 flex items-center gap-1.5 text-[#15803D]">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            What happens next:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[#475569]">
            <li>Preliminary rooftop viability & shadow analysis</li>
            <li>System capacity recommendation (3 kW to 50 kW scope)</li>
            <li>Transparent proposal with quality component specifications</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <WhatsAppButton
            message={`Hello Hardev Solar Services, I just submitted a consultation request for phone +91 ${lastSubmittedPhone}. Please connect with me.`}
            label="Chat on WhatsApp for Instant Connect"
            className="w-full sm:w-auto"
          />
          <button
            type="button"
            onClick={resetState}
            className="text-xs font-bold text-[#16A34A] hover:text-[#15803D] underline mt-2 sm:mt-0 cursor-pointer"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      id={id}
      className={`bg-white rounded-3xl shadow-xl shadow-[#16A34A]/8 border-2 border-[#DCFCE7] p-5 sm:p-8 md:p-9 ${className}`}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#DCFCE7] text-[#15803D] text-xs font-extrabold rounded-full mb-2.5 border border-[#BBF7D0]">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
          <span>Zero Obligation Rooftop Survey</span>
        </div>
        <h3 className="text-xl sm:text-3xl font-black text-[#0F291E] tracking-tight">
          Request a Quote from Hardev Solar Services
        </h3>
        <p className="text-[#475569] text-xs sm:text-sm mt-1.5 leading-relaxed">
          Fill in a few details and our solar team will calculate your rooftop potential and prepare a customized solar plan across Maharashtra.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3.5 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs sm:text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Anti-spam Honeypot field (hidden from genuine users) */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          style={{ display: "none" }}
          {...register("website")}
        />

        {/* Property Type (Optional) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0F291E]">
              Property Type <span className="text-[11px] font-normal text-[#64748B] normal-case">(Optional)</span>
            </label>
            <span className="text-[11px] font-bold text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded-md border border-[#DCFCE7]">
              {selectedPropertyType === "Commercial"
                ? "Commercial Solar"
                : selectedPropertyType === "Other"
                ? "General Consultation"
                : "Residential Solar"}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(["Residential", "Commercial", "Other"] as const).map((type) => {
              const isSelected = selectedPropertyType === type;
              return (
                <button
                  type="button"
                  key={type}
                  onClick={() => setValue("propertyType", type, { shouldValidate: true })}
                  className={`py-2 px-2.5 sm:px-3 rounded-xl text-xs sm:text-sm font-bold border text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? "bg-[#16A34A] text-white border-[#16A34A] shadow-md shadow-[#16A34A]/20 font-black"
                      : "bg-[#F0FDF4] text-[#0F291E] border-[#DCFCE7] hover:bg-[#DCFCE7]"
                  }`}
                >
                  {type === "Residential" && <Home className="w-3.5 h-3.5 shrink-0" />}
                  {type === "Commercial" && <Building2 className="w-3.5 h-3.5 shrink-0" />}
                  {type === "Other" && <Factory className="w-3.5 h-3.5 shrink-0" />}
                  <span>{type}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Full Name & Mobile Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="consult-fullName"
              className="block text-xs font-extrabold uppercase tracking-wider text-[#0F291E] mb-1.5"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#475569]">
                <User className="w-4 h-4" />
              </div>
              <input
                id="consult-fullName"
                type="text"
                placeholder="e.g. Rajesh Sharma"
                {...register("fullName")}
                className={`w-full pl-10 pr-3.5 py-2.5 bg-[#F0FDF4]/60 border rounded-xl text-xs sm:text-sm text-[#0F291E] placeholder:text-[#475569]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all ${
                  errors.fullName ? "border-red-400 bg-red-50/20" : "border-[#DCFCE7]"
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-[11px] text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label
              htmlFor="consult-phone"
              className="block text-xs font-extrabold uppercase tracking-wider text-[#0F291E] mb-1.5"
            >
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="relative flex">
              <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#DCFCE7] bg-[#DCFCE7] text-[#15803D] text-xs sm:text-sm font-bold">
                +91
              </span>
              <input
                id="consult-phone"
                type="tel"
                maxLength={10}
                placeholder="10-digit number"
                {...register("phone")}
                className={`w-full px-3 py-2.5 bg-[#F0FDF4]/60 border rounded-r-xl text-xs sm:text-sm text-[#0F291E] placeholder:text-[#475569]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all ${
                  errors.phone ? "border-red-400 bg-red-50/20" : "border-[#DCFCE7]"
                }`}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-[11px] text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* City / Location & Customer Email (Optional) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* City / Location */}
          <div>
            <label
              htmlFor="consult-location"
              className="block text-xs font-extrabold uppercase tracking-wider text-[#0F291E] mb-1.5"
            >
              City / Location <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#475569]">
                <MapPin className="w-4 h-4" />
              </div>
              <input
                id="consult-location"
                type="text"
                placeholder="e.g. Pune, Navi Mumbai, Nashik"
                {...register("location")}
                className={`w-full pl-10 pr-3.5 py-2.5 bg-[#F0FDF4]/60 border rounded-xl text-xs sm:text-sm text-[#0F291E] placeholder:text-[#475569]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all ${
                  errors.location ? "border-red-400 bg-red-50/20" : "border-[#DCFCE7]"
                }`}
              />
            </div>
            {errors.location && (
              <p className="mt-1 text-[11px] text-red-600">{errors.location.message}</p>
            )}
          </div>

          {/* Customer Email (Optional) */}
          <div>
            <label
              htmlFor="consult-email"
              className="block text-xs font-extrabold uppercase tracking-wider text-[#0F291E] mb-1.5"
            >
              Customer Email <span className="text-[11px] font-normal text-[#64748B] normal-case">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#475569]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="consult-email"
                type="email"
                placeholder="e.g. rajesh@example.com"
                {...register("email")}
                className={`w-full pl-10 pr-3.5 py-2.5 bg-[#F0FDF4]/60 border rounded-xl text-xs sm:text-sm text-[#0F291E] placeholder:text-[#475569]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all ${
                  errors.email ? "border-red-400 bg-red-50/20" : "border-[#DCFCE7]"
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-[11px] text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Monthly Electricity Bill */}
        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0F291E] mb-2">
            Monthly Electricity Bill
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {BILL_OPTIONS.map((opt, idx) => {
              const isSelected = selectedBill === opt;
              const isLastOdd = idx === BILL_OPTIONS.length - 1 && BILL_OPTIONS.length % 2 === 1;
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setValue("monthlyBill", opt, { shouldValidate: true })}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                    isLastOdd ? "col-span-2 sm:col-span-1" : ""
                  } ${
                    isSelected
                      ? "bg-[#16A34A] text-white border-[#16A34A] shadow-sm font-extrabold"
                      : "bg-[#F0FDF4] text-[#0F291E] border-[#DCFCE7] hover:bg-[#DCFCE7]"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Requirements / Questions */}
        <div>
          <label
            htmlFor="consult-message"
            className="block text-xs font-extrabold uppercase tracking-wider text-[#0F291E] mb-1.5"
          >
            Describe Your Requirements / Questions (Optional)
          </label>
          <div className="relative">
            <div className="absolute top-3 left-0 pl-3.5 flex items-start pointer-events-none text-[#475569]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <textarea
              id="consult-message"
              rows={3}
              placeholder="e.g. Roof type (RCC/sheet), space availability, 3kW-10kW requirement, battery backup or subsidy questions..."
              {...register("message")}
              className="w-full pl-10 pr-3.5 py-2.5 bg-[#F0FDF4]/60 border border-[#DCFCE7] rounded-xl text-xs sm:text-sm text-[#0F291E] placeholder:text-[#475569]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all resize-y"
            />
          </div>
          {errors.message && (
            <p className="mt-1 text-[11px] text-red-600">{errors.message.message}</p>
          )}
        </div>

        {/* Primary CTA */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534] text-white font-black rounded-xl text-sm sm:text-base shadow-lg shadow-[#16A34A]/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 group mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-white" />
              <span>Submitting Enquiry...</span>
            </>
          ) : (
            <>
              <span>Get My Solar Estimate</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {/* Small trust message */}
        <div className="pt-2 flex items-center justify-center gap-2 text-center text-xs text-[#475569]">
          <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
          <span>Your information is safe with us.</span>
        </div>

        {/* Direct Call / WhatsApp quick actions */}
        <div className="pt-3 border-t border-[#DCFCE7] flex items-center justify-between text-xs text-[#475569]">
          <a
            href={getPhoneCallUrl(SITE_CONFIG.phone)}
            className="inline-flex items-center gap-1.5 font-bold text-[#15803D] hover:underline"
          >
            <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Call: {SITE_CONFIG.displayPhone}</span>
          </a>
          <span className="text-[#86EFAC]">•</span>
          <span className="font-medium text-[#475569]">Response within 24h</span>
        </div>
      </form>
    </div>
  );
};
