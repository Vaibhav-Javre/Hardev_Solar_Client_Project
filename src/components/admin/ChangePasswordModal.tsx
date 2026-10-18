"use client";

import React, { useState } from "react";
import {
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  ShieldCheck,
} from "lucide-react";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

export function ChangePasswordModal({
  isOpen,
  onClose,
  userEmail,
}: ChangePasswordModalProps) {
  const [email, setEmail] = useState(userEmail || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const targetEmail = userEmail || email.trim();
    if (!targetEmail) {
      setErrorMessage("Please enter your admin email address.");
      return;
    }

    if (!currentPassword) {
      setErrorMessage("Please enter your current password.");
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      setErrorMessage("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirmation do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setErrorMessage("New password must be different from current password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: targetEmail,
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || "Failed to update password. Please check your credentials.");
        return;
      }

      setSuccessMessage(data.message || "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Automatically close modal after brief delay
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 2500);
    } catch {
      setErrorMessage("Network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setErrorMessage(null);
    setSuccessMessage(null);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full border-2 border-[#DCFCE7] shadow-2xl p-6 sm:p-8 space-y-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#DCFCE7] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DCFCE7] border border-[#BBF7D0] flex items-center justify-center text-[#16A34A] shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-[#0F291E] tracking-tight">
                Change Admin Password
              </h3>
              <p className="text-xs text-[#475569]">
                {userEmail
                  ? `Logged in as: ${userEmail}`
                  : "Update your administrative portal credentials."}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-xl text-[#475569] hover:bg-slate-100 hover:text-[#0F291E] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Notification */}
        {successMessage && (
          <div className="p-3.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl text-[#15803D] text-xs font-bold flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16A34A]" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input if not provided */}
          {!userEmail && (
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#0F291E] mb-1">
                Admin Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="chandrakantpalse@gmail.com"
                required
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#DCFCE7] rounded-xl text-xs sm:text-sm text-[#0F291E] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
              />
            </div>
          )}

          {/* Current Password */}
          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#0F291E] mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                required
                className="w-full pl-3.5 pr-10 py-2.5 bg-[#F8FAFC] border border-[#DCFCE7] rounded-xl text-xs sm:text-sm text-[#0F291E] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#64748B] hover:text-[#0F291E] cursor-pointer"
                aria-label={showCurrent ? "Hide current password" : "Show current password"}
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#0F291E] mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                minLength={8}
                required
                className="w-full pl-3.5 pr-10 py-2.5 bg-[#F8FAFC] border border-[#DCFCE7] rounded-xl text-xs sm:text-sm text-[#0F291E] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#64748B] hover:text-[#0F291E] cursor-pointer"
                aria-label={showNew ? "Hide new password" : "Show new password"}
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {newPassword.length > 0 && newPassword.length < 8 && (
              <p className="text-[10px] text-amber-600 mt-1 font-medium">
                Must be at least 8 characters ({newPassword.length}/8).
              </p>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#0F291E] mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                minLength={8}
                required
                className="w-full pl-3.5 pr-10 py-2.5 bg-[#F8FAFC] border border-[#DCFCE7] rounded-xl text-xs sm:text-sm text-[#0F291E] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#64748B] hover:text-[#0F291E] cursor-pointer"
                aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirmPassword.length > 0 && newPassword !== confirmPassword && (
              <p className="text-[10px] text-red-600 mt-1 font-medium">
                Passwords do not match.
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-[#475569] hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                isSubmitting ||
                newPassword.length < 8 ||
                newPassword !== confirmPassword ||
                !currentPassword
              }
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534] text-white text-xs font-black transition-all cursor-pointer shadow-md shadow-[#16A34A]/25 disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Save Password</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Security badge note */}
        <div className="pt-3 border-t border-[#DCFCE7] flex items-center justify-center gap-1.5 text-[11px] text-[#64748B]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
          <span>Passwords are encrypted with PBKDF2-SHA512.</span>
        </div>
      </div>
    </div>
  );
}
