// src/animations/scrollAnimations.js
import { gsap } from "gsap";

export const scrollAnimationConfig = {
  fadeInUp: {
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
  },
  scaleIn: {
    from: { scale: 0.95, opacity: 0 },
    to: { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(0.5)" },
  },
  slideInLeft: {
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
  },
  slideInRight: {
    from: { x: 100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
  },
  blurIn: {
    from: { filter: "blur(10px)", opacity: 0 },
    to: { filter: "blur(0px)", opacity: 1, duration: 1.2, ease: "power4.out" },
  },
};

export const animateBoringMeter = (fillRef, score) => {
  gsap.to(fillRef.current, {
    width: `${score}%`,
    duration: 1.2,
    ease: "power3.out",
  });
};
