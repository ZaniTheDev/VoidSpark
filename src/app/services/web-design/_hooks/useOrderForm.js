import { useState } from "react";

const initialState = {
  paket: "",
  style: "",
  mood: [],
  palette: "",
  halaman: "",
  referensi: "",
  nama: "",
  email: "",
  wa: "",
  bukti: null,
};

export function useOrderForm() {
  const [form, setForm] = useState(initialState);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleMood = (mood) => {
    setForm((prev) => ({
      ...prev,
      mood: prev.mood.includes(mood)
        ? prev.mood.filter((m) => m !== mood)
        : prev.mood.length < 3
          ? [...prev.mood, mood]
          : prev.mood,
    }));
  };

  const canProceed = {
    step1: form.paket && form.style && form.palette,
    step2: form.halaman,
    step3: form.nama && form.email && form.wa,
  };

  return {
    form,
    step,
    submitted,
    setStep,
    setSubmitted,
    updateField,
    toggleMood,
    canProceed,
  };
}
