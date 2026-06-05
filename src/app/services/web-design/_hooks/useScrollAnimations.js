import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations() {
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const stepsRef = useRef([]);
  const sectionRefs = useRef([]);
  const pricingRefs = useRef([]);
  const formRef = useRef(null);
  const payRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* header */
      gsap.fromTo(
        headerRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
      );

      /* how-to steps stagger on scroll */
      stepsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
            delay: i * 0.07,
          },
        );
      });

      /* pricing cards */
      pricingRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 50, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
            delay: i * 0.1,
          },
        );
      });

      /* section headings parallax */
      sectionRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          },
        );
      });

      /* form + payment reveal */
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: formRef.current, start: "top 82%" },
          },
        );
      }
      if (payRef.current) {
        gsap.fromTo(
          payRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: payRef.current, start: "top 82%" },
          },
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return {
    pageRef,
    headerRef,
    stepsRef,
    sectionRefs,
    pricingRefs,
    formRef,
    payRef,
  };
}
