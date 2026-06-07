// src/components/portfolio/CaseCard.jsx
"use client";

// Our-Projects/_components/CaseCard.jsx
"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThumbArt from "./ThumbArt";
import { useCardHoverAnimation } from "../_Hooks/usePortfolioAnimations.js"; // Add .js extension

// Rest of component...

export default function CaseCard({ data, index, onHover }) {
  const ref = useRef(null);
  const { handleMouseEnter, handleMouseLeave } = useCardHoverAnimation(ref);

  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        delay: index * 0.1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      },
    );
  }, [index]);

  const handleCardMouseEnter = () => {
    handleMouseEnter();
    onHover(data.id);
  };

  return (
    <div
      ref={ref}
      className={`group bg-white border border-black/8 rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-1 ${
        data.large ? "md:col-span-2" : ""
      }`}
      style={{
        boxShadow: "0 0 0 transparent",
        transition:
          "transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s",
      }}
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative overflow-hidden bg-[#e8e8e5]"
        style={{ aspectRatio: data.large ? "16/6.5" : "4/3" }}
      >
        <ThumbArt id={data.id} large={data.large} />
        <span className="absolute top-3 left-3 bg-white/90 border border-black/10 rounded-full px-3 py-1 text-[10px] font-bold tracking-[.12em] uppercase text-black/50">
          {data.tag}
        </span>
      </div>

      <div className="p-5">
        <p className="text-[10px] font-bold tracking-[.15em] uppercase text-black/30 mb-1.5">
          {data.mission}
        </p>
        <h3 className="text-[17px] font-extrabold tracking-tight leading-snug mb-2">
          {data.title}
        </h3>
        <p className="text-[13px] text-black/50 font-light leading-relaxed mb-4">
          {data.desc}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-black/30 font-medium">
            {data.location}
          </span>
          <div className="w-7 h-7 rounded-full border border-black/12 flex items-center justify-center text-xs transition-all duration-200 group-hover:bg-black group-hover:border-black group-hover:text-white">
            ↗
          </div>
        </div>
      </div>
    </div>
  );
}
