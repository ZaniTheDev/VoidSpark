"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────
const CASES = [
  {
    id: "01",
    mission: "Misi 01",
    tag: "Web Design",
    title:
      "Selamatkan toko kopi yang kehilangan 60% pelanggan karena website-nya terlihat seperti dibuat tahun 2009.",
    desc: "Menu tidak bisa di-scroll di HP, tombol pesan error, dan foto produk blur. Kami rebuild dari nol dalam 5 hari.",
    location: "Jakarta · 2025",
    large: true,
  },
  {
    id: "02",
    mission: "Misi 02",
    tag: "Branding",
    title:
      "Brand studio arsitektur butik yang terlihat lebih tua dari gedung yang mereka desain.",
    desc: "Logo pixelated, warna tidak konsisten. Sekarang: identitas visual yang bikin klien korporat percaya.",
    location: "Bandung · 2025",
    large: false,
  },
  {
    id: "03",
    mission: "Misi 03",
    tag: "Editing Video",
    title:
      "Konten podcast yang bagus isinya, tapi ditonton 200 orang karena editingnya membosankan.",
    desc: "Reformat jadi short-form clips dengan caption dynamic. Views naik 12x dalam 3 minggu.",
    location: "Surabaya · 2024",
    large: false,
  },
];

const HOTSPOTS = [
  {
    id: 1,
    style: { top: "14px", left: "140px" },
    tip: "Logo kiri atas meningkatkan brand recall 30% dibanding posisi tengah.",
    tipPos: { top: "4px", left: "175px" },
  },
  {
    id: 2,
    style: { top: "14px", right: "90px" },
    tip: "CTA di navbar: 2.4× lebih banyak klik vs tombol footer-only.",
    tipPos: { top: "4px", right: "10px" },
  },
  {
    id: 3,
    style: { bottom: "96px", left: "24px" },
    tip: "Pill button (bukan kotak): +18% CTR di mobile.",
    tipPos: { bottom: "140px", left: "60px" },
  },
  {
    id: 4,
    style: { bottom: "54px", left: "24px" },
    tip: "Warna hitam solid: konversi 200% vs hijau/merah.",
    tipPos: { bottom: "98px", left: "60px" },
  },
];

// ─── Thumb Art (abstract placeholder per card) ────────────────────────────────
function ThumbArt({ id, large }) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.04) 1px,transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      {id === "01" && (
        <>
          <div
            className="absolute bg-[#1a1a1a] rounded-[3px]"
            style={{ top: "15%", left: "8%", width: "32%", height: "65%" }}
          />
          <div
            className="absolute border border-black/15 rounded-[2px]"
            style={{ top: "25%", left: "34%", width: "22%", height: "48%" }}
          />
          <div
            className="absolute border border-black/10 rounded-full"
            style={{ top: "35%", right: "8%", width: "28%", height: "32%" }}
          />
        </>
      )}
      {id === "02" && (
        <>
          <div
            className="absolute bg-[#1a1a1a] rounded-[3px]"
            style={{ top: "20%", left: "15%", width: "40%", height: "55%" }}
          />
          <div
            className="absolute border border-black/15 rounded-[2px]"
            style={{ top: "30%", right: "10%", width: "30%", height: "40%" }}
          />
        </>
      )}
      {id === "03" && (
        <>
          <div
            className="absolute bg-[#1a1a1a] rounded-[3px]"
            style={{ top: "15%", left: "10%", width: "28%", height: "70%" }}
          />
          <div
            className="absolute border border-black/15 rounded-[2px]"
            style={{ top: "20%", left: "42%", width: "45%", height: "60%" }}
          />
        </>
      )}
      <div
        className="absolute bottom-3 right-4 font-black leading-none text-black/[.06] select-none"
        style={{ fontSize: "80px" }}
      >
        {id}
      </div>
    </div>
  );
}

// ─── Boring Meter ─────────────────────────────────────────────────────────────
function BoringMeter({ score }) {
  const fillRef = useRef(null);
  const prevScore = useRef(score);

  useEffect(() => {
    if (!fillRef.current) return;
    gsap.to(fillRef.current, {
      width: `${score}%`,
      duration: 1.2,
      ease: "power3.out",
    });
    prevScore.current = score;
  }, [score]);

  const label =
    score > 70
      ? `Sebelum VoidSpark: ${(score / 10).toFixed(1)}/10 😴`
      : score > 30
        ? `Dalam proses... ${(score / 10).toFixed(1)}/10 🛠`
        : `Setelah VoidSpark: ${(score / 10).toFixed(1)}/10 🔥`;

  return (
    <div className="flex items-center gap-5 bg-white border border-black/8 rounded-xl px-6 py-5 mb-10">
      <span className="text-[10px] font-bold tracking-[.18em] uppercase text-black/35 whitespace-nowrap">
        Boring meter
      </span>
      <div className="flex-1 h-2 bg-black/7 rounded-full overflow-hidden relative">
        <div
          ref={fillRef}
          className="h-full rounded-full bg-black"
          style={{ width: "85%" }}
        />
      </div>
      <span className="text-[13px] font-bold whitespace-nowrap text-black/70">
        {label}
      </span>
    </div>
  );
}

// ─── Case Card ────────────────────────────────────────────────────────────────
function CaseCard({ c, index, onEnter }) {
  const ref = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
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
  }, [index]);

  return (
    <div
      ref={ref}
      className={`group bg-white border border-black/8 rounded-xl overflow-hidden cursor-pointer opacity-0 transition-transform duration-300 hover:-translate-y-1 ${c.large ? "md:col-span-2" : ""}`}
      style={{
        boxShadow: "0 0 0 transparent",
        transition:
          "transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s",
      }}
      onMouseEnter={() => {
        onEnter(c.id);
        gsap.to(ref.current, {
          boxShadow: "0 16px 40px rgba(0,0,0,.09)",
          duration: 0.3,
        });
      }}
      onMouseLeave={() => {
        gsap.to(ref.current, { boxShadow: "0 0 0 transparent", duration: 0.3 });
      }}
    >
      <div
        className="relative overflow-hidden bg-[#e8e8e5]"
        style={{ aspectRatio: c.large ? "16/6.5" : "4/3" }}
      >
        <ThumbArt id={c.id} large={c.large} />
        <span className="absolute top-3 left-3 bg-white/90 border border-black/10 rounded-full px-3 py-1 text-[10px] font-bold tracking-[.12em] uppercase text-black/50">
          {c.tag}
        </span>
      </div>
      <div className="p-5">
        <p className="text-[10px] font-bold tracking-[.15em] uppercase text-black/30 mb-1.5">
          {c.mission}
        </p>
        <h3 className="text-[17px] font-extrabold tracking-tight leading-snug mb-2">
          {c.title}
        </h3>
        <p className="text-[13px] text-black/50 font-light leading-relaxed mb-4">
          {c.desc}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-black/30 font-medium">
            {c.location}
          </span>
          <div
            ref={arrowRef}
            className="w-7 h-7 rounded-full border border-black/12 flex items-center justify-center text-xs transition-all duration-200 group-hover:bg-black group-hover:border-black group-hover:text-white"
          >
            ↗
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Before / After Slider ────────────────────────────────────────────────────
function BeforeAfterSlider() {
  const containerRef = useRef(null);
  const afterRef = useRef(null);
  const handleRef = useRef(null);
  const dragging = useRef(false);

  const setPos = useCallback((clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(
      Math.max(((clientX - rect.left) / rect.width) * 100, 2),
      98,
    );
    afterRef.current.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handleRef.current.style.left = `${pct}%`;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    const onDown = (e) => {
      dragging.current = true;
      setPos(e.clientX ?? e.touches[0].clientX);
    };
    const onMove = (e) => {
      if (dragging.current) setPos(e.clientX ?? e.touches[0].clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    el.addEventListener("mousedown", onDown);
    el.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    setPos(
      el.getBoundingClientRect().left + el.getBoundingClientRect().width * 0.5,
    );
    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("touchstart", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [setPos]);

  return (
    <div className="bg-white border border-black/8 rounded-2xl overflow-hidden">
      <div className="px-7 py-6 border-b border-black/6">
        <p className="text-[10px] font-bold tracking-[.18em] uppercase text-black/35 mb-1.5">
          Misi 01 · Web Redesign
        </p>
        <h3 className="text-xl font-extrabold tracking-tight">
          Drag untuk membandingkan — sebelum vs sesudah.
        </h3>
      </div>

      {/* Slider area */}
      <div
        ref={containerRef}
        className="relative h-72 overflow-hidden cursor-ew-resize select-none"
      >
        {/* BEFORE */}
        <div className="absolute inset-0 bg-[#e8e0d0] flex flex-col items-center p-6">
          <div className="w-full bg-[#003366] rounded px-4 py-2.5 flex items-center justify-between mb-4">
            <span
              className="text-white text-[13px] font-bold"
              style={{ fontFamily: "serif" }}
            >
              KOPIKU JAYA
            </span>
            <div className="flex gap-3">
              {["Home", "Menu", "Kontak"].map((l) => (
                <span key={l} className="text-white/70 text-[10px] underline">
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div className="w-full bg-white border-2 border-[#003366] rounded p-5 text-center">
            <p className="text-red-600 text-[11px] font-bold tracking-wide mb-2">
              ✦ PROMO HARI INI ✦ DISKON 20% ✦
            </p>
            <p
              className="text-[22px] font-black text-[#003366]"
              style={{ fontFamily: "serif" }}
            >
              Selamat Datang Di Kopiku Jaya!
            </p>
            <p className="text-[11px] text-gray-500 mt-1">
              Kopi terbaik se-Jakarta sejak 2003
            </p>
            <button className="mt-3 bg-orange-500 text-white text-[11px] font-bold px-4 py-2">
              KLIK DI SINI UNTUK PESAN !!!
            </button>
            <p className="text-[10px] text-black/40 mt-2">
              ⏳ Load time: 8.4 detik
            </p>
          </div>
        </div>

        {/* AFTER */}
        <div
          ref={afterRef}
          className="absolute inset-0"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        >
          <div className="w-full h-full bg-[#f0f0ee] flex flex-col items-center p-6">
            <div className="w-full flex items-center justify-between mb-5 px-1">
              <span className="text-[14px] font-black tracking-tight">
                Kopiku
              </span>
              <div className="flex gap-4 items-center">
                {["Menu", "Tentang", "Kontak"].map((l) => (
                  <span
                    key={l}
                    className="text-[11px] text-black/40 font-medium"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-full">
              <p className="text-[9px] font-bold tracking-[.2em] uppercase text-black/30 mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
                Kopiku Jaya · Jakarta
              </p>
              <p className="text-4xl font-black tracking-tight leading-none mb-4">
                Kopi yang
                <br />
                Bikin <span className="text-black/20">Kamu</span>
                <br />
                Balik Lagi.
              </p>
              <div className="flex gap-2.5">
                <button className="bg-black text-white px-5 py-2 rounded-full text-[11px] font-semibold">
                  Pesan Sekarang →
                </button>
                <button className="border border-black/15 text-black px-5 py-2 rounded-full text-[11px] font-semibold">
                  Lihat Menu
                </button>
              </div>
              <p className="text-[10px] text-black/35 mt-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
                Load time: 1.1 detik
              </p>
            </div>
          </div>
        </div>

        {/* Handle */}
        <div
          ref={handleRef}
          className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
          style={{ left: "50%", transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border-2 border-black/12 flex items-center justify-center text-sm shadow-lg">
            ⇔
          </div>
        </div>
      </div>

      <div className="flex justify-between px-7 py-3 border-t border-black/6 text-[11px] font-semibold tracking-wide uppercase text-black/35">
        <span>😭 Sebelum</span>
        <span>🚀 Sesudah</span>
      </div>

      <div className="grid grid-cols-3 border-t border-black/6 divide-x divide-black/6">
        {[
          ["8.4s", "Load dulu"],
          ["→ 1.1s", "Load sekarang"],
          ["+340%", "Konversi naik"],
        ].map(([val, lbl]) => (
          <div key={lbl} className="text-center py-5">
            <p className="text-2xl font-black tracking-tight">{val}</p>
            <p className="text-[10px] font-semibold tracking-[.12em] uppercase text-black/35 mt-1">
              {lbl}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Hotspot View ─────────────────────────────────────────────────────────────
function HotspotView() {
  const [activePin, setActivePin] = useState(null);

  return (
    <div className="bg-white border border-black/8 rounded-2xl overflow-hidden">
      <div className="px-7 py-6 border-b border-black/6">
        <p className="text-[10px] font-bold tracking-[.18em] uppercase text-black/35 mb-1.5">
          Design Annotation · Web Design
        </p>
        <h3 className="text-xl font-extrabold tracking-tight">
          Hover pin untuk lihat alasan di balik setiap keputusan desain.
        </h3>
      </div>

      <div className="relative p-6 bg-[#f8f8f6]">
        {/* Mockup */}
        <div className="bg-[#f0f0ee] border border-black/10 rounded-xl overflow-hidden relative">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-black/6">
            <span className="text-[13px] font-black tracking-tight">
              VoidSpark
            </span>
            <div className="flex items-center gap-4">
              {["About", "Services", "Work"].map((l) => (
                <span key={l} className="text-[11px] text-black/40 font-medium">
                  {l}
                </span>
              ))}
              <span className="bg-black text-white text-[10px] font-semibold px-3.5 py-1.5 rounded-full tracking-wide">
                Get started
              </span>
            </div>
          </div>
          <div className="px-6 py-8">
            <p className="text-[9px] font-bold tracking-[.2em] uppercase text-black/30 mb-2.5">
              VoidSpark · Web Design
            </p>
            <p
              className="font-black tracking-tight leading-none mb-5"
              style={{ fontSize: "clamp(28px,5vw,40px)" }}
            >
              Improve Your
              <br />
              <span className="text-black/20">Personal</span>
              <br />
              Branding.
            </p>
            <div className="flex gap-2.5">
              <button className="bg-black text-white px-6 py-2.5 rounded-full text-[12px] font-semibold">
                Get started →
              </button>
              <button className="border border-black/15 text-black px-6 py-2.5 rounded-full text-[12px] font-semibold">
                See our work
              </button>
            </div>
          </div>
        </div>

        {/* Hotspot pins */}
        {HOTSPOTS.map((h) => (
          <div key={h.id} className="absolute z-20" style={h.style}>
            <button
              className="w-7 h-7 rounded-full bg-black border-2 border-white shadow-lg flex items-center justify-center text-white text-[11px] font-black"
              style={{
                animation: "pulse 2.5s ease-in-out infinite",
                transform: "translate(-50%,-50%)",
              }}
              onMouseEnter={() => setActivePin(h.id)}
              onMouseLeave={() => setActivePin(null)}
            >
              {h.id}
            </button>
            {activePin === h.id && (
              <div
                className="absolute z-30 bg-black text-white rounded-xl px-4 py-3 text-[12px] leading-relaxed max-w-[200px] shadow-2xl"
                style={h.tipPos}
              >
                {h.tip}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="px-7 py-4 border-t border-black/6 flex flex-wrap gap-2">
        {[
          ["1", "Posisi logo"],
          ["2", "CTA navbar"],
          ["3", "Bentuk tombol"],
          ["4", "Warna CTA"],
        ].map(([n, lbl]) => (
          <div
            key={n}
            className="flex items-center gap-1.5 bg-[#f8f8f6] border border-black/8 rounded-full px-3 py-1.5 text-[11px] font-medium text-black/60"
          >
            <div className="w-5 h-5 rounded-full bg-black text-white text-[10px] font-black flex items-center justify-center">
              {n}
            </div>
            {lbl}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────
function Marquee() {
  const items = [
    "Web Design",
    "Editing Video",
    "Branding",
    "UI/UX",
    "Visual Identity",
    "Motion Design",
  ];
  return (
    <div className="relative overflow-hidden border-y border-black/[.07] py-4 mb-16">
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{ animation: "marquee 18s linear infinite" }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-[11px] font-bold tracking-[.2em] uppercase text-black/25 shrink-0"
          >
            {item}
            <span className="ml-12 text-black/15">✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }
        @keyframes pulse { 0%,100% { transform: translate(-50%,-50%) scale(1) } 50% { transform: translate(-50%,-50%) scale(1.18) } }
      `}</style>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader() {
  const headRef = useRef(null);
  const lineRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
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
          {["Hasil", "Nyata,"].map((w) => (
            <span
              key={w}
              className="w inline-block font-black tracking-tight leading-[.95] text-black"
              style={{
                fontSize: "clamp(3rem,8vw,5.5rem)",
                willChange: "transform",
              }}
            >
              {w}
            </span>
          ))}
          <span
            className="w inline-block font-black tracking-tight leading-[.95] text-black/20"
            style={{
              fontSize: "clamp(3rem,8vw,5.5rem)",
              willChange: "transform",
            }}
          >
            Bukan Janji.
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

// ─── Main Component ───────────────────────────────────────────────────────────
const TABS = ["Misi Klien", "Sebelum vs Sesudah", "Anotasi Desain"];

export default function WorkShowcase() {
  const [tab, setTab] = useState(0);
  const [meterScore, setMeterScore] = useState(85);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (!ctaRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  const handleCaseEnter = (id) => {
    if (id === "01") setMeterScore(15);
    else if (id === "02") setMeterScore(10);
    else setMeterScore(5);
  };

  return (
    <section
      className="min-h-screen bg-[#f0f0ee] px-6 md:px-12 lg:px-20 py-24"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      <div className="max-w-[1100px] mx-auto">
        <BoringMeter score={meterScore} />
        <SectionHeader />
        <Marquee />

        {/* Tabs */}
        <div className="flex gap-0 border border-black/10 rounded-full p-1 bg-white w-fit mb-10">
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`px-5 py-2 rounded-full text-[12px] font-semibold tracking-wide transition-all duration-200 ${
                tab === i
                  ? "bg-black text-white"
                  : "text-black/40 hover:text-black/70"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        {tab === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CASES.map((c, i) => (
              <CaseCard key={c.id} c={c} index={i} onEnter={handleCaseEnter} />
            ))}
          </div>
        )}
        {tab === 1 && <BeforeAfterSlider />}
        {tab === 2 && <HotspotView />}

        {/* CTA */}
        <div
          ref={ctaRef}
          className="mt-14 pt-10 border-t border-black/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 opacity-0"
        >
          <p className="text-[13px] text-black/45 font-light">
            Proyekmu yang berikutnya?{" "}
            <span className="text-black font-semibold">
              Mari diskusikan bersama.
            </span>
          </p>
          <div className="flex gap-3">
            <button className="bg-black text-white px-6 py-2.5 rounded-full text-[12px] font-semibold tracking-wide hover:bg-black/80 transition-colors">
              Mulai Proyek →
            </button>
            <button className="border border-black/18 text-black px-6 py-2.5 rounded-full text-[12px] font-semibold tracking-wide hover:border-black/50 transition-colors">
              Semua Karya
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
