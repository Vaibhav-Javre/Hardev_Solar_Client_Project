"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage, LANGUAGES, Language } from "@/context/LanguageContext";

interface LanguageSelectorProps {
  variant?: "topbar" | "navbar" | "mobile" | "footer";
  className?: string;
}

export function LanguageSelector({
  variant = "navbar",
  className = "",
}: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeLangInfo =
    LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  // Mobile horizontal tabs layout
  if (variant === "mobile") {
    return (
      <div className={`space-y-1.5 ${className}`}>
        <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#64748B]">
          <Globe className="w-3.5 h-3.5 text-[#16A34A]" />
          <span>Language / भाषा</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {LANGUAGES.map((item) => {
            const isSelected = item.code === language;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => handleSelect(item.code)}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                  isSelected
                    ? "bg-[#16A34A] text-white border-[#16A34A] shadow-sm font-extrabold"
                    : "bg-[#F0FDF4] text-[#0F291E] border-[#DCFCE7] hover:bg-[#DCFCE7]"
                }`}
              >
                <span>{item.flag}</span>
                <span>{item.nativeName}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Topbar compact styling
  if (variant === "topbar") {
    return (
      <div className={`relative ${className}`} ref={containerRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0F291E] hover:text-[#16A34A] bg-[#DCFCE7]/60 hover:bg-[#DCFCE7] px-2 py-0.5 rounded-lg border border-[#BBF7D0] transition-colors cursor-pointer"
          aria-label="Select Language"
          aria-expanded={isOpen}
        >
          <Globe className="w-3 h-3 text-[#16A34A]" />
          <span>{activeLangInfo.nativeName}</span>
          <ChevronDown className="w-2.5 h-2.5 text-[#475569]" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-xl shadow-lg border border-[#DCFCE7] p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
            {LANGUAGES.map((item) => {
              const isSelected = item.code === language;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => handleSelect(item.code)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#F0FDF4] text-[#16A34A]"
                      : "text-[#0F291E] hover:bg-[#F8FAFC]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.flag}</span>
                    <span>{item.nativeName}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#16A34A]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Navbar default dropdown
  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold text-[#0F291E] bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#DCFCE7] transition-all cursor-pointer shadow-2xs hover:shadow-xs"
        aria-label="Change Language"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-[#16A34A]" />
        <span>{activeLangInfo.flag}</span>
        <span>{activeLangInfo.nativeName}</span>
        <ChevronDown
          className={`w-3 h-3 text-[#64748B] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-[#DCFCE7] p-2 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1">
          <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#64748B] border-b border-[#F0FDF4]">
            Select Language / भाषा
          </div>
          {LANGUAGES.map((item) => {
            const isSelected = item.code === language;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => handleSelect(item.code)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#16A34A] text-white shadow-xs font-black"
                    : "text-[#0F291E] hover:bg-[#F0FDF4] hover:text-[#16A34A]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">{item.flag}</span>
                  <div className="text-left">
                    <div className="leading-none">{item.nativeName}</div>
                    <div
                      className={`text-[10px] mt-0.5 ${
                        isSelected ? "text-white/80" : "text-[#64748B]"
                      }`}
                    >
                      {item.name}
                    </div>
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-white" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
