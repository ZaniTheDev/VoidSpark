import { Palette, MessageSquare, Layers } from "lucide-react";
import { FormField } from "./FormField";
import { NavButtons } from "./NavButtons";
import {
  styleOptions,
  moodOptions,
  colorOptions,
} from "../_config/design-options";

export function DesignStep({ form, updateField, toggleMood, onNext }) {
  const canProceed = form.paket && form.style && form.palette;

  return (
    <>
      <FormField
        icon={<Palette size={14} />}
        label="Gaya Visual"
        hint="Pilih satu gaya yang paling mencerminkan brand Anda"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {styleOptions.map((option) => {
            const isActive = form.style === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => updateField("style", option.id)}
                className="text-left p-3.5 rounded-xl border transition-all duration-150 hover:border-black/30"
                style={{
                  borderColor: isActive ? "#000" : "rgba(0,0,0,0.1)",
                  background: isActive ? "#000" : "#fff",
                  borderWidth: isActive ? "1.5px" : "1px",
                }}
              >
                <p
                  className={`text-xs font-semibold mb-0.5 ${isActive ? "text-white" : "text-black"}`}
                >
                  {option.label}
                </p>
                <p
                  className={`text-[10px] leading-snug ${isActive ? "text-white/55" : "text-black/40"}`}
                >
                  {option.desc}
                </p>
              </button>
            );
          })}
        </div>
      </FormField>

      <FormField
        icon={<MessageSquare size={14} />}
        label="Mood Brand"
        hint="Pilih hingga 3"
      >
        <div className="flex flex-wrap gap-2">
          {moodOptions.map((mood) => {
            const isActive = form.mood.includes(mood);
            return (
              <button
                key={mood}
                type="button"
                onClick={() => toggleMood(mood)}
                disabled={!isActive && form.mood.length >= 3}
                className="px-4 py-2 rounded-full text-xs font-medium border transition-all duration-150 disabled:opacity-30"
                style={{
                  borderColor: isActive ? "#000" : "rgba(0,0,0,0.12)",
                  background: isActive ? "#000" : "#fff",
                  color: isActive ? "#fff" : "rgba(0,0,0,0.6)",
                }}
              >
                {mood}
              </button>
            );
          })}
        </div>
      </FormField>

      <FormField
        icon={<Layers size={14} />}
        label="Palet Warna"
        hint="Pilih arah warna yang Anda inginkan"
      >
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {colorOptions.map((color) => {
            const isActive = form.palette === color.name;
            return (
              <button
                key={color.name}
                type="button"
                onClick={() => updateField("palette", color.name)}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div
                  className="w-full aspect-square rounded-xl transition-all duration-150"
                  style={{
                    background: color.hex,
                    outline: isActive
                      ? `2px solid #000`
                      : "2px solid transparent",
                    outlineOffset: "2px",
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                  }}
                />
                <span
                  className={`text-[10px] ${isActive ? "text-black font-medium" : "text-black/35"}`}
                >
                  {color.name}
                </span>
              </button>
            );
          })}
        </div>
      </FormField>

      <NavButtons onNext={onNext} disabled={!canProceed} />
    </>
  );
}
