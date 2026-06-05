import { Check } from "lucide-react";

export function StepIndicator({ step, steps }) {
  return (
    <div className="flex border-b border-black/8">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = step === stepNum;
        const isDone = step > stepNum;

        return (
          <div
            key={label}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-medium"
            style={{
              background: isActive ? "#000" : "transparent",
              color: isActive ? "#fff" : isDone ? "#000" : "rgba(0,0,0,0.35)",
              borderRight: i < 2 ? "1px solid rgba(0,0,0,0.08)" : "none",
            }}
          >
            {isDone ? <Check size={11} /> : <span>{stepNum}</span>}
            {label}
          </div>
        );
      })}
    </div>
  );
}
