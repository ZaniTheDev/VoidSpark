import { forwardRef } from "react";
import { Check, CheckCircle2 } from "lucide-react";

export const PricingCard = forwardRef(({ plan, isActive, onSelect }, ref) => {
  return (
    <div
      ref={ref}
      onClick={() => onSelect(plan.id)}
      className="relative rounded-2xl border cursor-pointer transition-all duration-200 hover:shadow-sm overflow-hidden"
      style={{
        borderColor: isActive ? "#000" : "rgba(0,0,0,0.1)",
        borderWidth: isActive ? "1.5px" : "1px",
        background: isActive ? "#000" : "#fff",
      }}
    >
      {plan.popular && (
        <div
          className="absolute top-0 left-0 right-0 py-1 text-center text-[10px] font-semibold tracking-wider"
          style={{
            background: isActive ? "rgba(255,255,255,0.12)" : "#000",
            color: "#fff",
          }}
        >
          PALING POPULER
        </div>
      )}
      <div className={`p-6 ${plan.popular ? "pt-8" : ""}`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p
              className={`text-xs font-medium mb-1 ${isActive ? "text-white/50" : "text-black/40"}`}
            >
              {plan.duration}
            </p>
            <h3
              className={`text-lg font-semibold tracking-tight ${isActive ? "text-white" : "text-black"}`}
            >
              {plan.name}
            </h3>
          </div>
          {isActive && (
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
              <Check size={11} color="#000" />
            </div>
          )}
        </div>
        <p
          className={`text-xl font-semibold tracking-tight mb-5 ${isActive ? "text-white" : "text-black"}`}
        >
          {plan.price}
        </p>
        {plan.bestFor && (
          <p
            className={`text-[11px] leading-snug mb-5 ${isActive ? "text-white/55" : "text-black/40"}`}
          >
            {plan.bestFor}
          </p>
        )}
        <ul className="space-y-2">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-xs">
              <CheckCircle2
                size={13}
                className={`shrink-0 mt-0.5 ${isActive ? "text-white/60" : "text-black/35"}`}
              />
              <span className={isActive ? "text-white/75" : "text-black/60"}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

PricingCard.displayName = "PricingCard";
