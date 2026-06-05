"use client";

import { useLayoutEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "editing",
    label: "01",
    title: "Jasa Editing",
    description:
      "Video editing profesional untuk konten media sosial, YouTube, short-form, hingga cinematic. Setiap frame dirancang untuk menahan perhatian dan meninggalkan kesan.",
    tags: ["Short Form", "YouTube", "Cinematic", "Reels"],
    route: "/services/editing",
    accent: "Editing",
  },
  {
    id: "webdesign",
    label: "02",
    title: "Jasa Web Design",
    description:
      "Website personal branding, portofolio, dan landing page yang tidak hanya indah — tapi juga mengkonversi. Desain yang mencerminkan siapa kamu sebenarnya.",
    tags: ["Landing Page", "Portfolio", "Branding", "UI/UX"],
    route: "/services/web-design",
    accent: "Web Design",
  },
];

export default function VoidSparkServices() {
  const rootRef = useRef(null);
  const cardRefs = useRef([]);
  const router = useRouter();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(".svc-ruler", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".svc-eyebrow", { opacity: 0, y: 12 });
      gsap.set(".svc-headline", { yPercent: 110 });
      gsap.set(".svc-card", { opacity: 0, y: 48 });

      // Section enter
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "expo.out" },
      });

      tl.to(".svc-ruler", { scaleX: 1, duration: 1 }, 0)
        .to(".svc-eyebrow", { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .to(".svc-headline", { yPercent: 0, duration: 1.1, stagger: 0.1 }, 0.35)
        .to(
          ".svc-card",
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
          0.55,
        );

      // Card hover — magnetic lift
      cardRefs.current.forEach((card) => {
        if (!card) return;

        const inner = card.querySelector(".svc-card-inner");
        const arrow = card.querySelector(".svc-arrow");
        const label = card.querySelector(".svc-number");

        card.addEventListener("mouseenter", () => {
          gsap.to(inner, { y: -6, duration: 0.35, ease: "power2.out" });
          gsap.to(arrow, {
            x: 5,
            y: -5,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(label, { opacity: 1, duration: 0.25 });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(inner, { y: 0, duration: 0.4, ease: "power2.inOut" });
          gsap.to(arrow, {
            x: 0,
            y: 0,
            opacity: 0.4,
            duration: 0.3,
            ease: "power2.inOut",
          });
          gsap.to(label, { opacity: 0.3, duration: 0.25 });
        });

        // Click ripple then navigate
        card.addEventListener("click", () => {
          gsap.to(inner, {
            scale: 0.97,
            duration: 0.12,
            ease: "power1.in",
            onComplete: () => {
              gsap.to(inner, { scale: 1, duration: 0.2, ease: "power2.out" });
            },
          });
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (route) => {
    router.push(route);
  };

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-white px-6 py-24 text-neutral-900 antialiased sm:px-12 lg:px-20 lg:py-32"
    >
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-neutral-100/60 blur-3xl" />
      </div>

      {/* Vertical accent */}
      <div className="pointer-events-none absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-neutral-200 to-transparent sm:left-12 lg:left-20" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <div className="svc-ruler mb-8 h-px max-w-xl bg-neutral-300 will-change-transform" />

          <div className="svc-eyebrow mb-6 flex items-center gap-3 opacity-0 will-change-transform">
            <span className="h-2 w-2 rounded-full bg-neutral-900" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Services
            </span>
          </div>

          <div className="overflow-hidden">
            <div className="svc-headline text-6xl sm:text-7xl md:text-[4.5rem] font-semibold leading-[0.95] tracking-[-0.03em] text-neutral-900 will-change-transform">
              Apa yang kami
              <br />
              <span className="text-neutral-400">tawarkan.</span>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className="svc-card group cursor-pointer opacity-0 will-change-transform"
              onClick={() => handleCardClick(service.route)}
            >
              <div className="svc-card-inner relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-8 transition-colors duration-300 hover:border-neutral-300 hover:bg-white lg:p-10 will-change-transform">
                {/* Large ghost number */}
                <div className="svc-number pointer-events-none absolute -right-4 -top-6 select-none text-[9rem] font-semibold leading-none tracking-[-0.05em] text-neutral-100 opacity-30 transition-opacity lg:text-[11rem]">
                  {service.label}
                </div>

                {/* Top row */}
                <div className="mb-8 flex items-start justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                    {service.label}
                  </span>

                  {/* Arrow */}
                  <div className="svc-arrow flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 opacity-40 will-change-transform">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-neutral-900"
                    >
                      <path
                        d="M3 13L13 3M13 3H6M13 3V10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h2 className="mb-4 text-3xl font-semibold tracking-[-0.02em] text-neutral-900 lg:text-4xl">
                  {service.title}
                </h2>

                {/* Divider */}
                <div className="mb-5 h-px bg-neutral-200" />

                {/* Description */}
                <p className="mb-8 text-base font-light leading-relaxed text-neutral-500 lg:text-lg">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-neutral-200" />
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
            Klik untuk selengkapnya
          </p>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>
      </div>
    </section>
  );
}
