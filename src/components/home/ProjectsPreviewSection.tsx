"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, ArrowRight, Sun, Sparkles, Image as ImageIcon } from "lucide-react";
import { PROJECTS_DATA, ProjectCardData, ProjectCategory } from "@/data/projectsData";
import { scrollToQuote } from "@/lib/quoteNavigation";

export const ProjectsGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const filtered =
    activeCategory === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 lg:py-28 bg-[#F0FDF4]/40 border-b border-[#DCFCE7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DCFCE7] border border-[#BBF7D0] text-[#15803D] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Project Experience Gallery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F291E] tracking-tight">
              Our Solar Projects
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#475569] leading-relaxed">
              Explore our project scope across residential terraces and commercial rooftops. Every installation is built with structural safety and certified balance-of-system hardware.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#F0FDF4] text-[#16A34A] font-extrabold text-sm border-2 border-[#DCFCE7] hover:border-[#86EFAC] transition-all shadow-xs group shrink-0"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 text-[#16A34A] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Filter Tabs: All, Residential, Commercial, Rooftop */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10">
          {(["All", "Residential", "Commercial", "Rooftop"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#16A34A] text-white shadow-md shadow-[#16A34A]/20 border-2 border-[#86EFAC]"
                  : "bg-white text-[#0F291E] hover:bg-[#DCFCE7] border border-[#DCFCE7]"
              }`}
            >
              {cat === "All" ? "All Projects" : `${cat}`}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project: ProjectCardData) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl border-2 border-[#DCFCE7] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#16A34A]/10 hover:border-[#86EFAC] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Project Image with Glassmorphic Badges */}
                <div className="relative h-60 overflow-hidden text-white bg-slate-900 group">
                  {project.imageSrc ? (
                    <img
                      src={project.imageSrc}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#16A34A] to-[#065F46]" />
                  )}

                  {/* Gradient Overlay for Crisp Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30 pointer-events-none" />

                  {/* Badges and Info */}
                  <div className="relative z-10 p-4 sm:p-5 h-full flex flex-col justify-between">
                    {/* Top Badges */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[#FEF08A] border border-white/30 shadow-xs">
                        {project.category}
                      </span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[#DCFCE7] border border-white/20">
                        3 kW to 50 kW Scope
                      </span>
                    </div>

                    {/* Bottom System Capacity */}
                    <div className="flex items-end justify-between border-t border-white/20 pt-2.5">
                      <div className="flex items-baseline gap-1.5 text-white">
                        <span className="text-2xl font-black text-[#FACC15] font-mono drop-shadow-md">
                          {project.systemCapacity}
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#DCFCE7] drop-shadow-xs">
                          System Capacity
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-white/95 bg-black/40 px-2.5 py-0.5 rounded-full backdrop-blur-xs border border-white/10">
                        On-Grid System
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Body: Title, Location, Scope */}
                <div className="p-6">
                  <h3 className="font-black text-[#0F291E] text-lg mb-2 group-hover:text-[#16A34A] transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-[#475569] font-medium mb-3">
                    <MapPin className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                    <span>{project.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {project.scopeSummary}
                  </p>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="p-6 pt-0">
                <a
                  href="/#consultation"
                  onClick={scrollToQuote}
                  className="w-full py-2.5 px-4 rounded-xl border-2 border-[#DCFCE7] hover:border-[#16A34A] hover:bg-[#F0FDF4] text-[#15803D] text-xs sm:text-sm font-extrabold text-center block transition-all cursor-pointer"
                >
                  Request Similar Installation
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Client Notice */}
        <div className="mt-12 text-center text-xs text-[#475569] max-w-xl mx-auto bg-white py-3 px-6 rounded-2xl border border-[#DCFCE7] shadow-xs">
          * Representative installation profiles. Actual rooftop photography from Hardev Solar Services client installations can be populated in this gallery.
        </div>
      </div>
    </section>
  );
};

export const ProjectsPreviewSection = ProjectsGallery;
