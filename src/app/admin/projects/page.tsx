"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FolderKanban,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  X,
  Loader2,
  CheckCircle2,
  MapPin,
  Zap,
  ShieldAlert,
  ExternalLink,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";

interface ProjectItem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  capacity: string;
  location: string;
  type: "Residential" | "Commercial" | "Rooftop" | "Solar PV";
  images: string[];
  published: boolean;
  createdAt: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("5 kW");
  const [location, setLocation] = useState("");
  const [type, setType] = useState<ProjectItem["type"]>("Residential");
  const [imagesText, setImagesText] = useState("");
  const [published, setPublished] = useState(true);

  // Delete Confirm State
  const [deleteConfirmProject, setDeleteConfirmProject] = useState<ProjectItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/projects", {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load projects.");
      }
      setProjects(data.projects || []);
    } catch (err: any) {
      setError(err.message || "Error communicating with server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const openAddModal = () => {
    setEditingProject(null);
    setTitle("");
    setSlug("");
    setDescription("");
    setCapacity("5 kW");
    setLocation("");
    setType("Residential");
    setImagesText("");
    setPublished(true);
    setModalError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (p: ProjectItem) => {
    setEditingProject(p);
    setTitle(p.title);
    setSlug(p.slug);
    setDescription(p.description);
    setCapacity(p.capacity);
    setLocation(p.location);
    setType(p.type);
    setImagesText((p.images || []).join("\n"));
    setPublished(p.published);
    setModalError(null);
    setIsModalOpen(true);
  };

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingProject) {
      const generated = val
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generated);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setModalError(null);

    const images = imagesText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title,
      slug,
      description,
      capacity,
      location,
      type,
      images,
      published,
    };

    try {
      const url = editingProject
        ? `/api/admin/projects/${editingProject._id}`
        : "/api/admin/projects";
      const method = editingProject ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to save project.");
      }

      setIsModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      setModalError(err.message || "An error occurred while saving.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle Publish
  const handleTogglePublish = async (p: ProjectItem) => {
    try {
      const res = await fetch(`/api/admin/projects/${p._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !p.published }),
      });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) =>
          prev.map((item) =>
            item._id === p._id ? { ...item, published: !item.published } : item
          )
        );
      }
    } catch (err) {
      console.error("Toggle publish error:", err);
    }
  };

  // Delete Project
  const handleDelete = async () => {
    if (!deleteConfirmProject) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/projects/${deleteConfirmProject._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setDeleteConfirmProject(null);
        fetchProjects();
      } else {
        alert(data.message || "Failed to delete project.");
      }
    } catch {
      alert("Error deleting project.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AdminLayout
      title="Projects Showcase Management"
      subtitle="Add, edit, publish, or remove completed solar installation case studies."
    >
      <div className="space-y-6">
        {/* Top Action Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border-2 border-[#DCFCE7] shadow-xs flex items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#0F291E]">
              Solar Projects Portfolio
            </h2>
            <p className="text-xs text-[#475569]">
              Only projects set to &ldquo;Published&rdquo; will be visible on the public website.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="px-4 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-[#16A34A]/20 flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        </div>

        {/* Content Table / Cards */}
        {loading ? (
          <div className="bg-white rounded-3xl p-16 border-2 border-[#DCFCE7] text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#16A34A] mx-auto" />
            <p className="text-xs text-[#475569] font-medium">Loading projects catalog...</p>
          </div>
        ) : error ? (
          <div className="p-6 bg-red-50 border border-red-200 rounded-3xl text-red-700 text-sm">
            <p className="font-bold mb-1">Unable to load projects</p>
            <p className="text-xs">{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 border-2 border-[#DCFCE7] text-center space-y-4">
            <FolderKanban className="w-12 h-12 text-[#16A34A]/40 mx-auto" />
            <h3 className="font-black text-lg text-[#0F291E]">No projects have been added yet.</h3>
            <p className="text-xs text-[#475569] max-w-sm mx-auto">
              Click &ldquo;Add Project&rdquo; to input client-verified installations with actual plant capacity, location, and description.
            </p>
            <button
              type="button"
              onClick={openAddModal}
              className="px-4 py-2 bg-[#16A34A] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Add First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-3xl border-2 border-[#DCFCE7] p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#86EFAC] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">
                      {p.type}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(p)}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border cursor-pointer transition-colors ${
                        p.published
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {p.published ? (
                        <>
                          <Eye className="w-3 h-3 text-emerald-600" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3 text-slate-500" />
                          <span>Draft (Hidden)</span>
                        </>
                      )}
                    </button>
                  </div>

                  <h3 className="font-black text-[#0F291E] text-base leading-snug line-clamp-1">
                    {p.title}
                  </h3>
                  <div className="text-xs text-[#475569] mt-1 flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 font-bold text-[#16A34A]">
                      <Zap className="w-3 h-3" />
                      {p.capacity}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {p.location}
                    </span>
                  </div>

                  <p className="text-xs text-[#475569] mt-3 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-[#DCFCE7] flex items-center justify-between text-xs">
                  <a
                    href={`/projects/${p.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#16A34A] hover:underline font-bold"
                  >
                    <span>View Public</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => openEditModal(p)}
                      className="p-1.5 rounded-lg bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] cursor-pointer"
                      title="Edit Project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteConfirmProject(p)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 border border-transparent hover:border-red-200 cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add / Edit Project Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border-2 border-[#DCFCE7] shadow-2xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-[#DCFCE7] pb-3">
                <h3 className="text-lg font-black text-[#0F291E]">
                  {editingProject ? "Edit Solar Project" : "Add New Solar Project"}
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
                {/* Title */}
                <div>
                  <label className="block font-extrabold uppercase text-[10px] text-[#0F291E] mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. 5 kW Residential Rooftop Solar"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#F0FDF4]/60 border border-[#DCFCE7] rounded-xl text-[#0F291E] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block font-extrabold uppercase text-[10px] text-[#0F291E] mb-1">
                    URL Slug * (Unique)
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. 5-kw-residential-rooftop-solar"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#F0FDF4]/60 border border-[#DCFCE7] rounded-xl text-[#0F291E] font-mono focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                  />
                </div>

                {/* Capacity & Location */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-extrabold uppercase text-[10px] text-[#0F291E] mb-1">
                      Capacity (kW) *
                    </label>
                    <input
                      type="text"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      placeholder="e.g. 5 kW, 25 kW"
                      required
                      className="w-full px-3.5 py-2.5 bg-[#F0FDF4]/60 border border-[#DCFCE7] rounded-xl text-[#0F291E] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                    />
                  </div>

                  <div>
                    <label className="block font-extrabold uppercase text-[10px] text-[#0F291E] mb-1">
                      Location / City *
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Pune, Baner"
                      required
                      className="w-full px-3.5 py-2.5 bg-[#F0FDF4]/60 border border-[#DCFCE7] rounded-xl text-[#0F291E] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                    />
                  </div>
                </div>

                {/* Type */}
                <div>
                  <label className="block font-extrabold uppercase text-[10px] text-[#0F291E] mb-1">
                    Project Category
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#F0FDF4]/60 border border-[#DCFCE7] rounded-xl text-[#0F291E] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Rooftop">Rooftop</option>
                    <option value="Solar PV">Solar PV</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block font-extrabold uppercase text-[10px] text-[#0F291E] mb-1">
                    Project Description *
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the installation, roof structure, and plant objectives..."
                    required
                    className="w-full px-3.5 py-2.5 bg-[#F0FDF4]/60 border border-[#DCFCE7] rounded-xl text-[#0F291E] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                  />
                </div>

                {/* Images URLs (One per line) */}
                <div>
                  <label className="block font-extrabold uppercase text-[10px] text-[#0F291E] mb-1">
                    Image URLs (One per line, optional)
                  </label>
                  <textarea
                    rows={2}
                    value={imagesText}
                    onChange={(e) => setImagesText(e.target.value)}
                    placeholder="/images/projects/residential-5kw.jpg"
                    className="w-full px-3.5 py-2.5 bg-[#F0FDF4]/60 border border-[#DCFCE7] rounded-xl text-[#0F291E] font-mono text-[11px] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                  />
                </div>

                {/* Published Checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="published"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-[#16A34A] focus:ring-[#16A34A]"
                  />
                  <label htmlFor="published" className="font-bold text-[#0F291E] cursor-pointer">
                    Publish immediately to public showcase
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
                    {isSubmitting ? "Saving..." : editingProject ? "Update Project" : "Create Project"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full border-2 border-red-200 shadow-2xl p-6 sm:p-8 space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto border border-red-200">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#0F291E]">
                Delete &ldquo;{deleteConfirmProject.title}&rdquo;?
              </h3>
              <p className="text-xs text-[#475569]">
                This will permanently delete this project from the database. Public links to this slug will cease to function.
              </p>
              <div className="flex items-center justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmProject(null)}
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
                  {isDeleting ? "Deleting..." : "Delete Project"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
