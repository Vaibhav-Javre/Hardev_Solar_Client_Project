"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, Sun, ArrowRight, Eye, EyeOff, Loader2, ShieldCheck, AlertCircle, KeyRound } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Logo } from "@/components/ui/Logo";
import { ChangePasswordModal } from "@/components/admin/ChangePasswordModal";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage("Invalid login credentials.");
        return;
      }

      // Successful login
      router.push(redirectTo);
      router.refresh();
    } catch {
      setErrorMessage("Invalid login credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0FDF4] via-white to-[#F0FDF4] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-[#0F291E] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DCFCE7]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#BBF7D0]/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header / Brand */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <Link href="/" className="inline-flex flex-col items-center mb-4 group">
          <Logo
            priority
            className="h-14 sm:h-16 w-auto group-hover:opacity-95 transition-opacity mb-2"
          />
          <div className="text-[10px] uppercase font-extrabold tracking-widest text-[#16A34A] px-2.5 py-0.5 rounded-full bg-[#DCFCE7] border border-[#BBF7D0]">
            Operational Portal
          </div>
        </Link>

        <h1 className="text-2xl sm:text-3xl font-black text-[#0F291E] tracking-tight">
          Admin Sign In
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#475569]">
          Secure workspace for authorized staff and management.
        </p>
      </div>

      {/* Login Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-[#16A34A]/5 rounded-3xl border-2 border-[#DCFCE7]">
          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-xs sm:text-sm animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-extrabold uppercase tracking-wider text-[#0F291E] mb-1.5"
              >
                Staff Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#475569]/70">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={SITE_CONFIG.email}
                  autoComplete="email"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F0FDF4]/60 border border-[#DCFCE7] rounded-xl text-xs sm:text-sm text-[#0F291E] placeholder:text-[#475569]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-extrabold uppercase tracking-wider text-[#0F291E] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#475569]/70">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 pr-11 py-2.5 bg-[#F0FDF4]/60 border border-[#DCFCE7] rounded-xl text-xs sm:text-sm text-[#0F291E] placeholder:text-[#475569]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#475569] hover:text-[#0F291E] cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Change Password Link */}
            <div className="flex items-center justify-end -mt-1">
              <button
                type="button"
                onClick={() => setChangePasswordOpen(true)}
                className="text-xs font-bold text-[#16A34A] hover:text-[#15803D] hover:underline cursor-pointer inline-flex items-center gap-1 transition-colors"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Change Password?</span>
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534] text-white font-black rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#16A34A]/25 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security footnote */}
          <div className="mt-6 pt-5 border-t border-[#DCFCE7] flex items-center justify-center gap-2 text-center text-[11px] text-[#475569]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Authorized access only. All sessions are audited.</span>
          </div>
        </div>

        {/* Change Password Modal */}
        <ChangePasswordModal
          isOpen={changePasswordOpen}
          onClose={() => setChangePasswordOpen(false)}
          userEmail={email}
        />

        {/* Back to public website */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs font-bold text-[#16A34A] hover:text-[#15803D] hover:underline transition-colors"
          >
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F0FDF4] flex items-center justify-center text-sm font-bold text-[#16A34A]">Loading portal...</div>}>
      <LoginForm />
    </Suspense>
  );
}
