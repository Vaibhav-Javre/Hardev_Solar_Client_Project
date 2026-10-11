"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log technical error internally for development without exposing to user
    console.error("[Application Error Captured]:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-[#F0FDF4] p-8 sm:p-10 rounded-3xl border-2 border-[#DCFCE7] shadow-lg">
        <div className="w-14 h-14 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mx-auto border border-[#BBF7D0]">
          <AlertCircle className="w-8 h-8 text-[#16A34A]" />
        </div>

        <div>
          <h2 className="text-2xl font-black text-[#0F291E] tracking-tight mb-2">
            Unable to load this content right now.
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            A temporary issue occurred while loading this section. Please try again or return to the homepage.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-[#DCFCE7] text-[#0F291E] font-bold rounded-xl text-xs sm:text-sm border border-[#DCFCE7] transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-[#16A34A]" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
