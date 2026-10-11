import React from "react";
import { Sun } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-white text-[#0F291E]">
      <div className="relative mb-4">
        <div className="w-16 h-16 rounded-2xl bg-[#DCFCE7] border border-[#BBF7D0] flex items-center justify-center text-[#16A34A] animate-pulse">
          <Sun className="w-8 h-8 text-[#F59E0B] animate-spin-slow" />
        </div>
        <div className="absolute -inset-1 rounded-2xl bg-[#86EFAC]/40 blur-md pointer-events-none" />
      </div>
      <p className="text-sm font-extrabold text-[#0F291E] tracking-wide">
        Loading Hardev Solar Services...
      </p>
      <p className="text-xs text-[#475569] mt-1">
        Powering your clean solar energy experience
      </p>
    </div>
  );
}
