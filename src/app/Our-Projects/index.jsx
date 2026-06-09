// src/components/portfolio/index.jsx
"use client";

import { PortfolioProvider } from "./_Contexts/PortfolioContext";
import SectionHeader from "./_components/SectionHeader";
import Marquee from "./_components/Marquee";
import CaseCard from "./_components/CaseCard";
import { ourWorkProjects } from "./_Data/PortofolioData.js";

function WorkShowcaseContent() {
  return (
    <section className="min-h-screen bg-[#f0f0ee] px-6 md:px-12 lg:px-20 py-24">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader />
        <Marquee />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ourWorkProjects.map((project, i) => (
            <CaseCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-14 pt-10 border-t border-black/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <p className="text-[13px] text-black/45 font-light">
            Proyekmu yang berikutnya?{" "}
            <span className="text-black font-semibold">
              Mari diskusikan bersama.
            </span>
          </p>
          <div className="flex gap-3">
            <a href="/services">
              <button className="bg-black text-white px-6 py-2.5 rounded-full text-[12px] font-semibold tracking-wide hover:bg-black/80 transition-colors">
                Mulai Proyek →
              </button>
            </a>
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
