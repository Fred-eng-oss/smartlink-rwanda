"use client";
import React from "react";

const partners = [
  "Cisco",
  "Microsoft",
  "Google",
  "AWS",
  "CompTIA",
  "Linux Foundation",
  "Huawei",
  "Oracle",
  "Adobe",
  "VMware",
];

export default function PartnersMarquee() {
  return (
    <section className="bg-white dark:bg-[#132D52] py-16 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <span className="inline-block text-xs font-bold bg-blue-50 text-[#0F62FE] rounded-full px-4 py-1.5 uppercase tracking-widest mb-4">
          Trusted Partners
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9] font-display">
          Technologies & Certifications We Work With
        </h2>
      </div>

      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-[#132D52] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-[#132D52] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-6 sm:mx-10 flex items-center justify-center h-16 sm:h-20 px-8 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-[#E2E8F0] dark:border-slate-700/50 hover:border-[#0F62FE]/30 hover:shadow-lg hover:shadow-[#0F62FE]/5 transition-all duration-300 group"
            >
              <span className="text-lg sm:text-xl font-extrabold text-[#94A3B8] dark:text-slate-500 group-hover:text-[#0F62FE] dark:group-hover:text-[#3D8BFF] transition-colors duration-300 font-display tracking-wide whitespace-nowrap">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
