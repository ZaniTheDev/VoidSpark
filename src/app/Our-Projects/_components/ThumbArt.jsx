// src/components/portfolio/ThumbArt.jsx
"use client";

import { memo } from "react";

const ThumbArt = memo(({ id, large }) => {
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
});

ThumbArt.displayName = "ThumbArt";

export default ThumbArt;
