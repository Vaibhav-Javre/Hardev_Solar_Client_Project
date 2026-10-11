import React from "react";
import Link from "next/link";
import { Sun, Home, ArrowRight, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-[#F0FDF4] via-white to-[#F0FDF4] px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Visual Eco-Solar Graphic */}
        <div className="relative mx-auto w-24 h-24 rounded-3xl bg-[#DCFCE7] border-2 border-[#BBF7D0] flex items-center justify-center text-[#16A34A] shadow-lg shadow-[#16A34A]/10 animate-solar-pulse">
          <Sun className="w-12 h-12 stroke-[2.2] text-[#F59E0B]" />
          <Sparkles className="w-5 h-5 absolute -top-1 -right-1 text-[#16A34A]" />
        </div>

        {/* 404 Badge */}
        <div className="inline-block px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] text-xs font-black uppercase tracking-wider">
          Error 404
        </div>

        {/* Message */}
        <h1 className="text-3xl sm:text-4xl font-black text-[#0F291E] tracking-tight">
          Looks like this page went off-grid.
        </h1>

        {/* Supporting text */}
        <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
          The page you&apos;re looking for could not be found. It may have been moved, renamed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-3 bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534] text-white font-extrabold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            href="/services"
            className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-[#F0FDF4] text-[#0F291E] font-extrabold rounded-xl text-sm border-2 border-[#DCFCE7] hover:border-[#86EFAC] shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <span>Browse Services</span>
            <ArrowRight className="w-4 h-4 text-[#16A34A]" />
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto px-5 py-3 bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#15803D] font-extrabold rounded-xl text-sm border border-[#BBF7D0] transition-all flex items-center justify-center gap-2"
          >
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
