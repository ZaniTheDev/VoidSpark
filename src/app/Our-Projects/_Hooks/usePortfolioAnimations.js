// src/hooks/usePortfolioAnimations.js
"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export const useCardHoverAnimation = (cardRef) => {
  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      boxShadow: "0 16px 40px rgba(0,0,0,.09)",
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      boxShadow: "0 0 0 transparent",
      duration: 0.3,
    });
  };

  return { handleMouseEnter, handleMouseLeave };
};

export const useMetricAnimation = (index) => {
  const animateMetrics = () => {
    gsap.to(`.metric-card-${index}`, {
      scale: 1.05,
      duration: 0.3,
      stagger: 0.05,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return animateMetrics;
};
