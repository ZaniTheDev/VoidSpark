import { forwardRef } from "react";

export const Header = forwardRef((props, ref) => {
  return (
    <header
      ref={ref}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/8"
    >
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-tight">
          Voidspark Studio
        </span>
        <span className="text-xs text-black/40 bg-black/5 px-3 py-1 rounded-full">
          Order Website
        </span>
      </div>
    </header>
  );
});

Header.displayName = "Header";
