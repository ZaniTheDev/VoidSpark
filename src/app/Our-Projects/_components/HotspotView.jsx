// src/components/portfolio/HotspotView.jsx
"use client";

import { useState } from "react";
import { HOTSPOTS } from "../_Data/PortofolioData.js"; // Add .js extension

// Rest of component...
export default function HotspotView() {
  const [activePin, setActivePin] = useState(null);

  return (
    <div className="bg-white border border-black/8 rounded-2xl overflow-hidden">
      <div className="px-7 py-6 border-b border-black/6">
        <p className="text-[10px] font-bold tracking-[.18em] uppercase text-black/35 mb-1.5">
          Design Annotation · Web Design
        </p>
        <h3 className="text-xl font-extrabold tracking-tight">
          Hover pin untuk lihat alasan di balik setiap keputusan desain.
        </h3>
      </div>

      <div className="relative p-6 bg-[#f8f8f6]">
        {/* Mockup */}
        <div className="bg-[#f0f0ee] border border-black/10 rounded-xl overflow-hidden relative">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-black/6">
            <span className="text-[13px] font-black tracking-tight">
              VoidSpark
            </span>
            <div className="flex items-center gap-4">
              {["About", "Services", "Work"].map((l) => (
                <span key={l} className="text-[11px] text-black/40 font-medium">
                  {l}
                </span>
              ))}
              <span className="bg-black text-white text-[10px] font-semibold px-3.5 py-1.5 rounded-full tracking-wide">
                Get started
              </span>
            </div>
          </div>
          <div className="px-6 py-8">
            <p className="text-[9px] font-bold tracking-[.2em] uppercase text-black/30 mb-2.5">
              VoidSpark · Web Design
            </p>
            <p
              className="font-black tracking-tight leading-none mb-5"
              style={{ fontSize: "clamp(28px,5vw,40px)" }}
            >
              Improve Your
              <br />
              <span className="text-black/20">Personal</span>
              <br />
              Branding.
            </p>
            <div className="flex gap-2.5">
              <button className="bg-black text-white px-6 py-2.5 rounded-full text-[12px] font-semibold">
                Get started →
              </button>
              <button className="border border-black/15 text-black px-6 py-2.5 rounded-full text-[12px] font-semibold">
                See our work
              </button>
            </div>
          </div>
        </div>

        {/* Hotspot pins */}
        {HOTSPOTS.map((h) => (
          <div key={h.id} className="absolute z-20" style={h.style}>
            <button
              className="w-7 h-7 rounded-full bg-black border-2 border-white shadow-lg flex items-center justify-center text-white text-[11px] font-black"
              style={{
                animation: "pulse 2.5s ease-in-out infinite",
                transform: "translate(-50%,-50%)",
              }}
              onMouseEnter={() => setActivePin(h.id)}
              onMouseLeave={() => setActivePin(null)}
              aria-label={`Info point ${h.id}`}
            >
              {h.id}
            </button>

            {activePin === h.id && (
              <div
                className="absolute z-30 bg-black text-white rounded-xl px-4 py-3 text-[12px] leading-relaxed max-w-[200px] shadow-2xl"
                style={h.tipPos}
              >
                {h.tip}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="px-7 py-4 border-t border-black/6 flex flex-wrap gap-2">
        {[
          ["1", "Posisi logo"],
          ["2", "CTA navbar"],
          ["3", "Bentuk tombol"],
          ["4", "Warna CTA"],
        ].map(([n, lbl]) => (
          <div
            key={n}
            className="flex items-center gap-1.5 bg-[#f8f8f6] border border-black/8 rounded-full px-3 py-1.5 text-[11px] font-medium text-black/60"
          >
            <div className="w-5 h-5 rounded-full bg-black text-white text-[10px] font-black flex items-center justify-center">
              {n}
            </div>
            {lbl}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.18);
          }
        }
      `}</style>
    </div>
  );
}
