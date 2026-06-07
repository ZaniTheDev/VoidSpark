// src/components/portfolio/BoringMeter.jsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function BoringMeter({ score }) {
  const fillRef = useRef(null);

  useEffect(() => {
    if (!fillRef.current) return;
    gsap.to(fillRef.current, {
      width: `${score}%`,
      duration: 1.2,
      ease: "power3.out",
    });
  }, [score]);

  const getLabel = () => {
    if (score > 70)
      return `Sebelum VoidSpark: ${(score / 10).toFixed(1)}/10 😴`;
    if (score > 30) return `Dalam proses... ${(score / 10).toFixed(1)}/10 🛠`;
    return `Setelah VoidSpark: ${(score / 10).toFixed(1)}/10 🔥`;
  };

  return (
    <div className="flex items-center gap-5 bg-white border border-black/8 rounded-xl px-6 py-5 mb-10">
      <span className="text-[10px] font-bold tracking-[.18em] uppercase text-black/35 whitespace-nowrap">
        Boring meter
      </span>
      <div className="flex-1 h-2 bg-black/7 rounded-full overflow-hidden relative">
        <div
          ref={fillRef}
          className="h-full rounded-full bg-black"
          style={{ width: "85%" }}
        />
      </div>
      <span className="text-[13px] font-bold whitespace-nowrap text-black/70">
        {getLabel()}
      </span>
    </div>
  );
}
