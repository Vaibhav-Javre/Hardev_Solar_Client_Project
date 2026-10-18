"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Sun } from "lucide-react";
import { getWhatsAppUrl } from "@/data/companyConfig";
import { scrollToQuote } from "@/lib/quoteNavigation";

export const StickyMobileCTA: React.FC = () => {
  const pathname = usePathname();

  // Handle incoming hash on page load or client-side navigation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkAndScroll = () => {
      const hash = window.location.hash;
      if (hash === "#consultation" || hash === "#hero-consultation") {
        setTimeout(() => {
          scrollToQuote();
        }, 200);
      }
    };

    checkAndScroll();
    window.addEventListener("hashchange", checkAndScroll);
    return () => window.removeEventListener("hashchange", checkAndScroll);
  }, [pathname]);

  // Do not render sticky mobile contact buttons in the admin portal
  if (pathname?.startsWith("/admin")) return null;

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

        {/* Get Free Quote Button - Guaranteed to scroll & focus every single click */}
        <a
          href="/#consultation"
          onClick={scrollToQuote}
          className="flex items-center justify-center gap-1.5 py-3 px-3 bg-[#0F291E] hover:bg-[#15803D] active:bg-[#166534] text-white font-extrabold rounded-xl text-xs sm:text-sm text-center shadow-md border border-[#BBF7D0]/30 transition-colors cursor-pointer"
        >
          <Sun className="w-4 h-4 text-[#FACC15] fill-[#FACC15]" />
          <span>Get Free Quote</span>
        </a>
      </div>
    </aside>
  );
};
