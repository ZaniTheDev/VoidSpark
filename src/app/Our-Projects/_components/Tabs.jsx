// src/components/portfolio/Tabs.jsx
"use client";

import { usePortfolio } from "../_Contexts/PortfolioContext.jsx";

export default function Tabs({ tabs }) {
  const { activeTab, setActiveTab } = usePortfolio();

  return (
    <div className="flex gap-0 border border-black/10 rounded-full p-1 bg-white w-fit mb-10">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActiveTab(i)}
          className={`px-5 py-2 rounded-full text-[12px] font-semibold tracking-wide transition-all duration-200 ${
            activeTab === i
              ? "bg-black text-white"
              : "text-black/40 hover:text-black/70"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
