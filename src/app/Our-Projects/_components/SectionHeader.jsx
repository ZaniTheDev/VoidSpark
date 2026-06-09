// src/components/portfolio/SectionHeader.jsx
"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SectionHeader() {
  const headRef = useRef(null);
  const lineRef = useRef(null);
  const subRef = useRef(null);

  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        ScrollTrigger: {
          trigger: headRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.inOut",
          transformOrigin: "left",
        },
      )
        .fromTo(
          headRef.current.querySelectorAll(".w"),
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=.3",
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=.4",
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="mb-16">
      <div className="flex items-center gap-4 mb-8">
        <div ref={lineRef} className="h-px bg-black/18 w-10 origin-left" />
        <span className="text-[10px] font-bold tracking-[.2em] uppercase text-black/35">
          Portofolio
        </span>
      </div>

      <div ref={headRef} className="overflow-hidden">
        <div className="flex flex-wrap gap-x-4">
          {["View", "Our"].map((w) => (
            <span
              key={w}
              className="w inline-block font-black tracking-tight leading-[.95] text-black"
              style={{
                fontSize: "clamp(3rem,8vw,5.5rem)",
              }}
            >
              {w}
            </span>
          ))}
          <span
            className="w inline-block font-black tracking-tight leading-[.95] text-black/20"
            style={{
              fontSize: "clamp(3rem,8vw,5.5rem)",
            }}
          >
            Projects
          </span>
        </div>
      </div>

      <p
        ref={subRef}
        className="mt-5 text-[15px] text-black/45 font-light leading-relaxed max-w-sm"
      >
        Setiap proyek punya masalah yang harus dipecahkan. Lihat, geser, dan
        rasakan sendiri apa yang kami ubah.
      </p>
    </div>
  );
}
