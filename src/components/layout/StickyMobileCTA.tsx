"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Sun } from "lucide-react";
import { getWhatsAppUrl } from "@/data/companyConfig";

export const StickyMobileCTA: React.FC = () => {
  return (
    <aside
      aria-label="Mobile quick actions"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-[#DCFCE7] p-2.5 shadow-2xl safe-area-bottom"
    >
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        {/* WhatsApp Button */}
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-3 bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534] text-white font-extrabold rounded-xl text-xs sm:text-sm text-center shadow-md border border-[#86EFAC]/40 transition-colors"
        >
          <MessageCircle className="w-4 h-4 fill-white text-[#16A34A]" />
          <span>WhatsApp</span>
        </a>

        {/* Get Free Quote Button */}
        <Link
          href="#consultation"
          className="flex items-center justify-center gap-1.5 py-3 px-3 bg-[#0F291E] hover:bg-[#15803D] active:bg-[#166534] text-white font-extrabold rounded-xl text-xs sm:text-sm text-center shadow-md border border-[#BBF7D0]/30 transition-colors"
        >
          <Sun className="w-4 h-4 text-[#FACC15] fill-[#FACC15]" />
          <span>Get Free Quote</span>
        </Link>
      </div>
    </aside>
  );
};
