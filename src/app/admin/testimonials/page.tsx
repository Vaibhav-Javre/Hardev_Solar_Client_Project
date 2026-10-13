"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  MessageSquareQuote,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  X,
  Loader2,
  Star,
  ShieldAlert,
  MapPin,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";

interface TestimonialItem {
  _id: string;
  customerName: string;
  location: string;
  review: string;
  rating: number;
  image?: string;
  published: boolean;
  createdAt: string;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // Form Fields
  const [customerName, setCustomerName] = useState("");
  const [location, setLocation] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [published, setPublished] = useState(false);

  // Delete Confirm State
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<TestimonialItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/testimonials", {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load testimonials.");
      }
      setTestimonials(data.testimonials || []);
    } catch (err: any) {
      setError(err.message || "Error communicating with server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const openAddModal = () => {
    setEditingItem(null);
    setCustomerName("");
    setLocation("");
    setReview("");
    setRating(5);
    setPublished(false);
    setModalError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (t: TestimonialItem) => {
    setEditingItem(t);
    setCustomerName(t.customerName);
    setLocation(t.location);
    setReview(t.review);
    setRating(t.rating);
    setPublished(t.published);
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setModalError(null);

    const payload = {
      customerName,
      location,
      review,
      rating,
      published,
    };

    try {
      const url = editingItem
        ? `/api/admin/testimonials/${editingItem._id}`
        : "/api/admin/testimonials";
      const method = editingItem ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to save testimonial.");
      }

      setIsModalOpen(false);
      fetchTestimonials();
    } catch (err: any) {
      setModalError(err.message || "An error occurred while saving.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle publish
  const handleTogglePublish = async (t: TestimonialItem) => {
    try {
      const res = await fetch(`/api/admin/testimonials/${t._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !t.published }),
      });
      const data = await res.json();
      if (data.success) {
        setTestimonials((prev) =>
          prev.map((item) =>
            item._id === t._id ? { ...item, published: !item.published } : item
          )
        );
      }
    } catch (err) {
      console.error("Toggle publish error:", err);
    }
  };

  // Delete Testimonial
  const handleDelete = async () => {
    if (!deleteConfirmItem) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/testimonials/${deleteConfirmItem._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setDeleteConfirmItem(null);
        fetchTestimonials();
      } else {
        alert(data.message || "Failed to delete testimonial.");
      }
    } catch {
      alert("Error deleting testimonial.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AdminLayout
      title="Customer Testimonials Management"
      subtitle="Publish verified feedback received from genuine rooftop solar clients."
    >
      <div className="space-y-6">
        {/* Top Action Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border-2 border-[#DCFCE7] shadow-xs flex items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#0F291E]">
              Client Reviews & Testimonials
            </h2>
            <p className="text-xs text-[#475569]">
              To maintain strict brand integrity, only client-authenticated testimonials should be marked &ldquo;Published&rdquo;.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="px-4 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-[#16A34A]/20 flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </button>
        </div>

        {/* Content Table / Cards */}
        {loading ? (
          <div className="bg-white rounded-3xl p-16 border-2 border-[#DCFCE7] text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#16A34A] mx-auto" />
            <p className="text-xs text-[#475569] font-medium">Loading testimonials records...</p>
          </div>
        ) : error ? (
          <div className="p-6 bg-red-50 border border-red-200 rounded-3xl text-red-700 text-sm">
            <p className="font-bold mb-1">Unable to load testimonials</p>
            <p className="text-xs">{error}</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 border-2 border-[#DCFCE7] text-center space-y-4">
            <MessageSquareQuote className="w-12 h-12 text-[#16A34A]/40 mx-auto" />
            <h3 className="font-black text-lg text-[#0F291E]">No testimonials have been added yet.</h3>
            <p className="text-xs text-[#475569] max-w-sm mx-auto">
              Real testimonials provided by clients can be added here. In compliance with strict authenticity guidelines, zero fake testimonials are generated.
            </p>
            <button
              type="button"
              onClick={openAddModal}
              className="px-4 py-2 bg-[#16A34A] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Add Client Testimonial
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t._id}
                className="bg-white rounded-3xl border-2 border-[#DCFCE7] p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#86EFAC] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    {/* Rating stars */}
                    <div className="flex items-center gap-1 text-[#F59E0B]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < t.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "text-slate-200"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleTogglePublish(t)}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border cursor-pointer transition-colors ${
                        t.published
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {t.published ? (
                        <>
                          <Eye className="w-3 h-3 text-emerald-600" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3 text-slate-500" />
                          <span>Draft (Unpublished)</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-[#0F291E] leading-relaxed italic line-clamp-4">
                    &ldquo;{t.review}&rdquo;
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#DCFCE7] flex items-center justify-between">
                    <div>
                      <div className="font-extrabold text-[#0F291E] text-xs">
                        {t.customerName}
                      </div>
                      <div className="text-[11px] text-[#475569] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{t.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex items-center justify-end gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => openEditModal(t)}
                    className="p-1.5 rounded-lg bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] cursor-pointer"
                    title="Edit Testimonial"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteConfirmItem(t)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 border border-transparent hover:border-red-200 cursor-pointer"
                    title="Delete Testimonial"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add / Edit Testimonial Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto border-2 border-[#DCFCE7] shadow-2xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-[#DCFCE7] pb-3">
                <h3 className="text-lg font-black text-[#0F291E]">
                  {editingItem ? "Edit Testimonial" : "Add Client Testimonial"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-xl text-[#475569] hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {modalError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs">
                  {modalError}
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                {/* Customer Name */}
                <div>
                  <label className="block font-extrabold uppercase text-[10px] text-[#0F291E] mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ramesh Kulkarni"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#F0FDF4]/60 border border-[#DCFCE7] rounded-xl text-[#0F291E] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block font-extrabold uppercase text-[10px] text-[#0F291E] mb-1">
                    City / Project Location *
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Baner, Pune"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#F0FDF4]/60 border border-[#DCFCE7] rounded-xl text-[#0F291E] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                  />
                </div>

                {/* Rating (1-5) */}
                <div>
                  <label className="block font-extrabold uppercase text-[10px] text-[#0F291E] mb-1">
                    Rating (Stars)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= rating
                              ? "fill-[#F59E0B] text-[#F59E0B]"
                              : "text-slate-200"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="font-bold text-[#475569] ml-2">{rating} / 5</span>
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block font-extrabold uppercase text-[10px] text-[#0F291E] mb-1">
                    Customer Review *
                  </label>
                  <textarea
                    rows={4}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Customer feedback on plant performance, engineering quality, or installation process..."
                    required
                    className="w-full px-3.5 py-2.5 bg-[#F0FDF4]/60 border border-[#DCFCE7] rounded-xl text-[#0F291E] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                  />
                </div>

                {/* Published Checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="t-published"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-[#16A34A] focus:ring-[#16A34A]"
                  />
                  <label htmlFor="t-published" className="font-bold text-[#0F291E] cursor-pointer">
                    Publish to public customer review section
                  </label>
                </div>

                {/* Modal Buttons */}
                <div className="pt-4 border-t border-[#DCFCE7] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-[#0F291E] font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold cursor-pointer shadow-xs disabled:opacity-60"
                  >
                    {isSubmitting ? "Saving..." : editingItem ? "Update Testimonial" : "Create Testimonial"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full border-2 border-red-200 shadow-2xl p-6 sm:p-8 space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto border border-red-200">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#0F291E]">
                Delete review by &ldquo;{deleteConfirmItem.customerName}&rdquo;?
              </h3>
              <p className="text-xs text-[#475569]">
                This action will permanently delete this testimonial from MongoDB.
              </p>
              <div className="flex items-center justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmItem(null)}
                  disabled={isDeleting}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-[#0F291E] font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs cursor-pointer disabled:opacity-60"
                >
                  {isDeleting ? "Deleting..." : "Delete Testimonial"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
