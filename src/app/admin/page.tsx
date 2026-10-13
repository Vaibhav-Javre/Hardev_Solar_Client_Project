"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  FolderKanban,
  MessageSquareQuote,
  Clock,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  CalendarCheck,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Loader2,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";

interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  contacted: number;
  siteVisits: number;
  quotations: number;
  converted: number;
  closed: number;
  totalProjects: number;
  publishedProjects: number;
  totalTestimonials: number;
  publishedTestimonials: number;
}

interface RecentLead {
  _id: string;
  fullName: string;
  phone: string;
  city: string;
  propertyType: string;
  interestedService: string;
  status: string;
  createdAt: string;
}

const STATUS_BADGES: Record<string, { bg: string; text: string; border: string }> = {
  NEW: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
  CONTACTED: { bg: "bg-sky-50", text: "text-sky-800", border: "border-sky-200" },
  SITE_VISIT: { bg: "bg-indigo-50", text: "text-indigo-800", border: "border-indigo-200" },
  QUOTATION_SENT: { bg: "bg-purple-50", text: "text-purple-800", border: "border-purple-200" },
  CONVERTED: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200" },
  CLOSED: { bg: "bg-slate-50", text: "text-slate-800", border: "border-slate-200" },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats", {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to load database statistics.");
        }
        return data;
      })
      .then((data) => {
        setStats(data.stats);
        setRecentLeads(data.recentLeads || []);
      })
      .catch((err) => {
        setError(err.message || "Error fetching database statistics.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AdminLayout
      title="Commercial Management Dashboard"
      subtitle="Real-time enquiry metrics and operational status from MongoDB."
    >
      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#16A34A]" />
          <p className="text-xs text-[#475569] font-medium">Loading database statistics...</p>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
          <p className="font-bold mb-1">Unable to load dashboard data</p>
          <p className="text-xs">{error}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Quick Notice */}
          <div className="p-4 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl flex items-center justify-between text-xs sm:text-sm text-[#0F291E]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span>
                Connected to MongoDB. All metrics reflect live, unmanipulated client enquiries.
              </span>
            </div>
            <Link
              href="/admin/leads"
              className="font-extrabold text-[#15803D] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Manage Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Primary Lead Metrics Grid */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-[#475569] mb-3">
              Lead Pipeline Status
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
              {/* Total Leads */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#DCFCE7] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#475569] mb-1">
                  <span>Total Leads</span>
                  <Users className="w-4 h-4 text-[#16A34A]" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#0F291E]">
                  {stats?.totalLeads ?? 0}
                </div>
                <div className="text-[10px] text-[#16A34A] font-bold mt-1">All enquiries</div>
              </div>

              {/* New */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-amber-200 shadow-xs">
                <div className="flex items-center justify-between text-xs text-amber-700 mb-1">
                  <span>New</span>
                  <Clock className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-amber-900">
                  {stats?.newLeads ?? 0}
                </div>
                <div className="text-[10px] text-amber-700 font-bold mt-1">Needs review</div>
              </div>

              {/* Contacted */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-sky-200 shadow-xs">
                <div className="flex items-center justify-between text-xs text-sky-700 mb-1">
                  <span>Contacted</span>
                  <TrendingUp className="w-4 h-4 text-sky-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-sky-900">
                  {stats?.contacted ?? 0}
                </div>
                <div className="text-[10px] text-sky-700 font-bold mt-1">First connect done</div>
              </div>

              {/* Site Visit */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-indigo-200 shadow-xs">
                <div className="flex items-center justify-between text-xs text-indigo-700 mb-1">
                  <span>Site Visit</span>
                  <CalendarCheck className="w-4 h-4 text-indigo-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-indigo-900">
                  {stats?.siteVisits ?? 0}
                </div>
                <div className="text-[10px] text-indigo-700 font-bold mt-1">Survey scheduled</div>
              </div>

              {/* Quotations */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-purple-200 shadow-xs">
                <div className="flex items-center justify-between text-xs text-purple-700 mb-1">
                  <span>Quotation</span>
                  <FileCheck2 className="w-4 h-4 text-purple-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-purple-900">
                  {stats?.quotations ?? 0}
                </div>
                <div className="text-[10px] text-purple-700 font-bold mt-1">Proposal sent</div>
              </div>

              {/* Converted */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-emerald-200 shadow-xs">
                <div className="flex items-center justify-between text-xs text-emerald-700 mb-1">
                  <span>Converted</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-900">
                  {stats?.converted ?? 0}
                </div>
                <div className="text-[10px] text-emerald-700 font-bold mt-1">Order signed</div>
              </div>

              {/* Closed */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-700 mb-1">
                  <span>Closed</span>
                  <XCircle className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-700">
                  {stats?.closed ?? 0}
                </div>
                <div className="text-[10px] text-slate-500 font-bold mt-1">Completed / drop</div>
              </div>
            </div>
          </div>

          {/* Catalog & Content Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Projects Overview */}
            <div className="bg-white p-5 rounded-2xl border-2 border-[#DCFCE7] shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center border border-[#BBF7D0]">
                  <FolderKanban className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-[#475569] font-bold">Showcase Projects</div>
                  <div className="text-2xl font-black text-[#0F291E]">
                    {stats?.totalProjects ?? 0}{" "}
                    <span className="text-xs font-semibold text-[#16A34A]">
                      ({stats?.publishedProjects ?? 0} published)
                    </span>
                  </div>
                </div>
              </div>
              <Link
                href="/admin/projects"
                className="px-3.5 py-2 bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#15803D] text-xs font-bold rounded-xl border border-[#BBF7D0] transition-colors"
              >
                Manage
              </Link>
            </div>

            {/* Testimonials Overview */}
            <div className="bg-white p-5 rounded-2xl border-2 border-[#DCFCE7] shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center border border-[#BBF7D0]">
                  <MessageSquareQuote className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-[#475569] font-bold">Customer Testimonials</div>
                  <div className="text-2xl font-black text-[#0F291E]">
                    {stats?.totalTestimonials ?? 0}{" "}
                    <span className="text-xs font-semibold text-[#16A34A]">
                      ({stats?.publishedTestimonials ?? 0} published)
                    </span>
                  </div>
                </div>
              </div>
              <Link
                href="/admin/testimonials"
                className="px-3.5 py-2 bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#15803D] text-xs font-bold rounded-xl border border-[#BBF7D0] transition-colors"
              >
                Manage
              </Link>
            </div>
          </div>

          {/* Recent Leads Section */}
          <div className="bg-white rounded-3xl border-2 border-[#DCFCE7] shadow-xs overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-[#DCFCE7] flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#0F291E] tracking-tight">
                  Recent Enquiries
                </h3>
                <p className="text-xs text-[#475569]">
                  Latest solar consultation and rooftop sizing requests submitted by visitors.
                </p>
              </div>
              <Link
                href="/admin/leads"
                className="px-3.5 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>View All Leads</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentLeads.length === 0 ? (
              <div className="p-12 text-center text-[#475569]">
                <Users className="w-8 h-8 text-[#16A34A]/50 mx-auto mb-2" />
                <p className="font-bold text-sm text-[#0F291E]">No enquiries found yet.</p>
                <p className="text-xs mt-1">
                  Customer enquiries submitted from the public site forms will appear here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#F8FAFC] border-b border-[#DCFCE7] text-[#475569] font-extrabold text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4 sm:px-6">Customer</th>
                      <th className="py-3 px-4">City</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Submitted</th>
                      <th className="py-3 px-4 sm:px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCFCE7]/60">
                    {recentLeads.map((lead) => {
                      const badge = STATUS_BADGES[lead.status] || STATUS_BADGES.NEW;
                      const dateStr = new Date(lead.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      });

                      return (
                        <tr key={lead._id} className="hover:bg-[#F0FDF4]/40 transition-colors">
                          <td className="py-3.5 px-4 sm:px-6">
                            <div className="font-bold text-[#0F291E]">{lead.fullName}</div>
                            <div className="text-xs text-[#475569] font-mono mt-0.5">
                              +91 {lead.phone}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-[#0F291E] font-medium">{lead.city}</td>
                          <td className="py-3.5 px-4 text-[#475569]">
                            {lead.interestedService || lead.propertyType}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${badge.bg} ${badge.text} ${badge.border}`}
                            >
                              {lead.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-xs text-[#475569] whitespace-nowrap">
                            {dateStr}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-right">
                            <Link
                              href={`/admin/leads?id=${lead._id}`}
                              className="inline-flex items-center gap-1 text-xs font-bold text-[#16A34A] hover:text-[#15803D] hover:underline"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Details</span>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
