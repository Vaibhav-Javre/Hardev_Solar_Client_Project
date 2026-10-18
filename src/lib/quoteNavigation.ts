"use client";

import React from "react";

/**
 * Universally scrolls to the Quote / Consultation form on any page.
 * Works reliably every single time it is clicked, regardless of the current URL hash.
 */
export function scrollToQuote(e?: React.MouseEvent | React.TouchEvent | Event) {
  if (e && typeof e.preventDefault === "function") {
    e.preventDefault();
  }

  if (typeof window === "undefined") return;

  // Find all possible consultation form elements on the page
  const candidates: (HTMLElement | null)[] = [
    document.getElementById("consultation"),
    document.getElementById("hero-consultation"),
    document.getElementById("consultation-form-card"),
    document.getElementById("consultation-form"),
    document.querySelector("[data-quote-form]"),
    document.querySelector("form#consultation"),
  ];

  const target = candidates.find((el): el is HTMLElement => Boolean(el));

  if (target) {
    // A consultation form exists on this page: smooth scroll directly to it
    const headerOffset = 70; // Clearance for the sticky navbar
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: "smooth",
    });

    // Auto-focus the first editable input (e.g., full name)
    setTimeout(() => {
      const firstInput = target.querySelector<HTMLInputElement>(
        'input[type="text"]:not([disabled]), input[type="tel"]:not([disabled]), input:not([type="hidden"]):not([disabled])'
      );
      if (firstInput) {
        firstInput.focus({ preventScroll: true });
      }
    }, 300);

    // Update history URL hash cleanly without breaking subsequent clicks
    if (window.location.hash !== "#consultation") {
      try {
        window.history.pushState(null, "", "#consultation");
      } catch {
        // Fallback for restricted iframe environments
      }
    }
  } else {
    // If no consultation form exists on current page (e.g. /about, /faq, /projects),
    // redirect to the primary homepage consultation section
    window.location.href = "/#consultation";
  }
}
