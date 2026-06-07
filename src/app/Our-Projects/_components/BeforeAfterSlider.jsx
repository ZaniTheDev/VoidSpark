// src/components/portfolio/BeforeAfterSlider.jsx
"use client";

// Our-Projects/_components/BeforeAfterSlider.jsx
"use client";

import { useRef } from "react";
import { useDragSlider } from "../_Hooks/useDragSlider.js"; // Add .js extension
import { METRICS } from "../_Data/PortofolioData.js"; // Add .js extension

// Rest of component...
export default function BeforeAfterSlider() {
  const containerRef = useRef(null);
  const afterRef = useRef(null);
  const handleRef = useRef(null);

  useDragSlider(containerRef, afterRef, handleRef);

  return (
    <div className="bg-white border border-black/8 rounded-2xl overflow-hidden">
      <div className="px-7 py-6 border-b border-black/6">
        <p className="text-[10px] font-bold tracking-[.18em] uppercase text-black/35 mb-1.5">
          Misi 01 · Web Redesign
        </p>
        <h3 className="text-xl font-extrabold tracking-tight">
          Drag untuk membandingkan — sebelum vs sesudah.
        </h3>
      </div>

      {/* Slider area */}
      <div
        ref={containerRef}
        className="relative h-72 overflow-hidden cursor-ew-resize select-none"
      >
        {/* BEFORE */}
        <div className="absolute inset-0 bg-[#e8e0d0] flex flex-col items-center p-6">
          <div className="w-full bg-[#003366] rounded px-4 py-2.5 flex items-center justify-between mb-4">
            <span
              className="text-white text-[13px] font-bold"
              style={{ fontFamily: "serif" }}
            >
              KOPIKU JAYA
            </span>
            <div className="flex gap-3">
              {["Home", "Menu", "Kontak"].map((l) => (
                <span key={l} className="text-white/70 text-[10px] underline">
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div className="w-full bg-white border-2 border-[#003366] rounded p-5 text-center">
            <p className="text-red-600 text-[11px] font-bold tracking-wide mb-2">
              ✦ PROMO HARI INI ✦ DISKON 20% ✦
            </p>
            <p
              className="text-[22px] font-black text-[#003366]"
              style={{ fontFamily: "serif" }}
            >
              Selamat Datang Di Kopiku Jaya!
            </p>
            <p className="text-[11px] text-gray-500 mt-1">
              Kopi terbaik se-Jakarta sejak 2003
            </p>
            <button className="mt-3 bg-orange-500 text-white text-[11px] font-bold px-4 py-2">
              KLIK DI SINI UNTUK PESAN !!!
            </button>
            <p className="text-[10px] text-black/40 mt-2">
              ⏳ Load time: 8.4 detik
            </p>
          </div>
        </div>

        {/* AFTER */}
        <div
          ref={afterRef}
          className="absolute inset-0"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        >
          <div className="w-full h-full bg-[#f0f0ee] flex flex-col items-center p-6">
            <div className="w-full flex items-center justify-between mb-5 px-1">
              <span className="text-[14px] font-black tracking-tight">
                Kopiku
              </span>
              <div className="flex gap-4 items-center">
                {["Menu", "Tentang", "Kontak"].map((l) => (
                  <span
                    key={l}
                    className="text-[11px] text-black/40 font-medium"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-full">
              <p className="text-[9px] font-bold tracking-[.2em] uppercase text-black/30 mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
                Kopiku Jaya · Jakarta
              </p>
              <p className="text-4xl font-black tracking-tight leading-none mb-4">
                Kopi yang
                <br />
                Bikin <span className="text-black/20">Kamu</span>
                <br />
                Balik Lagi.
              </p>
              <div className="flex gap-2.5">
                <button className="bg-black text-white px-5 py-2 rounded-full text-[11px] font-semibold">
                  Pesan Sekarang →
                </button>
                <button className="border border-black/15 text-black px-5 py-2 rounded-full text-[11px] font-semibold">
                  Lihat Menu
                </button>
              </div>
              <p className="text-[10px] text-black/35 mt-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
                Load time: 1.1 detik
              </p>
            </div>
          </div>
        </div>

        {/* Handle */}
        <div
          ref={handleRef}
          className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
          style={{ left: "50%", transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border-2 border-black/12 flex items-center justify-center text-sm shadow-lg">
            ⇔
          </div>
        </div>
      </div>

      <div className="flex justify-between px-7 py-3 border-t border-black/6 text-[11px] font-semibold tracking-wide uppercase text-black/35">
        <span>😭 Sebelum</span>
        <span>🚀 Sesudah</span>
      </div>

      <div className="grid grid-cols-3 border-t border-black/6 divide-x divide-black/6">
        {METRICS.map(([val, lbl]) => (
          <div key={lbl} className="text-center py-5">
            <p className="text-2xl font-black tracking-tight">{val}</p>
            <p className="text-[10px] font-semibold tracking-[.12em] uppercase text-black/35 mt-1">
              {lbl}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
