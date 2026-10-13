"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG, getWhatsAppUrl, getPhoneCallUrl, getSecondaryPhoneCallUrl } from "@/lib/site-config";
import {
  Phone,
  Sun,
  ChevronDown,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);
  }

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    {
      label: "Solutions",
      href: "/services",
      hasDropdown: true,
      dropdownItems: [
        { label: "Solar System Installation", href: "/services#solar-system-installation", desc: "Turnkey rooftop and ground solar installation" },
        { label: "On-Grid Solar Systems", href: "/services#on-grid-solar", desc: "Grid-tied solar with net-metering integration" },
        { label: "Off-Grid Solar Systems", href: "/services#off-grid-solar", desc: "Battery-backed independent solar systems" },
        { label: "Solar Water Heaters", href: "/services#solar-water-heaters", desc: "Clean solar thermal water heating solutions" },
        { label: "Utility-Scale Solar Projects", href: "/services#utility-scale-solar", desc: "High-capacity industrial & commercial solar" },
        { label: "Residential Solar", href: "/services/residential-solar", desc: "Tailored solar solutions for homes & bungalows" },
        { label: "Commercial Solar", href: "/services/commercial-solar", desc: "Energy cost-cutting for businesses & offices" },
      ],
    },
    { label: "Projects", href: "/projects" },
    { label: "Solar Calculator", href: "/solar-calculator" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* Top Brand & Contact Strip */}
      <div className="bg-[#F0FDF4] text-[#0F291E] text-xs py-2 px-4 border-b border-[#DCFCE7]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3 text-[11px] sm:text-xs font-medium">
            <span className="inline-flex items-center gap-1.5 text-[#16A34A] font-bold">
              <Sun className="w-3.5 h-3.5 fill-[#FACC15] text-[#F59E0B]" />
              Solar Solutions Across Maharashtra
            </span>
            <span className="hidden md:inline text-[#86EFAC]">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-[#475569]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
              In partnership with Swayam Infraverse
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href={getPhoneCallUrl(SITE_CONFIG.primaryPhone)}
              className="inline-flex items-center gap-1.5 text-[#475569] hover:text-[#16A34A] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>{SITE_CONFIG.displayPrimaryPhone}</span>
            </a>
            <span className="text-[#86EFAC]">|</span>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Hardev Solar Services on WhatsApp"
              className="inline-flex items-center gap-1 text-[#16A34A] hover:text-[#15803D] font-bold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#DCFCE7] py-2.5"
            : "bg-white border-b border-[#F0FDF4] py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo on Left */}
          <Link href="/" className="flex items-center gap-3 group">
            <Logo
              priority
              className="h-11 sm:h-12 w-auto group-hover:opacity-95 transition-opacity"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() => setSolutionsDropdownOpen(true)}
                    onMouseLeave={() => setSolutionsDropdownOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className="px-3 py-2 rounded-lg text-sm font-bold text-[#0F291E] hover:text-[#16A34A] hover:bg-[#F0FDF4] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-4 h-4 text-[#475569] group-hover:rotate-180 transition-transform" />
                    </Link>

                    {/* Solutions Submenu */}
                    <div
                      className={`absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-[#DCFCE7] py-2 transition-all duration-200 transform origin-top z-50 ${
                        solutionsDropdownOpen
                          ? "opacity-100 translate-y-1 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      }`}
                    >
                      {item.dropdownItems?.map((drop) => (
                        <Link
                          key={drop.label}
                          href={drop.href}
                          className="block px-4 py-2.5 hover:bg-[#F0FDF4] transition-colors group/item"
                        >
                          <div className="font-bold text-sm text-[#0F291E] group-hover/item:text-[#16A34A]">
                            {drop.label}
                          </div>
                          <div className="text-xs text-[#475569]">{drop.desc}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                    pathname === item.href
                      ? "text-[#16A34A] bg-[#F0FDF4]"
                      : "text-[#0F291E] hover:text-[#16A34A] hover:bg-[#F0FDF4]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/#consultation"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534] text-white font-extrabold text-sm shadow-md shadow-[#16A34A]/20 transition-all border border-[#16A34A]"
            >
              <span>Get Consultation</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-2 rounded-lg text-[#16A34A] bg-[#F0FDF4] border border-[#BBF7D0]"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#0F291E] hover:bg-[#F0FDF4] border border-[#DCFCE7] transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto border-t-2 border-[#BBF7D0]">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCFCE7]">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                <Logo className="h-10 w-auto" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-xl font-bold text-base text-[#0F291E] hover:bg-[#F0FDF4] hover:text-[#16A34A]"
                  >
                    {item.label}
                  </Link>
                  {item.hasDropdown && (
                    <div className="pl-4 space-y-1 py-1 border-l-2 border-[#DCFCE7] ml-3">
                      {item.dropdownItems?.map((drop) => (
                        <Link
                          key={drop.label}
                          href={drop.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1.5 px-2 text-xs font-semibold text-[#475569] hover:text-[#16A34A]"
                        >
                          {drop.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="pt-4 border-t border-[#DCFCE7] space-y-2">
              <Link
                href="/#consultation"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 rounded-xl bg-[#16A34A] text-white font-extrabold text-sm text-center block shadow-md"
              >
                Get a Free Consultation
              </Link>

              <div className="pt-2 text-xs text-[#475569] space-y-1">
                <div>Contact: {SITE_CONFIG.contactName}</div>
                <div>Primary: <a href={getPhoneCallUrl(SITE_CONFIG.primaryPhone)} className="text-[#16A34A] font-bold">{SITE_CONFIG.displayPrimaryPhone}</a></div>
                <div>Alternative: <a href={getSecondaryPhoneCallUrl()} className="text-[#16A34A] font-bold">{SITE_CONFIG.displaySecondaryPhone}</a></div>
                <div>Email: {SITE_CONFIG.email}</div>
                <div>Address: {SITE_CONFIG.address}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
