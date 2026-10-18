"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  MessageSquareQuote,
  LogOut,
  Menu,
  X,
  Sun,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  KeyRound,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Logo } from "@/components/ui/Logo";
import { ChangePasswordModal } from "@/components/admin/ChangePasswordModal";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    label: "Leads Management",
    href: "/admin/leads",
    icon: Users,
    badge: null,
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
    badge: null,
  },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquareQuote,
    badge: null,
  },
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  useEffect(() => {
    // Fetch authenticated user info
    fetch("/api/admin/auth/me")
      .then((res) => {
        if (!res.ok) {
          router.replace("/admin/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.success && data.user) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {
        router.replace("/admin/login");
      });
  }, [router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      router.push("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F291E] flex flex-col lg:flex-row">
      {/* Mobile Header Bar */}
      <div className="lg:hidden bg-white border-b border-[#DCFCE7] px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <Link href="/admin" className="flex items-center gap-2.5">
          <Logo className="h-8 w-auto" />
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
            Admin
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setChangePasswordOpen(true)}
            className="p-2 rounded-xl text-[#16A34A] bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#DCFCE7] transition-colors cursor-pointer"
            title="Change Password"
            aria-label="Change Password"
          >
            <KeyRound className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl text-[#0F291E] hover:bg-[#F0FDF4] border border-[#DCFCE7] transition-colors cursor-pointer"
            aria-label={mobileOpen ? "Close admin navigation menu" : "Open admin navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 left-0 bottom-0 z-50 w-72 bg-white border-r border-[#DCFCE7] flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="p-5 border-b border-[#DCFCE7] flex items-center justify-between">
            <Link href="/admin" className="flex flex-col gap-1.5 group">
              <Logo className="h-9 w-auto group-hover:opacity-95 transition-opacity" />
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#16A34A] flex items-center gap-1.5 pl-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                Admin Workspace
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-[#475569] hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#64748B]">
              Management Navigation
            </div>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? "bg-[#16A34A] text-white shadow-sm shadow-[#16A34A]/20"
                      : "text-[#475569] hover:bg-[#F0FDF4] hover:text-[#0F291E]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#16A34A]"}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/70" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#DCFCE7] space-y-3">
          {/* Current user pill */}
          <div className="p-3 bg-[#F0FDF4] rounded-xl border border-[#BBF7D0]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F291E] truncate">
              <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span className="truncate">{currentUser?.name || "Administrator"}</span>
            </div>
            <div className="text-[11px] text-[#475569] truncate mt-0.5 pl-6">
              {currentUser?.email || SITE_CONFIG.email}
            </div>
          </div>

          {/* Change Password button */}
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              setChangePasswordOpen(true);
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#0F291E] bg-[#F0FDF4] hover:bg-[#DCFCE7] transition-colors border border-[#BBF7D0] cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <KeyRound className="w-4 h-4 text-[#16A34A]" />
              <span>Change Password</span>
            </div>
          </button>

          {/* External Public Website Link */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#475569] hover:bg-[#F0FDF4] hover:text-[#0F291E] transition-colors border border-transparent hover:border-[#DCFCE7]"
          >
            <div className="flex items-center gap-2.5">
              <ExternalLink className="w-4 h-4 text-[#16A34A]" />
              <span>View Public Website</span>
            </div>
          </Link>

          {/* Logout button */}
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors border border-red-100 cursor-pointer disabled:opacity-60"
          >
            <LogOut className="w-4 h-4" />
            <span>{isLoggingOut ? "Signing Out..." : "Sign Out"}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-[#DCFCE7] py-4 px-6 sm:px-8 hidden lg:flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div>
            <h1 className="text-xl font-black text-[#0F291E] tracking-tight">
              {title || "Dashboard Overview"}
            </h1>
            {subtitle && (
              <p className="text-xs text-[#475569] mt-0.5">{subtitle}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setChangePasswordOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#15803D] text-xs font-bold rounded-xl border border-[#BBF7D0] transition-colors cursor-pointer shadow-2xs"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Change Password</span>
            </button>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DCFCE7] text-[#15803D] text-xs font-bold rounded-full border border-[#BBF7D0]">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              <span>Admin Active</span>
            </span>
          </div>
        </header>

        {/* Page body */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
      </main>

      {/* Change Password Dialog Modal */}
      <ChangePasswordModal
        isOpen={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
        userEmail={currentUser?.email}
      />
    </div>
  );
};

