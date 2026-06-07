// src/components/portfolio/Marquee.jsx
"use client";

import { MARQUEE_ITEMS } from "../_Data/PortofolioData.js";

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-black/[.07] py-4 mb-16">
      <div className="flex gap-12 whitespace-nowrap animate-marquee">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(
          (item, i) => (
            <span
              key={i}
              className="text-[11px] font-bold tracking-[.2em] uppercase text-black/25 shrink-0"
            >
              {item}
              <span className="ml-12 text-black/15">✦</span>
            </span>
          ),
        )}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 18s linear infinite;
        }
      `}</style>
    </div>
  );
}
