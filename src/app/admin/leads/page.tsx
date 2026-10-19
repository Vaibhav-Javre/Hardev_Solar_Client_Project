"use client";

import React, { useEffect, useState, useCallback, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Users,
  Search,
  Filter,
  RefreshCw,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Calendar,
  Zap,
  Trash2,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ExternalLink,
  ShieldAlert,
  ArrowUpDown,
  Send,
  Copy,
  Check,
  RotateCcw,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { getCustomerWhatsAppUrl, getCustomerPhoneCallUrl } from "@/lib/site-config";

interface LeadItem {
  _id: string;
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  propertyType: "Residential" | "Commercial" | "Other";
  monthlyElectricityBill?: string;
  interestedService: string;
  estimatedCapacityKW?: string;
  message?: string;
  source: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  status: "NEW" | "CONTACTED" | "SITE_VISIT" | "QUOTATION_SENT" | "CONVERTED" | "CLOSED";
  calculatorUsed?: boolean;
  estimatedSystemSize?: string;
  estimatedMonthlyGeneration?: number;
  estimatedAnnualGeneration?: number;
  estimatedMonthlySavings?: number;
  estimatedAnnualSavings?: number;
  estimatedPaybackYears?: number;
  roofAreaSqFt?: number;
  createdAt: string;
  updatedAt?: string;
}

const STATUS_OPTIONS: LeadItem["status"][] = [
  "NEW",
  "CONTACTED",
  "SITE_VISIT",
  "QUOTATION_SENT",
  "CONVERTED",
  "CLOSED",
];

const STATUS_BADGES: Record<LeadItem["status"], { bg: string; text: string; border: string }> = {
  NEW: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
  CONTACTED: { bg: "bg-sky-50", text: "text-sky-800", border: "border-sky-200" },
  SITE_VISIT: { bg: "bg-indigo-50", text: "text-indigo-800", border: "border-indigo-200" },
  QUOTATION_SENT: { bg: "bg-purple-50", text: "text-purple-800", border: "border-purple-200" },
  CONVERTED: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200" },
  CLOSED: { bg: "bg-slate-50", text: "text-slate-800", border: "border-slate-200" },
};

function LeadsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSelectedId = searchParams.get("id");
  const hasAutoSelectedRef = useRef(false);

  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Pagination State
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [propertyFilter, setPropertyFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "name">("newest");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // Detail Modal & Action State
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [deleteConfirmLead, setDeleteConfirmLead] = useState<LeadItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Email Composer Modal State
  const [emailModalLead, setEmailModalLead] = useState<LeadItem | null>(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [copiedEmailText, setCopiedEmailText] = useState(false);

  const generateDefaultTemplate = (lead: LeadItem) => {
    const firstName = lead.fullName?.split(" ")[0] || lead.fullName || "Customer";
    const subject = `Hardev Solar Services - Solar Consultation & Proposal for ${lead.fullName}`;

    const customerNote =
      lead.message &&
      lead.message.trim() &&
      lead.message !== "Requested rooftop solar consultation" &&
      lead.message !== "Requested solar consultation"
        ? `• Your Query / Rooftop Notes: "${lead.message.trim()}"\n`
        : "";

    const body = `Dear ${firstName},

Thank you for your interest in Hardev Solar Services!

We have received your enquiry for your ${lead.propertyType} property in ${lead.city}. Our qualified solar engineering team has reviewed your details and is preparing an optimal solar design.

Enquiry Summary:
• Customer Name: ${lead.fullName}
• Location: ${lead.city}
• Property Type: ${lead.propertyType}
• Interested Solution: ${lead.interestedService || "Rooftop Solar System"}
• Monthly Electricity Bill: ${lead.monthlyElectricityBill || "Standard"}
${customerNote}
With an on-grid rooftop solar installation from Hardev Solar Services, you can reduce your monthly electricity bills by up to 80-90% and secure dependable, clean energy with MNRE-approved Tier-1 solar modules (25-year performance warranty).

Would you be available for a brief 5-minute phone consultation or a free on-site survey this week?

Please feel free to reply directly to this email, or connect with our team:
📞 Call: +91 98228 23115 / +91 93737 21217
💬 WhatsApp: https://wa.me/919822823115
🌐 Website: https://hardevsolar.com

Warm regards,
Hardev Solar Services Team
Solar Energy Solutions across Maharashtra
Chinchwad, Pune`;

    return { subject, body };
  };

  const handleOpenEmailModal = (lead: LeadItem) => {
    const { subject, body } = generateDefaultTemplate(lead);
    setEmailModalLead(lead);
    setEmailSubject(subject);
    setEmailBody(body);
    setEmailSentSuccess(null);
    setEmailError(null);
    setCopiedEmailText(false);
  };

  const handleResetTemplate = () => {
    if (!emailModalLead) return;
    const { subject, body } = generateDefaultTemplate(emailModalLead);
    setEmailSubject(subject);
    setEmailBody(body);
  };

  const handleSendEmail = async () => {
    if (!emailModalLead || !emailModalLead.email) return;
    setIsSendingEmail(true);
    setEmailSentSuccess(null);
    setEmailError(null);

    try {
      const res = await fetch("/api/admin/leads/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: emailModalLead.email,
          customerName: emailModalLead.fullName,
          subject: emailSubject,
          message: emailBody,
          leadId: emailModalLead._id,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setEmailSentSuccess(data.message || `Email successfully sent to ${emailModalLead.email}`);
        if (emailModalLead.status === "NEW") {
          handleStatusChange("CONTACTED");
        }
      } else {
        setEmailError(data.message || "Failed to dispatch email.");
      }
    } catch {
      setEmailError("Network error while attempting to send email.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleCopyEmailDraft = async () => {
    if (!emailModalLead) return;
    const fullText = `To: ${emailModalLead.email}\nSubject: ${emailSubject}\n\n${emailBody}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopiedEmailText(true);
      setTimeout(() => setCopiedEmailText(false), 2500);
    } catch {
      alert("Unable to copy to clipboard.");
    }
  };

  const handleCloseModal = useCallback(() => {
    hasAutoSelectedRef.current = true;
    setSelectedLead(null);
    setFeedbackMessage(null);

    // Clean up ?id= from URL without reloading so the modal doesn't re-trigger
    if (searchParams.get("id")) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("id");
      const nextQuery = params.toString();
      router.replace(nextQuery ? `/admin/leads?${nextQuery}` : "/admin/leads", { scroll: false });
    }
  }, [router, searchParams]);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (emailModalLead) {
          setEmailModalLead(null);
        } else if (deleteConfirmLead) {
          setDeleteConfirmLead(null);
        } else if (selectedLead) {
          handleCloseModal();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedLead, deleteConfirmLead, emailModalLead, handleCloseModal]);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort: sortOrder,
      });

      if (search.trim()) params.set("search", search.trim());
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      if (propertyFilter !== "ALL") params.set("propertyType", propertyFilter);

      const res = await fetch(`/api/admin/leads?${params.toString()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load leads from database.");
      }

      if (data.success) {
        const fetchedLeads = data.leads || [];
        setLeads(fetchedLeads);
        setTotalPages(data.totalPages || 1);
        setTotalRecords(data.total || 0);

        // Auto-select once if requested by URL query
        if (initialSelectedId && !hasAutoSelectedRef.current) {
          const match = fetchedLeads.find((l: LeadItem) => l._id === initialSelectedId);
          if (match) {
            setSelectedLead(match);
            hasAutoSelectedRef.current = true;
          }
        }
      } else {
        setError(data.message || "Failed to load leads.");
      }
    } catch (err: any) {
      setError(err.message || "Error communicating with server.");
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortOrder, search, statusFilter, propertyFilter, initialSelectedId]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Handle status update
  const handleStatusChange = async (newStatus: LeadItem["status"]) => {
    if (!selectedLead) return;
    setIsUpdatingStatus(true);
    setFeedbackMessage(null);

    try {
      const res = await fetch(`/api/admin/leads/${selectedLead._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        setFeedbackMessage("Lead status updated successfully.");
        const updated = { ...selectedLead, status: newStatus };
        setSelectedLead(updated);
        setLeads((prev) => prev.map((l) => (l._id === updated._id ? updated : l)));
        setTimeout(() => setFeedbackMessage(null), 3000);
      } else {
        setFeedbackMessage(data.message || "Failed to update status.");
      }
    } catch {
      setFeedbackMessage("Network error while updating status.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Handle delete lead
  const handleDeleteConfirm = async () => {
    if (!deleteConfirmLead) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/leads/${deleteConfirmLead._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        if (selectedLead?._id === deleteConfirmLead._id) {
          setSelectedLead(null);
        }
        setDeleteConfirmLead(null);
        fetchLeads();
      } else {
        alert(data.message || "Failed to delete lead.");
      }
    } catch {
      alert("Error deleting lead.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AdminLayout
      title="Leads Pipeline Management"
      subtitle="Search, filter, update statuses, and directly connect with customers."
    >
      <div className="space-y-6">
        {/* Controls Bar: Search, Filters & Action Buttons */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border-2 border-[#DCFCE7] shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#475569]/70" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by customer name, phone (+91), email, or city..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#F0FDF4]/60 border border-[#DCFCE7] rounded-xl text-xs sm:text-sm text-[#0F291E] placeholder:text-[#475569]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
              />
            </div>

            {/* Refresh button */}
            <button
              type="button"
              onClick={() => fetchLeads()}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#15803D] text-xs font-bold transition-colors cursor-pointer shrink-0 disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh Pipeline</span>
            </button>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-[#DCFCE7]/70 text-xs">
            {/* Status Filter */}
            <div className="flex items-center justify-between sm:justify-start gap-2 bg-[#F0FDF4] px-3 py-2 rounded-xl border border-[#DCFCE7]">
              <span className="font-extrabold uppercase tracking-wider text-[11px] text-[#475569] shrink-0">
                Status:
              </span>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full sm:w-auto bg-transparent font-bold text-[#0F291E] focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                {STATUS_OPTIONS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type Filter */}
            <div className="flex items-center justify-between sm:justify-start gap-2 bg-[#F0FDF4] px-3 py-2 rounded-xl border border-[#DCFCE7]">
              <span className="font-extrabold uppercase tracking-wider text-[11px] text-[#475569] shrink-0">
                Property:
              </span>
              <select
                value={propertyFilter}
                onChange={(e) => {
                  setPropertyFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full sm:w-auto bg-transparent font-bold text-[#0F291E] focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Types</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex items-center justify-between sm:justify-start gap-2 bg-[#F0FDF4] px-3 py-2 rounded-xl border border-[#DCFCE7]">
              <div className="flex items-center gap-1.5 shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#16A34A]" />
                <span className="font-extrabold uppercase tracking-wider text-[11px] text-[#475569]">
                  Sort:
                </span>
              </div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="w-full sm:w-auto bg-transparent font-bold text-[#0F291E] focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Customer Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Table & States */}
        {loading && leads.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 border-2 border-[#DCFCE7] text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#16A34A] mx-auto" />
            <p className="text-xs text-[#475569] font-medium">Fetching enquiries from database...</p>
          </div>
        ) : error ? (
          <div className="p-6 bg-red-50 border border-red-200 rounded-3xl text-red-700 text-sm">
            <p className="font-bold mb-1">Unable to load leads</p>
            <p className="text-xs">{error}</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 border-2 border-[#DCFCE7] text-center space-y-3">
            <Users className="w-10 h-10 text-[#16A34A]/40 mx-auto" />
            <h3 className="font-black text-lg text-[#0F291E]">No enquiries found.</h3>
            <p className="text-xs text-[#475569] max-w-sm mx-auto">
              {search || statusFilter !== "ALL" || propertyFilter !== "ALL"
                ? "No customer enquiries matched your active filters. Try clearing or broadening search criteria."
                : "No enquiries have been submitted yet. New leads from the public website will appear here in real time."}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border-2 border-[#DCFCE7] shadow-xs overflow-hidden">
            {/* Mobile Card List (Dedicated for phones < md screens) */}
            <div className="block md:hidden divide-y divide-[#DCFCE7]/70">
              {leads.map((lead) => {
                const badge = STATUS_BADGES[lead.status] || STATUS_BADGES.NEW;
                const dateStr = new Date(lead.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <div key={lead._id} className="p-4 space-y-3 hover:bg-[#F0FDF4]/30 transition-colors">
                    {/* Top Row: Name + Badges */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <button
                          type="button"
                          onClick={() => setSelectedLead(lead)}
                          className="text-left font-black text-sm text-[#0F291E] hover:text-[#16A34A] transition-colors cursor-pointer"
                        >
                          {lead.fullName}
                        </button>
                        {lead.email && (
                          <div className="text-[11px] text-[#475569] truncate max-w-[200px]">
                            {lead.email}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {lead.calculatorUsed && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">
                            Calc
                          </span>
                        )}
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${badge.bg} ${badge.text} ${badge.border}`}
                        >
                          {lead.status}
                        </span>
                      </div>
                    </div>

                    {/* Quick Call & WhatsApp Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={getCustomerPhoneCallUrl(lead.phone)}
                        className="inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#15803D] font-bold text-xs border border-[#BBF7D0] transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Customer</span>
                      </a>
                      <a
                        href={getCustomerWhatsAppUrl(
                          lead.phone,
                          lead.fullName,
                          lead.interestedService
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs transition-colors shadow-2xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white text-[#16A34A]" />
                        <span>WhatsApp</span>
                      </a>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#F8FAFC] border border-[#DCFCE7]/60 text-[11px]">
                      <div>
                        <div className="text-[#64748B] font-semibold text-[10px] uppercase">City</div>
                        <div className="font-bold text-[#0F291E] truncate">{lead.city}</div>
                      </div>
                      <div>
                        <div className="text-[#64748B] font-semibold text-[10px] uppercase">Property</div>
                        <div className="font-bold text-[#0F291E] truncate">{lead.propertyType}</div>
                      </div>
                      <div>
                        <div className="text-[#64748B] font-semibold text-[10px] uppercase">Bill</div>
                        <div className="font-bold text-[#0F291E] truncate">{lead.monthlyElectricityBill || "—"}</div>
                      </div>
                    </div>

                    {/* Bottom Actions Row */}
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <span className="text-[11px] text-[#64748B]">
                        {dateStr}
                      </span>
                      <div className="flex items-center gap-2">
                        {lead.email && (
                          <button
                            type="button"
                            onClick={() => handleOpenEmailModal(lead)}
                            className="p-1.5 rounded-lg hover:bg-emerald-50 text-[#16A34A] border border-[#DCFCE7] transition-colors cursor-pointer"
                            title="Send Email to Customer"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmLead(lead)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedLead(lead)}
                          className="px-3 py-1.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                        >
                          Review Lead
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Table (Hidden on mobile screens, shown on md and above) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#F8FAFC] border-b border-[#DCFCE7] text-[#475569] font-extrabold text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4 sm:px-6">Customer</th>
                    <th className="py-3.5 px-4">Phone / WhatsApp</th>
                    <th className="py-3.5 px-4">City</th>
                    <th className="py-3.5 px-4">Type</th>
                    <th className="py-3.5 px-4">Monthly Bill</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCFCE7]/60">
                  {leads.map((lead) => {
                    const badge = STATUS_BADGES[lead.status] || STATUS_BADGES.NEW;
                    const dateStr = new Date(lead.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    });

                    return (
                      <tr
                        key={lead._id}
                        className={`hover:bg-[#F0FDF4]/50 transition-colors ${
                          selectedLead?._id === lead._id ? "bg-[#DCFCE7]/30" : ""
                        }`}
                      >
                        {/* Name & Email */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedLead(lead)}
                              className="text-left font-bold text-[#0F291E] hover:text-[#16A34A] transition-colors cursor-pointer"
                            >
                              {lead.fullName}
                            </button>
                            {lead.calculatorUsed && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">
                                Calc
                              </span>
                            )}
                          </div>
                          {lead.email && (
                            <div className="text-[11px] text-[#475569] truncate max-w-[180px]">
                              {lead.email}
                            </div>
                          )}
                        </td>

                        {/* Phone with quick call / WhatsApp */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="font-mono text-xs font-semibold text-[#0F291E]">
                            +91 {lead.phone}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <a
                              href={getCustomerPhoneCallUrl(lead.phone)}
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#16A34A] hover:underline"
                            >
                              <Phone className="w-3 h-3" />
                              <span>Call</span>
                            </a>
                            <span className="text-slate-300">•</span>
                            <a
                              href={getCustomerWhatsAppUrl(
                                lead.phone,
                                lead.fullName,
                                lead.interestedService
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#15803D] hover:underline"
                            >
                              <MessageCircle className="w-3 h-3" />
                              <span>Chat</span>
                            </a>
                          </div>
                        </td>

                        {/* City */}
                        <td className="py-4 px-4 text-[#0F291E] font-medium">{lead.city}</td>

                        {/* Property */}
                        <td className="py-4 px-4">
                          <span className="text-xs text-[#475569] font-medium">
                            {lead.propertyType}
                          </span>
                        </td>

                        {/* Monthly Bill */}
                        <td className="py-4 px-4 text-xs text-[#475569]">
                          {lead.monthlyElectricityBill || "—"}
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${badge.bg} ${badge.text} ${badge.border}`}
                          >
                            {lead.status}
                          </span>
                        </td>

                        {/* Submitted Date */}
                        <td className="py-4 px-4 text-xs text-[#475569] whitespace-nowrap">
                          {dateStr}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap space-x-2">
                          {lead.email && (
                            <button
                              type="button"
                              onClick={() => handleOpenEmailModal(lead)}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-[#F0FDF4] hover:text-[#16A34A] text-slate-700 text-xs font-bold border border-slate-200 hover:border-[#BBF7D0] transition-colors cursor-pointer inline-flex items-center gap-1"
                              title={`Send Email to ${lead.email}`}
                            >
                              <Mail className="w-3.5 h-3.5 text-[#16A34A]" />
                              <span>Email</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setSelectedLead(lead)}
                            className="px-2.5 py-1.5 rounded-lg bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#15803D] text-xs font-bold border border-[#BBF7D0] transition-colors cursor-pointer"
                          >
                            Review
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmLead(lead)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="p-4 sm:p-6 border-t border-[#DCFCE7] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#475569]">
              <div>
                Showing {(page - 1) * limit + 1} to{" "}
                {Math.min(page * limit, totalRecords)} of {totalRecords} total enquiries
              </div>

              <div className="flex items-center gap-3">
                {/* Limit selector */}
                <div className="flex items-center gap-1.5">
                  <span>Per page:</span>
                  <select
                    value={limit}
                    onChange={(e) => {
                      setLimit(Number(e.target.value));
                      setPage(1);
                    }}
                    className="py-1 px-2 border border-[#DCFCE7] rounded-lg bg-white font-bold"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                {/* Page Prev/Next */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="p-1.5 rounded-lg border border-[#DCFCE7] hover:bg-[#F0FDF4] disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-bold px-2">
                    {page} / {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="p-1.5 rounded-lg border border-[#DCFCE7] hover:bg-[#F0FDF4] disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lead Details Drawer / Modal */}
        {selectedLead && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
            onClick={handleCloseModal}
          >
            <div
              className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#DCFCE7] shadow-2xl p-6 sm:p-8 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-[#DCFCE7] pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider mb-1 bg-[#DCFCE7] text-[#15803D]">
                    Enquiry Details
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0F291E]">
                    {selectedLead.fullName}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs">
                    <span className="font-mono font-bold text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded-md border border-[#BBF7D0]">
                      +91 {selectedLead.phone}
                    </span>
                    {selectedLead.email && (
                      <span className="text-[#475569] bg-slate-100 px-2 py-0.5 rounded-md">
                        {selectedLead.email}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#64748B] mt-1.5">
                    Submitted on{" "}
                    {new Date(selectedLead.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="p-2 rounded-xl text-[#475569] hover:bg-slate-100 hover:text-[#0F291E] transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Update Feedback Banner */}
              {feedbackMessage && (
                <div className="p-3.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl text-[#15803D] text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16A34A]" />
                  <span>{feedbackMessage}</span>
                </div>
              )}

              {/* Status Manager */}
              <div className="p-4 bg-[#F8FAFC] border border-[#DCFCE7] rounded-2xl space-y-2">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0F291E]">
                  Change Pipeline Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((st) => {
                    const isCurrent = selectedLead.status === st;
                    return (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleStatusChange(st)}
                        disabled={isUpdatingStatus}
                        className={`py-1.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          isCurrent
                            ? "bg-[#16A34A] text-white border-[#16A34A] shadow-xs"
                            : "bg-white text-[#475569] border-[#DCFCE7] hover:bg-[#F0FDF4]"
                        }`}
                      >
                        {st}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Direct Actions: Call, WhatsApp, Email */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <a
                  href={getCustomerPhoneCallUrl(selectedLead.phone)}
                  className="py-2.5 px-3 rounded-xl bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#15803D] font-bold text-xs flex items-center justify-center gap-2 border border-[#BBF7D0] transition-colors shadow-2xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Customer</span>
                </a>

                <a
                  href={getCustomerWhatsAppUrl(
                    selectedLead.phone,
                    selectedLead.fullName,
                    selectedLead.interestedService
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-[#16A34A]" />
                  <span>Chat on WhatsApp</span>
                </a>

                {selectedLead.email && (
                  <button
                    type="button"
                    onClick={() => handleOpenEmailModal(selectedLead)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-[#F0FDF4] hover:text-[#16A34A] hover:border-[#BBF7D0] text-[#0F291E] font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 transition-colors col-span-2 sm:col-span-1 cursor-pointer shadow-2xs"
                  >
                    <Mail className="w-4 h-4 text-[#16A34A]" />
                    <span>Send Email</span>
                  </button>
                )}
              </div>

              {/* Detailed Specs Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-[#DCFCE7]">
                <div>
                  <span className="text-[#64748B] font-bold block uppercase text-[10px]">
                    Customer Phone
                  </span>
                  <a
                    href={getCustomerPhoneCallUrl(selectedLead.phone)}
                    className="font-mono font-extrabold text-[#16A34A] text-sm hover:underline"
                  >
                    +91 {selectedLead.phone}
                  </a>
                </div>

                <div>
                  <span className="text-[#64748B] font-bold block uppercase text-[10px]">
                    Customer Email
                  </span>
                  <span className="font-extrabold text-[#0F291E] text-xs">
                    {selectedLead.email || "Not provided"}
                  </span>
                </div>

                <div>
                  <span className="text-[#64748B] font-bold block uppercase text-[10px]">
                    City / Location
                  </span>
                  <span className="font-extrabold text-[#0F291E] text-sm">
                    {selectedLead.city}
                  </span>
                </div>

                <div>
                  <span className="text-[#64748B] font-bold block uppercase text-[10px]">
                    Property Type
                  </span>
                  <span className="font-extrabold text-[#0F291E] text-sm">
                    {selectedLead.propertyType}
                  </span>
                </div>

                <div>
                  <span className="text-[#64748B] font-bold block uppercase text-[10px]">
                    Interested Service
                  </span>
                  <span className="font-bold text-[#0F291E]">
                    {selectedLead.interestedService}
                  </span>
                </div>


                <div>
                  <span className="text-[#64748B] font-bold block uppercase text-[10px]">
                    Monthly Electricity Bill
                  </span>
                  <span className="font-bold text-[#0F291E]">
                    {selectedLead.monthlyElectricityBill || "Not provided"}
                  </span>
                </div>

                <div>
                  <span className="text-[#64748B] font-bold block uppercase text-[10px]">
                    Estimated Capacity
                  </span>
                  <span className="font-bold text-[#0F291E]">
                    {selectedLead.estimatedCapacityKW || "To be determined"}
                  </span>
                </div>

                <div>
                  <span className="text-[#64748B] font-bold block uppercase text-[10px]">
                    Lead Source
                  </span>
                  <span className="font-bold text-[#16A34A]">{selectedLead.source}</span>
                </div>
              </div>

              {/* Customer Message */}
              {selectedLead.message && (
                <div className="p-3.5 bg-[#F0FDF4]/50 border border-[#DCFCE7] rounded-xl text-xs space-y-1">
                  <span className="font-bold text-[#15803D] uppercase text-[10px] block">
                    Customer Message / Rooftop Notes:
                  </span>
                  <p className="text-[#0F291E] leading-relaxed whitespace-pre-wrap">
                    {selectedLead.message}
                  </p>
                </div>
              )}

              {/* Solar Calculator Context Card if available */}
              {selectedLead.calculatorUsed && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-emerald-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-600" />
                      Solar Calculator Estimation Context
                    </span>
                    <span className="text-[10px] bg-emerald-200/60 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
                      User Submitted via Estimator
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                    <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                      <span className="text-slate-500 block text-[10px] font-bold uppercase">Estimated Size</span>
                      <span className="font-black text-slate-800 text-sm">
                        {selectedLead.estimatedSystemSize ? `${selectedLead.estimatedSystemSize} kW` : selectedLead.estimatedCapacityKW || "—"}
                      </span>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                      <span className="text-slate-500 block text-[10px] font-bold uppercase">Est. Monthly Gen</span>
                      <span className="font-bold text-slate-800">
                        {selectedLead.estimatedMonthlyGeneration ? `~${selectedLead.estimatedMonthlyGeneration.toLocaleString("en-IN")} units` : "—"}
                      </span>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                      <span className="text-slate-500 block text-[10px] font-bold uppercase">Est. Monthly Savings</span>
                      <span className="font-bold text-emerald-700">
                        {selectedLead.estimatedMonthlySavings ? `₹${selectedLead.estimatedMonthlySavings.toLocaleString("en-IN")}` : "—"}
                      </span>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                      <span className="text-slate-500 block text-[10px] font-bold uppercase">Est. Annual Savings</span>
                      <span className="font-bold text-emerald-700">
                        {selectedLead.estimatedAnnualSavings ? `₹${selectedLead.estimatedAnnualSavings.toLocaleString("en-IN")}` : "—"}
                      </span>
                    </div>

                    {selectedLead.estimatedPaybackYears !== undefined && (
                      <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                        <span className="text-slate-500 block text-[10px] font-bold uppercase">Est. Payback</span>
                        <span className="font-bold text-slate-800">
                          ~{selectedLead.estimatedPaybackYears} Years
                        </span>
                      </div>
                    )}

                    {selectedLead.roofAreaSqFt !== undefined && (
                      <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                        <span className="text-slate-500 block text-[10px] font-bold uppercase">Est. Roof Area</span>
                        <span className="font-bold text-slate-800">
                          ~{selectedLead.roofAreaSqFt} sq. ft
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Marketing / UTM Data */}
              {(selectedLead.utmSource || selectedLead.utmMedium || selectedLead.utmCampaign) && (
                <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-[#64748B] space-y-0.5">
                  <div className="font-bold text-[#0F291E]">Campaign Origin Data:</div>
                  {selectedLead.utmSource && <div>Source: {selectedLead.utmSource}</div>}
                  {selectedLead.utmMedium && <div>Medium: {selectedLead.utmMedium}</div>}
                  {selectedLead.utmCampaign && <div>Campaign: {selectedLead.utmCampaign}</div>}
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-4 border-t border-[#DCFCE7] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmLead(selectedLead)}
                  className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete This Lead</span>
                </button>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-[#0F291E] font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        {deleteConfirmLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full border-2 border-red-200 shadow-2xl p-6 sm:p-8 space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto border border-red-200">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#0F291E]">
                Are you sure you want to delete this lead?
              </h3>
              <p className="text-xs text-[#475569]">
                This will permanently remove the record for{" "}
                <strong>{deleteConfirmLead.fullName}</strong> (+91 {deleteConfirmLead.phone}) from
                MongoDB. This action cannot be undone.
              </p>
              <div className="flex items-center justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmLead(null)}
                  disabled={isDeleting}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-[#0F291E] font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-60"
                >
                  {isDeleting ? "Deleting..." : "Delete Lead"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Email Customer Composer Modal */}
        {emailModalLead && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs"
            onClick={() => !isSendingEmail && setEmailModalLead(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col border-2 border-[#BBF7D0] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 border-b border-[#DCFCE7] flex items-center justify-between bg-gradient-to-r from-[#F0FDF4] to-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center border border-[#BBF7D0] shrink-0 shadow-xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-[#0F291E]">
                      Send Email to {emailModalLead.fullName}
                    </h3>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Review or edit the predefined subject and proposal message before dispatching.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setEmailModalLead(null)}
                  disabled={isSendingEmail}
                  className="p-2 rounded-xl text-[#475569] hover:bg-slate-100 hover:text-[#0F291E] transition-colors cursor-pointer disabled:opacity-50"
                  aria-label="Close email modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm">
                {/* Feedback Alerts */}
                {emailSentSuccess && (
                  <div className="p-3.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl text-[#15803D] text-xs font-bold flex items-center gap-2 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16A34A]" />
                    <span>{emailSentSuccess}</span>
                  </div>
                )}

                {emailError && (
                  <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs font-bold flex items-center gap-2 shadow-2xs">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{emailError}</span>
                  </div>
                )}

                {/* Recipient Details Banner */}
                <div className="p-3.5 bg-[#F8FAFC] border border-[#DCFCE7] rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-extrabold uppercase text-[10px] text-[#64748B]">To:</span>
                    <span className="font-bold text-[#0F291E] truncate">{emailModalLead.fullName}</span>
                    <span className="font-mono text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded-md border border-[#BBF7D0] text-xs font-bold truncate">
                      {emailModalLead.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
                    <span>📍 {emailModalLead.city}</span>
                    <span>•</span>
                    <span className="font-semibold text-[#16A34A]">{emailModalLead.propertyType}</span>
                  </div>
                </div>

                {/* Subject Line */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0F291E]">
                    Subject Line <span className="text-[11px] font-normal text-[#64748B] normal-case">(Editable)</span>
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Enter email subject..."
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#DCFCE7] rounded-xl text-xs sm:text-sm font-bold text-[#0F291E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
                  />
                </div>

                {/* Message Body */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0F291E]">
                      Message Body <span className="text-[11px] font-normal text-[#64748B] normal-case">(Editable)</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleResetTemplate}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#16A34A] hover:underline cursor-pointer"
                      title="Reset message back to original predefined template"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset to Predefined Template</span>
                    </button>
                  </div>
                  <textarea
                    rows={12}
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    placeholder="Write your email proposal..."
                    className="w-full p-3.5 bg-[#F8FAFC] border border-[#DCFCE7] rounded-xl text-xs sm:text-sm text-[#0F291E] font-sans leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all resize-y"
                  />
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 sm:p-5 border-t border-[#DCFCE7] bg-[#F8FAFC] flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Secondary Quick Launchers: Gmail, Mailto, Copy */}
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  {/* Gmail Web Compose Button */}
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                      emailModalLead.email || ""
                    )}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors shadow-2xs"
                    title="Open directly in Gmail Web Composer with subject and body pre-filled"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Gmail</span>
                  </a>

                  {/* Mail App */}
                  <a
                    href={`mailto:${encodeURIComponent(emailModalLead.email || "")}?subject=${encodeURIComponent(
                      emailSubject
                    )}&body=${encodeURIComponent(emailBody)}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors shadow-2xs"
                    title="Open in your default email client"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>Mail App</span>
                  </a>

                  {/* Copy Draft */}
                  <button
                    type="button"
                    onClick={handleCopyEmailDraft}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer shadow-2xs"
                    title="Copy full drafted email to clipboard"
                  >
                    {copiedEmailText ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setEmailModalLead(null)}
                    disabled={isSendingEmail}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-[#475569] font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    onClick={handleSendEmail}
                    disabled={isSendingEmail || !emailSubject.trim() || !emailBody.trim()}
                    className="px-5 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534] text-white font-extrabold text-xs shadow-md shadow-[#16A34A]/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
                  >
                    {isSendingEmail ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Email...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Email via System</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default function AdminLeadsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-bold text-[#16A34A]">Loading leads pipeline...</div>}>
      <LeadsContent />
    </Suspense>
  );
}
