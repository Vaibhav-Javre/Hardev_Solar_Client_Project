import React from "react";

export default function ProjectsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
      {/* Header skeleton */}
      <div className="max-w-2xl mb-12 space-y-4">
        <div className="w-40 h-6 bg-[#DCFCE7] rounded-full" />
        <div className="w-80 h-10 bg-[#DCFCE7] rounded-2xl" />
        <div className="w-full h-4 bg-[#F0FDF4] rounded-lg" />
      </div>

      {/* Filter tabs skeleton */}
      <div className="flex gap-3 mb-10">
        <div className="w-24 h-10 bg-[#DCFCE7] rounded-full" />
        <div className="w-28 h-10 bg-[#F0FDF4] rounded-full" />
        <div className="w-28 h-10 bg-[#F0FDF4] rounded-full" />
        <div className="w-28 h-10 bg-[#F0FDF4] rounded-full" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-3xl border-2 border-[#DCFCE7] p-5 space-y-4">
            <div className="h-48 rounded-2xl bg-[#DCFCE7]" />
            <div className="w-3/4 h-6 bg-[#DCFCE7] rounded-lg" />
            <div className="w-1/2 h-4 bg-[#F0FDF4] rounded-lg" />
            <div className="w-full h-10 bg-[#F0FDF4] rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
