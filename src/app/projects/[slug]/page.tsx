import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Sun,
  MapPin,
  ShieldCheck,
  Zap,
  ArrowRight,
  Layers,
  Cpu,
  Activity,
  Image as ImageIcon,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import {
  getProjectBySlug,
  getAllProjects,
  ProjectRecord,
} from "@/data/projectsData";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Hardev Solar Services",
      description: "The requested solar project could not be found.",
    };
  }

  return {
    title: `${project.title} (${project.capacity}) | Hardev Solar Services`,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Hardev Solar Services`,
      description: project.description,
      url: `/projects/${project.slug}`,
    },
  };
}

export default async function IndividualProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project: ProjectRecord | undefined = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
      />

      {/* Project Hero Header */}
      <section className="bg-gradient-to-b from-[#F0FDF4] via-white to-[#F0FDF4] text-[#0F291E] py-12 sm:py-16 border-b border-[#DCFCE7] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 shadow-xs">
              <Sun className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{project.category} Solar Installation</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0F291E] mb-4 leading-tight">
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#475569] font-semibold">
              <span className="flex items-center gap-1.5 text-[#15803D]">
                <MapPin className="w-4 h-4 text-[#16A34A]" />
                {project.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#16A34A]" />
                {project.capacity} Capacity
              </span>
              <span>•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] font-bold text-xs">
                {project.type}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-14 sm:py-20 border-b border-[#DCFCE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Hero Image / Visual, Overview & Gallery */}
            <div className="lg:col-span-7 space-y-10">
              {/* Project Hero Image / Visual Presentation */}
              <div className="relative h-72 sm:h-96 rounded-3xl bg-gradient-to-br from-[#16A34A] via-[#15803D] to-[#065F46] p-6 flex flex-col justify-between overflow-hidden text-white shadow-md border-2 border-[#86EFAC]/40">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FACC15_1px,transparent_1px)] [background-size:18px_18px]" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[#FEF08A] border border-white/30 shadow-xs">
                    {project.type} Solar
                  </span>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-black/25 text-[#DCFCE7] border border-white/20">
                    {project.capacity} Installed
                  </span>
                </div>

                <div className="relative z-10 my-auto text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center text-[#FACC15] mb-3">
                    {project.coverImage ? (
                      <ImageIcon className="w-8 h-8 text-white" />
                    ) : (
                      <Sun className="w-8 h-8 stroke-[2.3]" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white/95 tracking-wide">
                    {project.coverImage ? "Installed Site Photograph" : "Verified Project Specification & Engineering"}
                  </span>
                </div>

                <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#FACC15] font-mono">
                      {project.capacity}
                    </span>
                    <span className="text-xs uppercase font-bold tracking-wider text-[#DCFCE7]">
                      PV System
                    </span>
                  </div>
                  <span className="text-xs font-medium text-white/90">
                    {project.location}
                  </span>
                </div>
              </div>

              {/* Project Overview */}
              <div>
                <h2 className="text-2xl font-black text-[#0F291E] tracking-tight mb-4">
                  Project Overview
                </h2>
                <p className="text-[#475569] text-base leading-relaxed">
                  {project.overview}
                </p>
              </div>

              {/* Project Gallery */}
              <div>
                <h3 className="text-xl font-black text-[#0F291E] tracking-tight mb-4">
                  Project Gallery
                </h3>

                {project.images && project.images.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {project.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="h-36 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] overflow-hidden"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img}
                          alt={`${project.title} - photo ${idx + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 bg-[#F0FDF4] rounded-2xl border border-[#BBF7D0] text-xs text-[#475569] flex items-center gap-3">
                    <ImageIcon className="w-6 h-6 text-[#16A34A] shrink-0" />
                    <span>
                      High-resolution photographic documentation from this {project.capacity} site installation can be populated directly in this gallery.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Project Information & System Details */}
            <div className="lg:col-span-5 space-y-8">
              {/* Project Information Card */}
              <div className="bg-white rounded-3xl p-7 border-2 border-[#DCFCE7] shadow-sm space-y-4">
                <h3 className="text-lg font-black text-[#0F291E] border-b border-[#DCFCE7] pb-3">
                  Project Information
                </h3>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center justify-between pb-2 border-b border-[#F0FDF4]">
                    <span className="text-[#475569]">System Capacity:</span>
                    <span className="font-extrabold text-[#0F291E]">{project.capacity}</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-[#F0FDF4]">
                    <span className="text-[#475569]">Location:</span>
                    <span className="font-extrabold text-[#0F291E]">{project.location}</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-[#F0FDF4]">
                    <span className="text-[#475569]">Property Type:</span>
                    <span className="font-extrabold text-[#0F291E]">{project.type}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#475569]">Installation Category:</span>
                    <span className="font-extrabold text-[#0F291E]">{project.category}</span>
                  </div>
                </div>
              </div>

              {/* System Details (Only show what actually exists in data) */}
              <div className="bg-[#F0FDF4] rounded-3xl p-7 border-2 border-[#BBF7D0] space-y-4 shadow-sm">
                <h3 className="text-lg font-black text-[#0F291E] border-b border-[#BBF7D0] pb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#16A34A]" />
                  <span>System Details</span>
                </h3>

                <div className="space-y-3 text-xs sm:text-sm">
                  {project.systemDetails.moduleType && (
                    <div className="flex items-start gap-2.5">
                      <Sun className="w-4 h-4 text-[#F59E0B] mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[11px] font-bold uppercase text-[#15803D] block">Modules:</span>
                        <span className="text-[#0F291E] font-medium">{project.systemDetails.moduleType}</span>
                      </div>
                    </div>
                  )}

                  {project.systemDetails.inverterType && (
                    <div className="flex items-start gap-2.5">
                      <Cpu className="w-4 h-4 text-[#16A34A] mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[11px] font-bold uppercase text-[#15803D] block">Inverter:</span>
                        <span className="text-[#0F291E] font-medium">{project.systemDetails.inverterType}</span>
                      </div>
                    </div>
                  )}

                  {project.systemDetails.structureType && (
                    <div className="flex items-start gap-2.5">
                      <Layers className="w-4 h-4 text-[#16A34A] mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[11px] font-bold uppercase text-[#15803D] block">Structure:</span>
                        <span className="text-[#0F291E] font-medium">{project.systemDetails.structureType}</span>
                      </div>
                    </div>
                  )}

                  {project.systemDetails.monitoring && (
                    <div className="flex items-start gap-2.5">
                      <Activity className="w-4 h-4 text-[#16A34A] mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[11px] font-bold uppercase text-[#15803D] block">Monitoring:</span>
                        <span className="text-[#0F291E] font-medium">{project.systemDetails.monitoring}</span>
                      </div>
                    </div>
                  )}

                  {project.systemDetails.gridType && (
                    <div className="flex items-start gap-2.5">
                      <Zap className="w-4 h-4 text-[#16A34A] mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[11px] font-bold uppercase text-[#15803D] block">Grid Tie:</span>
                        <span className="text-[#0F291E] font-medium">{project.systemDetails.gridType}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Consultation / Similar System CTA Card */}
              <div className="bg-white rounded-3xl p-7 border-2 border-[#DCFCE7] shadow-lg space-y-4 text-center">
                <h3 className="text-xl font-black text-[#0F291E]">
                  Interested in a Similar Solar System?
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Our engineers will evaluate your rooftop and calculate an exact capacity proposal tailored to your electricity bill.
                </p>

                <div className="pt-2 space-y-2.5">
                  <Link
                    href={`/#consultation?inquiry=${encodeURIComponent(
                      `Interested in ${project.title} (${project.capacity})`
                    )}`}
                    className="w-full py-3.5 px-4 bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534] text-white font-extrabold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Get Free Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <WhatsAppButton
                    message={`Hello Hardev Solar Services, I am viewing the ${project.title} (${project.capacity}) on your website and would like a consultation.`}
                    variant="outline"
                    label="Discuss on WhatsApp"
                    className="w-full text-xs py-2.5"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
