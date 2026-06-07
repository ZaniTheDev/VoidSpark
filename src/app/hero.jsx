"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function VoidSparkHero() {
  const rootRef = useRef(null);
  const primaryBtnRef = useRef(null);
  const secondaryBtnRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(
          [
            ".vs-ruler-top",
            ".vs-ruler-mid",
            ".vs-eyebrow",
            ".vs-line",
            ".vs-sub",
            ".vs-cta",
            ".vs-accent",
          ],
          { clearProps: "all" },
        );
        return;
      }

      gsap.set(".vs-ruler-top", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".vs-ruler-mid", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".vs-eyebrow", { opacity: 0, y: 12 });
      gsap.set(".vs-line", { yPercent: 110 });
      gsap.set(".vs-sub", { opacity: 0, y: 20 });
      gsap.set(".vs-cta", { opacity: 0, y: 16 });
      gsap.set(".vs-accent", { scaleY: 0, transformOrigin: "top center" });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.to(".vs-ruler-top", { scaleX: 1, duration: 1.0 }, 0)
        .to(
          ".vs-accent",
          { scaleY: 1, duration: 1.4, ease: "power3.out" },
          0.05,
        )
        .to(".vs-eyebrow", { opacity: 1, y: 0, duration: 0.6 }, 0.25)
        .to(".vs-line", { yPercent: 0, duration: 1.2, stagger: 0.14 }, 0.4)
        .to(".vs-ruler-mid", { scaleX: 1, duration: 0.8 }, 0.9)
        .to(".vs-sub", { opacity: 1, y: 0, duration: 0.7 }, 1.0)
        .to(".vs-cta", { opacity: 1, y: 0, duration: 0.6 }, 1.15);

      [primaryBtnRef, secondaryBtnRef].forEach((ref) => {
        const btn = ref.current;
        if (!btn) return;
        btn.addEventListener("mouseenter", () =>
          gsap.to(btn, { x: 4, duration: 0.2, ease: "power2.out" }),
        );
        btn.addEventListener("mouseleave", () =>
          gsap.to(btn, { x: 0, duration: 0.2, ease: "power2.out" }),
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-neutral-50 px-6 py-24 text-neutral-900 antialiased sm:px-12 lg:px-20"
    >
      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-neutral-200/40 blur-3xl sm:h-[800px] sm:w-[800px]" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-neutral-200/30 blur-3xl" />
      </div>

      <div className="vs-accent pointer-events-none absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-neutral-300 to-transparent sm:left-12 lg:left-20" />

      <div className="relative z-10 max-w-5xl lg:bottom-5">
        <div className="vs-ruler-top mb-10 h-px bg-neutral-300 will-change-transform" />

        <div className="vs-eyebrow mb-8 flex items-center gap-3 opacity-0 will-change-transform absolute top-8">
          <span className="h-2 w-2 rounded-full bg-neutral-900" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            VoidSpark
          </span>
        </div>

        <h1 className="mb-2">
          {["Improve Your", "Personal", "Branding."].map((line, i) => (
            <div className="overflow-hidden" key={i}>
              <div
                className={`vs-line text-7xl sm:text-8xl md:text-[7.5rem] font-semibold leading-[0.92] tracking-[-0.03em] will-change-transform ${
                  i === 1 ? "text-neutral-400" : "text-neutral-900"
                }`}
              >
                {line}
              </div>
            </div>
          ))}
        </h1>

        <div className="vs-ruler-mid my-5 h-px max-w-2xl bg-neutral-300 will-change-transform" />

        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="vs-sub max-w-md text-lg font-light leading-relaxed text-neutral-600 opacity-0 will-change-transform">
            VoidSpark gives you the clarity, identity, and presence to stand out
            — and stay unforgettable.
          </p>

          <div className="vs-cta flex flex-wrap items-center gap-4 opacity-0 will-change-transform">
            <a href="/services">
              <button
                ref={primaryBtnRef}
                type="button"
                className="inline-flex items-center gap-2.5 rounded-full bg-neutral-900 px-8 py-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 focus:ring-offset-neutral-50"
              >
                Get started →
              </button>
            </a>

            <a href="/Our-Projects">
              <button
                ref={secondaryBtnRef}
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white/60 px-8 py-4 text-sm font-medium text-neutral-900 backdrop-blur-sm transition-all duration-200 hover:border-neutral-900 hover:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 focus:ring-offset-neutral-50"
              >
                See our work
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
