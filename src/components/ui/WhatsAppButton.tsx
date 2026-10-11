import React from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/site-config";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  variant?: "solid" | "outline" | "pill";
  label?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message,
  className = "",
  variant = "solid",
  label = "WhatsApp Us",
}) => {
  const url = getWhatsAppUrl(message);

  if (variant === "pill") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={`inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534] text-white font-bold px-4 py-2 rounded-full text-sm shadow-md hover:shadow-lg transition-all duration-200 border border-[#FACC15]/30 ${className}`}
      >
        <MessageCircle className="w-4 h-4 text-[#DCFCE7]" />
        <span>{label}</span>
      </a>
    );
  }

  if (variant === "outline") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={`inline-flex items-center justify-center gap-2 border-2 border-[#16A34A] text-[#15803D] hover:bg-[#F0FDF4] active:bg-[#DCFCE7] font-bold px-5 py-2.5 rounded-xl text-sm sm:text-base transition-all duration-200 ${className}`}
      >
        <MessageCircle className="w-5 h-5 text-[#16A34A]" />
        <span>{label}</span>
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`inline-flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534] text-white font-bold px-5 py-2.5 rounded-xl text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 border border-[#FACC15]/30 ${className}`}
    >
      <MessageCircle className="w-5 h-5 text-[#DCFCE7]" />
      <span>{label}</span>
    </a>
  );
};
