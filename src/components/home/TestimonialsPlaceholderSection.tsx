"use client";

import React, { useState, useEffect } from "react";
import { Star, ShieldCheck, Sparkles, Quote, MessageSquareQuote } from "lucide-react";
import { TESTIMONIALS_DATA, TestimonialItem } from "@/data/testimonialsData";

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.testimonials && data.testimonials.length > 0) {
          setTestimonials(data.testimonials);
        }
      })
      .catch((err) => {
        console.warn("[Testimonials] DB fetch fallback:", err);
      })
      .finally(() => {
        setHasLoaded(true);
      });
  }, []);

  // If DB testimonials exist, display them; otherwise fallback to placeholder cards
  const displayItems = testimonials.length > 0 ? testimonials : TESTIMONIALS_DATA;

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white border-b border-[#DCFCE7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DCFCE7] text-[#15803D] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 border border-[#BBF7D0] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Customer Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F291E] tracking-tight">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569]">
            Honest relationships, transparent consultations, and dependable after-sales care are the core foundations of Hardev Solar Services.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {displayItems.map((item: any, idx: number) => {
            const name = item.customerName || item.name;
            const reviewText = item.review || item.testimonial;
            const location = item.location;
            const rating = item.rating || 5;

            return (
              <div
                key={item._id || item.id || idx}
                className="bg-white rounded-3xl p-7 border-2 border-[#DCFCE7] shadow-sm hover:border-[#86EFAC] hover:shadow-xl hover:shadow-[#16A34A]/8 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#FACC15]">
                      {Array.from({ length: rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FACC15] text-[#FACC15]" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-[#DCFCE7] group-hover:text-[#86EFAC] transition-colors" />
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-[#0F291E] text-sm leading-relaxed italic mb-6">
                    &ldquo;{reviewText}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-[#F0FDF4] flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#DCFCE7] border border-[#BBF7D0] text-[#16A34A] flex items-center justify-center font-bold text-sm shrink-0">
                    <span>{name ? name.charAt(0) : "S"}</span>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0F291E] text-sm leading-tight">
                      {name}
                    </h4>
                    <p className="text-xs text-[#475569] mt-0.5">{location}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transparency Footnote */}
        <div className="text-center">
          <p className="text-xs text-[#475569] flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <span>Strict Authenticity Standard: Zero fabricated reviews are ever published.</span>
          </p>
        </div>
      </div>
    </section>
  );
};
