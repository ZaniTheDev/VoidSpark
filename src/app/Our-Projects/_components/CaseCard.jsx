// src/components/portfolio/CaseCard.jsx
"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCardHoverAnimation } from "../_Hooks/usePortfolioAnimations.js";

export default function CaseCard({ project, index, onHover }) {
  const ref = useRef(null);
  const [imageError, setImageError] = useState(false);
  const { handleMouseEnter, handleMouseLeave } = useCardHoverAnimation(ref);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
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
    }
  }, [index]);

  const handleCardMouseEnter = () => {
    handleMouseEnter();
    if (onHover) onHover(project.id);
  };

  return (
    <div
      ref={ref}
      className={`group bg-white border border-black/8 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
        project.featured ? "md:col-span-2" : ""
      }`}
      style={{
        boxShadow: "0 0 0 transparent",
        transition:
          "transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s",
      }}
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Project Image */}
      <div
        className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
        style={{ aspectRatio: project.featured ? "16/9" : "4/3" }}
      >
        {project.image && !imageError ? (
          <img
            src={project.image}
            alt={project.title}
            className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-700 group-hover:scale-105"
            loading={index < 3 ? "eager" : "lazy"}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Category Tag */}
        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-black/10 rounded-full px-3 py-1 text-[10px] font-bold tracking-[.12em] uppercase text-black/70 z-10">
          {project.category}
        </span>
      </div>

      {/* Project Info */}
      <div className="p-5">
        <p className="text-[10px] font-bold tracking-[.15em] uppercase text-black/40 mb-1.5">
          {project.service}
        </p>
        <h3 className="text-[17px] font-extrabold tracking-tight leading-snug mb-2 line-clamp-2">
          {project.title}
        </h3>
        <p className="text-[13px] text-black/60 font-light leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-black/40 font-medium">
            {project.year || "2024"}
          </span>
          <div className="w-7 h-7 rounded-full border border-black/12 flex items-center justify-center text-xs transition-all duration-200 group-hover:bg-black group-hover:border-black group-hover:text-white group-hover:rotate-45">
            ↗
          </div>
        </div>
      </div>
    </div>
  );
}
