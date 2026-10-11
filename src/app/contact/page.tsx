"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFormSchema, LeadFormInput } from "@/lib/validations/lead";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Send,
  MessageCircle,
  User,
  HeartHandshake,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  SITE_CONFIG,
  getWhatsAppUrl,
  getPhoneCallUrl,
  getSecondaryPhoneCallUrl,
} from "@/lib/site-config";
import { useLeadSubmit } from "@/lib/useLeadSubmit";

const BILL_OPTIONS = [
  "Below ₹1,500",
  "₹1,500 – ₹2,500",
  "₹2,500 – ₹4,000",
  "₹4,000 – ₹8,000",
  "Above ₹8,000",
];

export default function ContactPage() {
  const [submittedPhone, setSubmittedPhone] = useState("");

  const {
    submitLead,
    isSubmitting,
    isSuccess,
    errorMessage,
    resetState,
  } = useLeadSubmit({
    defaultSource: "contact_page",
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
      propertyType: "Residential",
      monthlyBill: "₹2,500 – ₹4,000",
      message: "",
      website: "",
    },
  });

  const selectedPropertyType = watch("propertyType");
  const selectedBill = watch("monthlyBill");

  const onSubmit = async (data: LeadFormInput) => {
    const success = await submitLead({
      ...data,
      city: data.location,
      monthlyElectricityBill: data.monthlyBill,
      interestedService: `${data.propertyType} Solar`,
      source: "contact_page",
    });

    if (success) {
      setSubmittedPhone(data.phone);
      reset();
    }
  };

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Contact" }]} />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#F0FDF4] via-white to-[#F0FDF4] text-[#0F291E] py-14 sm:py-20 border-b border-[#DCFCE7] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DCFCE7]/60 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 shadow-xs">
              <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Hardev Solar Services × Swayam Infraverse</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F291E] mb-6 leading-tight">
              Contact <span className="text-[#16A34A]">Hardev Solar Services</span>
            </h1>

            <p className="text-[#475569] text-base sm:text-xl leading-relaxed">
              Have questions about solar system installation, on-grid or off-grid systems, solar water heaters, or utility-scale projects? We provide solar solutions tailored to your needs across Maharashtra.
            </p>
          </div>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-2xl font-black text-[#0F291E] tracking-tight mb-2">
                  Contact Information
                </h2>
                <p className="text-[#475569] text-sm leading-relaxed">
                  Reach out directly via phone, WhatsApp, or email during our business hours.
                </p>
              </div>

              <div className="space-y-4">
                {/* Primary Contact Person */}
                <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#16A34A] flex items-center justify-center shrink-0 border border-[#BBF7D0] shadow-xs">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#15803D] block">
                      Primary Contact
                    </span>
                    <span className="text-[#0F291E] font-bold text-sm sm:text-base">
                      {SITE_CONFIG.contactName}
                    </span>
                    <span className="text-[11px] text-[#475569] block mt-0.5">
                      Hardev Solar Services
                    </span>
                  </div>
                </div>

                {/* Primary Phone */}
                <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#16A34A] flex items-center justify-center shrink-0 border border-[#BBF7D0] shadow-xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#15803D] block">
                      Primary Phone
                    </span>
                    <a
                      href={getPhoneCallUrl(SITE_CONFIG.primaryPhone)}
                      className="text-[#0F291E] font-bold text-sm sm:text-base hover:text-[#16A34A] transition-colors"
                    >
                      {SITE_CONFIG.displayPrimaryPhone}
                    </a>
                    <span className="text-[11px] text-[#475569] block mt-0.5">
                      Direct customer consultation
                    </span>
                  </div>
                </div>

                {/* Secondary Phone */}
                <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#16A34A] flex items-center justify-center shrink-0 border border-[#BBF7D0] shadow-xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#15803D] block">
                      Alternative Phone
                    </span>
                    <a
                      href={getSecondaryPhoneCallUrl()}
                      className="text-[#0F291E] font-bold text-sm sm:text-base hover:text-[#16A34A] transition-colors"
                    >
                      {SITE_CONFIG.displaySecondaryPhone}
                    </a>
                    <span className="text-[11px] text-[#475569] block mt-0.5">
                      Alternative contact line
                    </span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#16A34A] flex items-center justify-center shrink-0 border border-[#BBF7D0] shadow-xs">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#15803D] block">
                      WhatsApp Support
                    </span>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0F291E] font-bold text-sm sm:text-base hover:text-[#16A34A] transition-colors"
                    >
                      +91 {SITE_CONFIG.primaryPhone}
                    </a>
                    <span className="text-[11px] text-[#475569] block mt-0.5">
                      Quick chat & consultation
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#16A34A] flex items-center justify-center shrink-0 border border-[#BBF7D0] shadow-xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#15803D] block">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="text-[#0F291E] font-bold text-sm sm:text-base hover:text-[#16A34A] transition-colors break-all"
                    >
                      {SITE_CONFIG.email}
                    </a>
                    <span className="text-[11px] text-[#475569] block mt-0.5">
                      Enquiries & solar proposals
                    </span>
                  </div>
                </div>

                {/* Address */}
                <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#16A34A] flex items-center justify-center shrink-0 border border-[#BBF7D0] shadow-xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#15803D] block">
                      Office Address
                    </span>
                    <p className="text-[#0F291E] font-bold text-xs sm:text-sm">
                      {SITE_CONFIG.address}
                    </p>
                    <span className="text-[11px] text-[#475569] block mt-0.5">
                      Service Area: {SITE_CONFIG.serviceArea}
                    </span>
                  </div>
                </div>

                {/* Partnership Note */}
                <div className="p-4 rounded-2xl bg-white border border-[#DCFCE7] flex items-start gap-3.5 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0 border border-[#BBF7D0]">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#15803D] block">
                      Business Partnership
                    </span>
                    <p className="text-xs text-[#475569] mt-0.5">
                      In partnership with <strong>Swayam Infraverse</strong> for comprehensive solar project delivery across Maharashtra.
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#16A34A] flex items-center justify-center shrink-0 border border-[#BBF7D0] shadow-xs">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#15803D] block">
                      Business Hours
                    </span>
                    <p className="text-[#0F291E] font-bold text-xs sm:text-sm">
                      {SITE_CONFIG.workingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Call & WhatsApp Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={getPhoneCallUrl(SITE_CONFIG.primaryPhone)}
                  className="w-full sm:w-auto flex-1 py-3 px-4 bg-white hover:bg-[#F0FDF4] text-[#0F291E] font-bold text-xs sm:text-sm rounded-xl border border-[#BBF7D0] shadow-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#16A34A]" />
                  <span>Call Us Now</span>
                </a>

                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 py-3 px-4 bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-[#16A34A]" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-9 border-2 border-[#DCFCE7] shadow-xl shadow-[#16A34A]/5">
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-black text-[#0F291E] tracking-tight">
                  Send an Enquiry to Hardev Solar Services
                </h2>
                <p className="text-[#475569] text-xs sm:text-sm mt-1 leading-relaxed">
                  Share your location and energy requirements. Our solar team will review your enquiry and connect with you.
                </p>
              </div>

              {/* Success Message Banner */}
              {isSuccess && (
                <div className="mb-6 p-5 bg-[#F0FDF4] border-2 border-[#BBF7D0] rounded-2xl text-center">
                  <CheckCircle2 className="w-8 h-8 text-[#16A34A] mx-auto mb-2" />
                  <h3 className="font-extrabold text-[#0F291E] text-base mb-1">
                    Thank you! Your enquiry has been received by Hardev Solar Services.
                  </h3>
                  <p className="text-xs text-[#475569] mb-4">
                    Our solar team will review your request shortly
                    {submittedPhone ? ` and contact you at +91 ${submittedPhone}.` : "."}
                  </p>
                  <button
                    type="button"
                    onClick={resetState}
                    className="text-xs font-bold text-[#16A34A] hover:text-[#15803D] underline cursor-pointer"
                  >
                    Send another enquiry
                  </button>
                </div>
              )}

              {/* Error Message Banner */}
              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-xs sm:text-sm text-red-700">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                {/* Honeypot field for bot spam */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  style={{ display: "none" }}
                  {...register("website")}
                />

                {/* Property Type Radio Selector */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0F291E] mb-2">
                    Property Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Residential", "Commercial", "Other"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setValue("propertyType", type as any)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          selectedPropertyType === type
                            ? "bg-[#16A34A] text-white border-[#16A34A] shadow-xs"
                            : "bg-[#F0FDF4]/50 text-[#0F291E] border-[#DCFCE7] hover:bg-[#DCFCE7]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label htmlFor="contact-fullName" className="block text-xs font-bold text-[#0F291E] mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-fullName"
                    type="text"
                    placeholder="Enter your name"
                    {...register("fullName")}
                    className={`w-full px-3.5 py-2.5 bg-[#F0FDF4]/60 border rounded-xl text-xs sm:text-sm text-[#0F291E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all ${
                      errors.fullName ? "border-red-400" : "border-[#DCFCE7]"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-bold text-[#0F291E] mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#475569]">
                        +91
                      </span>
                      <input
                        id="contact-phone"
                        type="tel"
                        maxLength={10}
                        placeholder="10-digit number"
                        {...register("phone")}
                        className={`w-full pl-11 pr-3.5 py-2.5 bg-[#F0FDF4]/60 border rounded-xl text-xs sm:text-sm text-[#0F291E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all ${
                          errors.phone ? "border-red-400" : "border-[#DCFCE7]"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-[#0F291E] mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="your.email@example.com"
                      {...register("email")}
                      className={`w-full px-3.5 py-2.5 bg-[#F0FDF4]/60 border rounded-xl text-xs sm:text-sm text-[#0F291E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all ${
                        errors.email ? "border-red-400" : "border-[#DCFCE7]"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Location / City */}
                <div>
                  <label htmlFor="contact-location" className="block text-xs font-bold text-[#0F291E] mb-1">
                    City / Town (in Maharashtra) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-location"
                    type="text"
                    placeholder="e.g. Nashik, Pune, Mumbai, etc."
                    {...register("location")}
                    className={`w-full px-3.5 py-2.5 bg-[#F0FDF4]/60 border rounded-xl text-xs sm:text-sm text-[#0F291E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all ${
                      errors.location ? "border-red-400" : "border-[#DCFCE7]"
                    }`}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>
                  )}
                </div>

                {/* Monthly Electricity Bill Range */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0F291E] mb-2">
                    Approx. Monthly Electricity Bill
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {BILL_OPTIONS.map((bill) => (
                      <button
                        key={bill}
                        type="button"
                        onClick={() => setValue("monthlyBill", bill)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                          selectedBill === bill
                            ? "bg-[#16A34A] text-white border-[#16A34A] shadow-xs"
                            : "bg-[#F0FDF4]/50 text-[#0F291E] border-[#DCFCE7] hover:bg-[#DCFCE7]"
                        }`}
                      >
                        {bill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-[#0F291E] mb-1">
                    Project Requirements / Notes
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    placeholder="Tell us about your rooftop area, solar type (on-grid, off-grid, solar water heater), or power goals..."
                    {...register("message")}
                    className="w-full px-3.5 py-2.5 bg-[#F0FDF4]/60 border border-[#DCFCE7] rounded-xl text-xs sm:text-sm text-[#0F291E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534] text-white font-black rounded-xl text-sm sm:text-base shadow-lg shadow-[#16A34A]/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-white" />
                      <span>Send Enquiry to Hardev Solar Services</span>
                    </>
                  )}
                </button>

                <div className="pt-2 text-center text-xs text-[#475569] flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                  <span>Your information is safe with us. We respect your privacy.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
