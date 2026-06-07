// src/hooks/useGsapAnimation.js
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGsapAnimation = (animationConfig, dependencies = []) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      const { from, to, options = {} } = animationConfig;

      if (from && to) {
        gsap.fromTo(elementRef.current, from, {
          ...to,
          scrollTrigger: options.scrollTrigger
            ? {
                trigger: elementRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
                ...options.scrollTrigger,
              }
            : undefined,
        });
      } else if (animationConfig.animation) {
        animationConfig.animation(elementRef.current);
      }
    }, elementRef);

    return () => ctx.revert();
  }, dependencies);

  return elementRef;
};

export const useScrollReveal = (delay = 0) => {
  return useGsapAnimation({
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay },
    options: { scrollTrigger: true },
  });
};
