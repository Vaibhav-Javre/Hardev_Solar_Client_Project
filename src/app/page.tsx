import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustStatsSection } from "@/components/home/TrustStatsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { SolutionsSection } from "@/components/home/SolutionsSection";
import { CapacityScaleSection } from "@/components/home/CapacityScaleSection";
import { QualitySection } from "@/components/home/QualitySection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { ProjectsPreviewSection } from "@/components/home/ProjectsPreviewSection";
import { SolarEstimator } from "@/components/home/SolarEstimator";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { TestimonialsSection } from "@/components/home/TestimonialsPlaceholderSection";
import { FAQSection } from "@/components/home/FAQSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";
import { ShieldCheck, Phone, CheckCircle2, Sun, Sparkles } from "lucide-react";
import { COMPANY_CONFIG } from "@/data/companyConfig";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section (Conversion focused, exact headlines & CTAs) */}
      <HeroSection />

      {/* 2. Trust / Company Highlights Banner */}
      <TrustStatsSection />

      {/* 3. Consultation / Lead Form Section */}
      <section id="consultation" className="py-16 lg:py-24 bg-[#F0FDF4] border-b border-[#DCFCE7] relative scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Reassurance, Quality & Direct Engineering Helpline */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DCFCE7] text-[#15803D] text-xs font-extrabold rounded-full uppercase tracking-wider border border-[#BBF7D0] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Zero Obligation Rooftop Assessment</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F291E] tracking-tight leading-tight">
                Request a Quote from <span className="text-[#16A34A]">Hardev Solar Services</span>
              </h2>

              <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
                Whether for your home, commercial property, or industrial project, Hardev Solar Services delivers solar solutions tailored to your needs across Maharashtra.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3 p-3.5 bg-white rounded-2xl border border-[#DCFCE7] shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0 border border-[#BBF7D0]">
                    <Sun className="w-5 h-5 text-[#F59E0B]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0F291E]">Customized Solar Analysis</h4>
                    <p className="text-xs text-[#475569] mt-0.5">Accurate rooftop evaluation and tailored system capacity planning.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-white rounded-2xl border border-[#DCFCE7] shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0 border border-[#BBF7D0]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0F291E]">Quality Hardware Standards</h4>
                    <p className="text-xs text-[#475569] mt-0.5">Reliable solar modules, certified inverters, and heavy-duty structural mountings.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-white rounded-2xl border border-[#DCFCE7] shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0 border border-[#BBF7D0]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0F291E]">Direct Solar Helpline</h4>
                    <p className="text-xs text-[#475569] mt-0.5">Call {COMPANY_CONFIG.contact.displayPhone} during business hours.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-xs font-semibold text-[#15803D] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <span>Solar solutions available across Maharashtra</span>
              </div>
            </div>

            {/* Right Column: Dedicated Consultation Form */}
            <div className="lg:col-span-7">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>

      {/* 4. About Hardev Solar Services */}
      <AboutSection />

      {/* 5. Why Choose Us (6 Feature Cards: 01 to 06) */}
      <WhyChooseSection />

      {/* 6. Solar Solutions */}
      <SolutionsSection />

      {/* 7. Project Capacity Visual Scale */}
      <CapacityScaleSection />

      {/* 8. Our Installation Process */}
      <HowItWorksSection />

      {/* 9. Quality Materials */}
      <QualitySection />

      {/* 10. Solar Benefits */}
      <BenefitsSection />

      {/* 11. Project Gallery */}
      <ProjectsPreviewSection />

      {/* 12. Solar Savings Estimator */}
      <SolarEstimator />

      {/* 13. Testimonials */}
      <TestimonialsSection />

      {/* 14. FAQ Accordion */}
      <FAQSection />

      {/* 15. Final CTA */}
      <FinalCTASection />
    </>
  );
}
