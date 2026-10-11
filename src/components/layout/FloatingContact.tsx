"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { COMPANY_CONFIG, getWhatsAppUrl, getPhoneCallUrl } from "@/data/companyConfig";

export const FloatingContact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating buttons after user scrolls 150px
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Quick contact actions"
      className="hidden lg:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 pointer-events-auto"
    >
      {/* Call Us Button */}
      <a
        href={getPhoneCallUrl(COMPANY_CONFIG.contact.phone)}
        className="group flex items-center gap-2.5 px-4 py-2.5 bg-white text-[#0F291E] hover:text-[#16A34A] rounded-full shadow-lg border-2 border-[#BBF7D0] hover:border-[#16A34A] transition-all duration-200 cursor-pointer"
        title={`Call Us at ${COMPANY_CONFIG.contact.displayPhone}`}
      >
        <div className="w-8 h-8 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center group-hover:scale-105 transition-transform">
          <Phone className="w-4 h-4" />
        </div>
        <span className="text-xs font-bold pr-1">Call Us</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-full shadow-xl shadow-[#16A34A]/25 border border-[#86EFAC]/40 transition-all duration-200 cursor-pointer"
        title="Chat with Our Engineers on WhatsApp"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
          <MessageCircle className="w-4 h-4 fill-white" />
        </div>
        <span className="text-xs font-extrabold pr-1">WhatsApp</span>
      </a>
    </aside>
  );
};
