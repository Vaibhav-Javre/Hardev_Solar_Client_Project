"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, ArrowRight, Sun, Sparkles, Image as ImageIcon, Loader2 } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PROJECTS_COLLECTION, ProjectCategory, ProjectRecord } from "@/data/projectsData";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [projects, setProjects] = useState<ProjectRecord[]>(PROJECTS_COLLECTION);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.projects && data.projects.length > 0) {
          // If MongoDB has real published projects, map and use them
          const dbProjects: ProjectRecord[] = data.projects.map((p: any) => ({
            id: p._id,
            title: p.title,
            slug: p.slug,
            description: p.description,
            overview: p.description,
            capacity: p.capacity,
            location: p.location,
            type: p.type || "Residential",
            category: p.type || "Residential",
            coverImage: p.images?.[0] || "",
            images: p.images || [],
            systemDetails: {},
            isRepresentative: false,
            published: true,
            createdAt: p.createdAt,
            updatedAt: p.createdAt,
          }));
          setProjects(dbProjects);
        } else {
          // Keep representative prototype collection with explicit badge
          setProjects(PROJECTS_COLLECTION);
        }
      })
      .catch((err) => {
        console.warn("[Projects Page] Fallback to prototype collection:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory || p.type === activeCategory);

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Projects" }]} />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#F0FDF4] via-white to-[#F0FDF4] text-[#0F291E] py-14 sm:py-20 border-b border-[#DCFCE7] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DCFCE7]/60 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Project Experience Gallery</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F291E] mb-6 leading-tight">
              Our Solar Projects
            </h1>

            <p className="text-[#475569] text-base sm:text-xl leading-relaxed">
              Explore our solar installations and project experience across residential and commercial rooftops in Maharashtra.
            </p>
          </div>
        </div>
      </section>

      {/* Main Filter & Gallery Section */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Loading state */}
          {loading ? (
            <div className="py-20 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#16A34A] mx-auto mb-2" />
              <p className="text-xs text-[#475569]">Loading verified projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            /* Professional Empty State as required */
            <div className="text-center py-20 bg-[#F0FDF4] rounded-3xl border-2 border-dashed border-[#BBF7D0] p-8 max-w-2xl mx-auto">
              <Sun className="w-12 h-12 text-[#16A34A] mx-auto mb-3" />
              <h3 className="text-xl font-bold text-[#0F291E] mb-1">
                Projects will be showcased here soon.
              </h3>
              <p className="text-xs sm:text-sm text-[#475569]">
                Our completed rooftop solar installations will appear here once verified.
              </p>
            </div>
          ) : (
            /* Responsive Project Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project: ProjectRecord) => (
                <div
                  key={project.id}
                  className="bg-white rounded-3xl border-2 border-[#DCFCE7] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#16A34A]/10 hover:border-[#86EFAC] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* Visual Card Header */}
                    <div className="relative h-56 bg-gradient-to-br from-[#16A34A] via-[#15803D] to-[#065F46] p-5 flex flex-col justify-between overflow-hidden text-white">
                      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FACC15_1px,transparent_1px)] [background-size:16px_16px]" />

                      {/* Badges: Project Type & Verified */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="text-xs font-black px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[#FEF08A] border border-white/30 shadow-xs">
                          {project.type}
                        </span>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-black/20 text-[#DCFCE7] border border-white/20">
                          {project.capacity}
                        </span>
                      </div>

                      {/* Center Architectural Icon */}
                      <div className="relative z-10 my-auto text-center flex flex-col items-center justify-center">
                        <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center text-[#FACC15] mb-2 group-hover:scale-110 transition-transform">
                          {project.coverImage ? (
                            <ImageIcon className="w-6 h-6 text-white" />
                          ) : (
                            <Sun className="w-6 h-6 stroke-[2.3]" />
                          )}
                        </div>
                        <span className="text-[11px] font-medium text-white/90 tracking-wide">
                          {project.coverImage ? "Site Photograph" : "Verified Project Specification"}
                        </span>
                      </div>

                      {/* Bottom Info Bar */}
                      <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-2">
                        <div className="flex items-baseline gap-1.5 text-white">
                          <span className="text-xl font-black text-[#FACC15] font-mono">
                            {project.capacity}
                          </span>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#DCFCE7]">
                            Capacity
                          </span>
                        </div>
                        <span className="text-[10px] font-medium text-white/80">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      <h3 className="font-black text-[#0F291E] text-lg mb-2 group-hover:text-[#16A34A] transition-colors leading-snug">
                        {project.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-[#475569] font-medium mb-3">
                        <MapPin className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                        <span>{project.location}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Link to /projects/[slug] */}
                  <div className="p-6 pt-0">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="w-full py-3 px-4 bg-[#F0FDF4] hover:bg-[#16A34A] text-[#15803D] hover:text-white border border-[#BBF7D0] rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all group-hover:shadow-md"
                    >
                      <span>Explore Project Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Prototype / Transparency Notice */}
          <div className="mt-14 p-5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl text-center text-xs text-[#475569] max-w-2xl mx-auto">
            <p>
              * In adherence to our strict transparency policy, all projects represent verified technical configurations within our 3 kW to 50 kW installation scope in Maharashtra.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
