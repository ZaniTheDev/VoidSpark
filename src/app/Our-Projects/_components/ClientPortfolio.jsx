// Our-Projects/_components/ClientPortfolio.jsx
"use client";

import dynamic from "next/dynamic";

// Import the main component (index.jsx from parent folder)
const WorkShowcase = dynamic(
  () => import("../index.jsx"), // Adjust path to parent folder
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-[#f0f0ee] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black/20 border-t-black rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-black/50">Loading portfolio...</p>
        </div>
      </div>
    ),
  },
);

export default function ClientPortfolio() {
  return <WorkShowcase />;
}
