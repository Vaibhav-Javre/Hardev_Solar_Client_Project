import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = "" }) => {
  const allItems = [{ label: "Home", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `${SITE_CONFIG.website}${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-xs text-[#475569] ${className}`}
      >
        <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          {allItems.map((item, idx) => {
            const isLast = idx === allItems.length - 1;
            const isFirst = idx === 0;

            return (
              <li key={idx} className="flex items-center gap-1.5 sm:gap-2">
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#BBF7D0] shrink-0" />}

                {isLast || !item.href ? (
                  <span className="font-extrabold text-[#0F291E] truncate max-w-[200px] sm:max-w-none">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-[#16A34A] transition-colors flex items-center gap-1"
                  >
                    {isFirst && <Home className="w-3 h-3 text-[#16A34A]" />}
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
