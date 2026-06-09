// src/components/portfolio/index.jsx
"use client";

import { PortfolioProvider } from "./_Contexts/PortfolioContext";
import SectionHeader from "./_components/SectionHeader";
import Marquee from "./_components/Marquee";
import CaseCard from "./_components/CaseCard";
import BeforeAfterSlider from "./_components/BeforeAfterSlider";
import HotspotView from "./_components/HotspotView";
import { ourWorkProjects } from "./_Data/PortofolioData.js";
import { usePortfolio } from "./_Contexts/PortfolioContext";
import { useScrollReveal } from "./_Hooks/useGsapAnimations";

function WorkShowcaseContent() {
  const { activeTab, updateMeterScore, meterScore } = usePortfolio();
  const ctaRef = useScrollReveal(0.2);

  return (
    <section className="min-h-screen bg-[#f0f0ee] px-6 md:px-12 lg:px-20 py-24">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader />
        <Marquee />

        {activeTab === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ourWorkProjects.map((project, i) => (
              <CaseCard
                key={project.id}
                project={project}
                index={i}
                onHover={updateMeterScore}
              />
            ))}
          </div>
        )}

        {activeTab === 1 && <BeforeAfterSlider />}
        {activeTab === 2 && <HotspotView />}

        {/* CTA Section */}
        <div
          ref={ctaRef}
          className="mt-14 pt-10 border-t border-black/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
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

export default function WorkShowcase() {
  return (
    <PortfolioProvider>
      <WorkShowcaseContent />
    </PortfolioProvider>
  );
}
