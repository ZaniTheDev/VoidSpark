"use client";
import { useState } from "react";

export default function Toggle() {
  const [on, setOn] = useState(false);

  return (
    <>
      <div className={`min-h-screen ${on ? "bg-black" : "bg-amber-50"}`}>
        <div
          onClick={() => setOn(!on)}
          className={`w-12 h-6 rounded-full cursor-pointer transition-colors duration-200 relative
        ${on ? "bg-teal-500" : "bg-gray-300"}`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5
        transition-transform duration-200 ${on ? "translate-x-6" : ""}`}
          />
        </div>
        <h1 className={`${on ? "text-white" : "text-black"}`}>
          {on ? "Dark mode" : "Light mode"}
        </h1>
      </div>
    </>
  );
}
