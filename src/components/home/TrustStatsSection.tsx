import React from "react";
import { Sun, Users, ShieldCheck, HeartHandshake } from "lucide-react";

export const CompanyHighlights: React.FC = () => {
  const highlights = [
    {
      icon: Sun,
      value: "3 kW – 50 kW",
      title: "Project Capacity Range",
      description: "Customized solar PV installations tailored for residential and commercial rooftops.",
      badge: "Verified Scope",
    },
    {
      icon: Users,
      value: "Professional Engineers",
      title: "Experienced & Trained Team",
      description: "Trained technical staff dedicated to sound electrical design, safety, and proper execution.",
      badge: "Technical Team",
    },
    {
      icon: ShieldCheck,
      value: "Quality Materials",
      title: "High-Quality Components",
      description: "High-quality solar panels, certified inverters, and durable structural wiring.",
      badge: "Component Standards",
    },
    {
      icon: HeartHandshake,
      value: "Customer-Focused Service",
      title: "Professional Support",
      description: "Transparent guidance, clear communication, and dedicated long-term service assistance.",
      badge: "Dedicated Service",
    },
  ];

  return (
    <section className="relative -mt-6 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-xl shadow-[#15803D]/6 border-2 border-[#DCFCE7] p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-[#DCFCE7]/70">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`pt-5 sm:pt-0 ${
                  idx !== 0 ? "lg:pl-6" : ""
                } flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] border border-[#BBF7D0] flex items-center justify-center text-[#16A34A] group-hover:scale-105 group-hover:bg-[#16A34A] group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
                      {item.badge}
                    </span>
                  </div>

                  <div className="text-xl sm:text-2xl font-black text-[#0F291E] tracking-tight">
                    {item.value}
                  </div>
                  <h3 className="text-sm font-extrabold text-[#16A34A] mt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#475569] mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Also export alias for backward compatibility
export const TrustStatsSection = CompanyHighlights;
