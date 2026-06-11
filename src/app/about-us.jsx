"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import fullLogo from "../../public/images/voidspark-full-logo.png";

gsap.registerPlugin(ScrollTrigger);

export default function VoidSparkAbout() {
  const rootRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const logoWrapRef = useRef(null);
  const contentWrapRef = useRef(null);
  const logoRevealRef = useRef(null);
  const rightVideoRef = useRef(null);
  const videoEnded = useRef(false);
  const pinnedStRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  const toggleMute = () => {
    const video = rightVideoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  useLayoutEffect(() => {
    const checkDesktop = () => window.innerWidth >= 1024;
    setIsDesktop(checkDesktop());

    const handleResize = () => {
      setIsDesktop(checkDesktop());
    };

    window.addEventListener("resize", handleResize);

    const ctx = gsap.context(() => {
      const isDesktopView = checkDesktop();

      // ── INITIAL STATES ──────────────────────────────────────────

      gsap.set(".va-ruler", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".va-eyebrow", { opacity: 0, y: 12 });
      gsap.set(".va-headline", { yPercent: 105 });
      gsap.set(".va-body", { opacity: 0, y: 24 });
      gsap.set(".va-video", { opacity: 0, scale: 0.96, y: 40 });

      if (isDesktopView) {
        gsap.set(logoWrapRef.current, { opacity: 0 });
        gsap.set(logoRevealRef.current, { opacity: 0, scale: 0.92 });
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
        .to(".va-video", { opacity: 1, scale: 1, y: 0, duration: 1.8 }, 0.5);

      // ── VIDEO AUTOPLAY FOR BOTH DESKTOP AND MOBILE ─────────────

      const rightVideo = rightVideoRef.current;

      if (rightVideo) {
        ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top 80%",
          onEnter: () => {
            rightVideo.play().catch((err) => {
              console.log("Autoplay prevented:", err);
            });
          },
          once: true,
        });
      }

      // ── DESKTOP ONLY: PINNED SPLIT + LOGO REVEAL ──────────────

      if (isDesktopView) {
        if (rightVideo) {
          rightVideo.addEventListener("ended", () => {
            videoEnded.current = true;
            if (pinnedStRef.current) {
              pinnedStRef.current.enable();
            }
          });
        }

        const pinnedTl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "+=200%",
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
            pinSpacing: true,
            enabled: false,
          },
        });

        pinnedStRef.current = pinnedTl.scrollTrigger;

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
          .to(
            logoWrapRef.current,
            { opacity: 1, ease: "expo.out", duration: 0.3 },
            0.5,
          )
          .to(
            logoRevealRef.current,
            { opacity: 1, scale: 1, ease: "expo.out", duration: 0.55 },
            0.6,
          );
      }
    }, rootRef);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
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
          {/* Mobile: full viewport with flex-col-reverse, Desktop: unchanged grid layout */}
          <div className="flex flex-col-reverse gap-10 min-h-screen justify-center lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:min-h-0">
            {/* LEFT PANEL - Text content (desktop styles unchanged) */}
            <div ref={leftPanelRef} className="will-change-transform">
              <div className="va-ruler mb-8 h-px max-w-xl bg-neutral-300" />

              <div className="va-eyebrow mb-6 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-neutral-900" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  About Us
                </span>
              </div>

              <div className="va-headline text-5xl sm:text-7xl md:text-[4.5rem] font-semibold lg:w-4xl leading-[0.95] tracking-[-0.03em] text-neutral-900">
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

            {/* RIGHT PANEL - Video (desktop styles unchanged) */}
            <div
              ref={rightPanelRef}
              className="flex will-change-transform relative"
            >
              <video
                ref={rightVideoRef}
                src="/videos/Tugas-PKK-FINAL.mp4"
                preload="auto"
                muted
                playsInline
                className="va-video object-contain w-80 mx-auto block lg:w-full rounded-2xl"
              />
              <button
                onClick={toggleMute}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/20 hover:bg-black/80 transition-all"
              >
                {isMuted ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
                    </svg>
                    <span>Unmute</span>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                    </svg>
                    <span>Mute</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Logo overlay — desktop only, revealed after panels slide away */}
          <div
            ref={logoWrapRef}
            className="absolute inset-0 items-center justify-center hidden lg:flex pointer-events-none"
            style={{ opacity: 0 }}
          >
            <img
              ref={logoRevealRef}
              src={fullLogo.src}
              alt="Voidspark"
              className="w-[480px] object-contain"
              style={{ opacity: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
