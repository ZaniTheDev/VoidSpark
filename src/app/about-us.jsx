"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import murifaiy from "../../public/images/murifaiy1.png";
import fullLogo from "../../public/images/voidspark-full-logo.png";

gsap.registerPlugin(ScrollTrigger);

export default function VoidSparkAbout() {
  const rootRef = useRef(null);
  const logoRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const logoWrapRef = useRef(null);
  const contentWrapRef = useRef(null);
  const logoRevealRef = useRef(null);
  const playBtnRef = useRef(null);
  const videoStarted = useRef(false);
  const watchTextRef = useRef(null);
  const videoWrapRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 1024;

      // ── INITIAL STATES ──────────────────────────────────────────

      gsap.set(".va-ruler", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".va-eyebrow", { opacity: 0, y: 12 });
      gsap.set(".va-headline", { yPercent: 105 });
      gsap.set(".va-body", { opacity: 0, y: 24 });
      gsap.set(".va-image", { opacity: 0, scale: 0.96, y: 40 });

      if (isDesktop) {
        gsap.set(logoWrapRef.current, { opacity: 1 });
        gsap.set(videoWrapRef.current, { opacity: 0, scale: 0.92 });
        gsap.set(watchTextRef.current, { opacity: 0, y: -20 });
        gsap.set(playBtnRef.current, { opacity: 0 });
      }

      // ── SECTION ENTER ANIMATION ────────────────────────────────

      const enterTl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "expo.out" },
      });

      enterTl
        .to(".va-ruler", { scaleX: 1, duration: 1 })
        .to(".va-eyebrow", { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .to(".va-headline", { yPercent: 0, duration: 1.1, stagger: 0.1 }, 0.35)
        .to(".va-body", { opacity: 1, y: 0, duration: 0.7 }, 0.6)
        // No onComplete float — handled by CSS animation class below
        .to(".va-image", { opacity: 1, scale: 1, y: 0, duration: 1.8 }, 0.5);

      // ── PINNED SPLIT + VIDEO — DESKTOP ONLY ───────────────────

      if (isDesktop) {
        const pinnedTl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "+=200%",
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
            pinSpacing: true,
            onUpdate: (self) => {
              if (self.progress < 0.6) {
                const video = logoRef.current;
                if (video) {
                  video.pause();
                  video.currentTime = 0;
                }
                gsap.set(playBtnRef.current, { opacity: 0 });
                gsap.set(watchTextRef.current, { opacity: 0, y: -20 });
                gsap.set(videoWrapRef.current, { opacity: 0, scale: 0.92 });
                videoStarted.current = false;
              }

              // Show play button once video is visible
              if (self.progress >= 0.85 && !videoStarted.current) {
                videoStarted.current = true;
                gsap.to(playBtnRef.current, { opacity: 1, duration: 0.3 });

                const video = logoRef.current;
                if (!video) return;
                video.onended = () => {
                  gsap.to(watchTextRef.current, { opacity: 0, duration: 0.3 });
                  gsap.to(playBtnRef.current, { opacity: 0, duration: 0.3 });
                  gsap.to(logoRevealRef.current, {
                    opacity: 1,
                    duration: 0.8,
                    ease: "expo.out",
                  });
                  gsap.to(playBtnRef.current, { opacity: 0, duration: 0.3 });
                  gsap.to(logoRevealRef.current, {
                    opacity: 1,
                    duration: 0.8,
                    ease: "expo.out",
                  });
                };
              }
            },
          },
        });

        pinnedTl
          .to(
            leftPanelRef.current,
            { xPercent: -120, opacity: 0, ease: "power2.in", duration: 0.4 },
            0,
          )
          .to(
            rightPanelRef.current,
            { xPercent: 120, opacity: 0, ease: "power2.in", duration: 0.4 },
            0,
          )
          .fromTo(
            watchTextRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, ease: "back.out(0.7)", duration: 0.4 },
            0.45,
          )
          .to(
            videoWrapRef.current,
            { opacity: 1, scale: 1, ease: "expo.out", duration: 0.55 },
            0.75,
          );
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-white px-6 text-neutral-900 antialiased sm:px-12 lg:px-20 lg:h-screen lg:flex lg:items-center"
    >
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-neutral-100/60 blur-3xl" />
      </div>

      {/* Vertical accent */}
      <div className="pointer-events-none absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-neutral-200 to-transparent sm:left-12 lg:left-20" />

      <div className="relative z-10 mx-auto max-w-7xl w-full py-20 lg:py-0">
        <div ref={contentWrapRef} className="relative" id="about">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* LEFT PANEL */}
            <div ref={leftPanelRef} className="will-change-transform">
              <div className="va-ruler mb-8 h-px max-w-xl bg-neutral-300" />

              <div className="va-eyebrow mb-6 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-neutral-900" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  About Us
                </span>
              </div>

              <div className="va-headline text-6xl sm:text-7xl md:text-[4.5rem] font-semibold lg:w-4xl leading-[0.95] tracking-[-0.03em] text-neutral-900">
                Refuse to be
                <br />
                <span className="text-neutral-400">Ordinary!</span>
              </div>

              <p className="va-body mt-4 max-w-lg text-base font-light leading-relaxed text-neutral-600 sm:text-lg lg:w-3xl lg:mt-4">
                Kami menyadari bahwa ada banyak sekali orang di era modern ini
                yang membutuhkan Personal Branding dengan alasan yang berbeda
                mungkin untuk mempromosikan diri sendiri, atau untuk
                mempromosikan jasanya. Akan tetapi cara yang mereka lakukan bisa
                dibilang sangat <i>Ordinary</i> dan tidak menarik. Karena itulah
                kami membangun Voidspark.
              </p>
            </div>

            {/* RIGHT PANEL */}
            <div ref={rightPanelRef} className="flex will-change-transform">
              <img
                src={murifaiy.src}
                alt="image"
                className="va-image va-image-float object-contain w-80 mx-auto block lg:w-200"
              />
            </div>
          </div>

          {/* Video overlay — desktop only */}
          <div
            ref={logoWrapRef}
            className="absolute inset-0 items-center justify-center hidden lg:flex"
            style={{ opacity: 0 }}
          >
            <div className="absolute top-1 left-0 right-0 text-center pointer-events-none z-20 border-black">
              <p
                ref={watchTextRef}
                className="text-2xl sm:text-7xl md:text-[2.5rem] font-semibold leading-[0.95] tracking-[-0.10 em] text-neutral-900 mb-12"
                style={{ opacity: 0 }}
              >
                Watch the Video Below!
              </p>
            </div>

            <div ref={videoWrapRef} style={{ opacity: 0 }}>
              <video
                ref={logoRef}
                src="/videos/Tugas-PKK-FINAL.mp4"
                preload="metadata"
                muted
                playsInline
                className="w-[740px] object-contain rounded-2xl"
              />
            </div>

            <button
              ref={playBtnRef}
              onClick={() => {
                const video = logoRef.current;
                if (!video) return;
                if (video.paused) {
                  video.muted = false;
                  video
                    .play()
                    .catch((err) => console.error("play failed:", err));
                  gsap.to(watchTextRef.current, {
                    opacity: 0,
                    y: -10,
                    duration: 0.3,
                  });
                  playBtnRef.current.innerHTML = `...`;
                  playBtnRef.current.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="6" y="4" width="4" height="16"/>
                      <rect x="14" y="4" width="4" height="16"/>
                    </svg>
                    <span>Pause</span>
                  `;
                } else {
                  video.pause();
                  gsap.to(watchTextRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                  });
                  playBtnRef.current.innerHTML = `...`;
                  playBtnRef.current.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <polygon points="5,3 19,12 5,21"/>
                    </svg>
                    <span>Play</span>
                  `;
                }
              }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black text-white text-sm font-medium px-4 py-2.5 rounded-full cursor-pointer border border-white/20 shadow-lg"
              style={{ opacity: 0 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <polygon points="5,3 19,12 5,21" />
              </svg>
              <span>Play</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
