import React from "react";
import Link from "next/link";
import { SITE_CONFIG, getWhatsAppUrl, getPhoneCallUrl, getSecondaryPhoneCallUrl } from "@/lib/site-config";
import {
  Sun,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { Logo } from "@/components/ui/Logo";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F0FDF4] text-[#0F291E] pt-16 pb-12 border-t-2 border-[#DCFCE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#DCFCE7]">
          {/* Section 1: Hardev Solar Services (Brand Column) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <Logo className="h-12 sm:h-14 w-auto group-hover:opacity-95 transition-opacity" />
            </Link>

            <p className="text-[#475569] text-sm leading-relaxed max-w-sm">
              Hardev Solar Services provides tailored solar solutions for residential, commercial, and industrial requirements across Maharashtra. In partnership with Swayam Infraverse, we deliver reliable solar installations designed for long-term performance.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#BBF7D0] text-[#15803D] font-bold shadow-xs">
                <Zap className="w-3.5 h-3.5 fill-[#16A34A] text-[#16A34A]" /> Solar Systems & Thermal
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#BBF7D0] text-[#15803D] font-semibold shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" /> Maharashtra Coverage
              </span>
            </div>
          </div>

          {/* Section 2: About Us */}
          <div>
            <h3 className="text-[#0F291E] font-black text-sm tracking-wider uppercase mb-4">
              About Us
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
              <li>
                <Link href="/about" className="hover:text-[#16A34A] transition-colors font-medium">
                  Who We Are
                </Link>
              </li>
              <li>
                <Link href="/about#our-approach" className="hover:text-[#16A34A] transition-colors font-medium">
                  Our Approach
                </Link>
              </li>
              <li>
                <Link href="/about#partnership" className="hover:text-[#16A34A] transition-colors font-medium">
                  Swayam Infraverse Partnership
                </Link>
              </li>
              <li>
                <Link href="/about#maharashtra-coverage" className="hover:text-[#16A34A] transition-colors font-medium">
                  Maharashtra Coverage
                </Link>
              </li>
              <li>
                <Link href="/#why-choose" className="hover:text-[#16A34A] transition-colors font-medium">
                  Why Choose Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Solar Solutions */}
          <div>
            <h3 className="text-[#0F291E] font-black text-sm tracking-wider uppercase mb-4">
              Solar Services
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
              <li>
                <Link
                  href="/services#solar-system-installation"
                  className="hover:text-[#16A34A] transition-colors font-medium"
                >
                  Solar System Installation
                </Link>
              </li>
              <li>
                <Link
                  href="/services#on-grid-solar"
                  className="hover:text-[#16A34A] transition-colors font-medium"
                >
                  On-Grid Solar Systems
                </Link>
              </li>
              <li>
                <Link
                  href="/services#off-grid-solar"
                  className="hover:text-[#16A34A] transition-colors font-medium"
                >
                  Off-Grid Solar Systems
                </Link>
              </li>
              <li>
                <Link
                  href="/services#solar-water-heaters"
                  className="hover:text-[#16A34A] transition-colors font-medium"
                >
                  Solar Water Heaters
                </Link>
              </li>
              <li>
                <Link
                  href="/services#utility-scale-solar"
                  className="hover:text-[#16A34A] transition-colors font-medium"
                >
                  Utility-Scale Solar Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/solar-calculator"
                  className="hover:text-[#16A34A] transition-colors font-medium"
                >
                  Solar Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 4: Contact & Support */}
          <div>
            <h3 className="text-[#0F291E] font-black text-sm tracking-wider uppercase mb-4">
              Contact & Support
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-[#475569]">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#16A34A] mt-1 shrink-0" />
                <div>
                  <a
                    href={getPhoneCallUrl(SITE_CONFIG.primaryPhone)}
                    className="text-[#0F291E] font-bold hover:text-[#16A34A]"
                  >
                    {SITE_CONFIG.displayPrimaryPhone}
                  </a>
                  <div className="text-[11px] text-[#15803D]">Primary: {SITE_CONFIG.contactName}</div>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#16A34A] mt-1 shrink-0" />
                <div>
                  <a
                    href={getSecondaryPhoneCallUrl()}
                    className="text-[#0F291E] font-bold hover:text-[#16A34A]"
                  >
                    {SITE_CONFIG.displaySecondaryPhone}
                  </a>
                  <div className="text-[11px] text-[#15803D]">Alternative Contact</div>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#16A34A] mt-1 shrink-0" />
                <div>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#16A34A] hover:text-[#15803D] hover:underline font-bold"
                  >
                    WhatsApp Chat Support
                  </a>
                  <div className="text-[11px] text-[#15803D]">Quick consultation</div>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#16A34A] mt-1 shrink-0" />
                <div className="break-all">
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-[#0F291E] font-medium hover:text-[#16A34A]"
                  >
                    {SITE_CONFIG.email}
                  </a>
                  <div className="text-[11px] text-[#15803D]">Email inquiries</div>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#16A34A] mt-1 shrink-0" />
                <div>
                  <div className="text-[#0F291E] font-medium leading-snug">
                    {SITE_CONFIG.address}
                  </div>
                  <div className="text-[11px] text-[#475569]">
                    Nashik, Maharashtra
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-2.5 text-[11px] text-[#475569] pt-1">
                <Clock className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip: Hardev Solar Services, in partnership with Swayam Infraverse */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#475569]">
          <div>
            © {new Date().getFullYear()} Hardev Solar Services, in partnership with Swayam Infraverse. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/faq" className="hover:text-[#16A34A] transition-colors">
              FAQ
            </Link>
            <span className="text-[#86EFAC]">•</span>
            <Link href="/contact" className="hover:text-[#16A34A] transition-colors">
              Contact
            </Link>
            <span className="text-[#86EFAC]">•</span>
            <Link href="/services" className="hover:text-[#16A34A] transition-colors">
              Services
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 pt-4 border-t border-[#DCFCE7] text-[11px] text-[#475569] text-center">
          * Notice: System generation and savings depend on physical site inspection, roof orientation, shadow profile, and local electrical utility norms. Hardev Solar Services does not claim guaranteed savings.
        </div>
      </div>
    </footer>
  );
};
