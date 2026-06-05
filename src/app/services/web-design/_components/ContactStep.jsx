import { useState } from "react";
import { User, CreditCard, MessageSquare, Loader2 } from "lucide-react";
import { FormField } from "./FormField";

export function ContactStep({
  form,
  updateField,
  onBack,
  onSubmit,
  canSubmit,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        // Save order ID to localStorage for tracking
        localStorage.setItem("lastOrderId", data.orderId);
        localStorage.setItem("lastInvoiceNumber", data.invoiceNumber);
        onSubmit(); // Show success state
      } else {
        setError(data.error || "Gagal mengirim order. Silakan coba lagi.");
      }
    } catch (err) {
      setError("Koneksi error. Periksa internet Anda.");
      console.error("Submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <FormField icon={<User size={14} />} label="Nama Lengkap">
        <input
          value={form.nama}
          onChange={(e) => updateField("nama", e.target.value)}
          placeholder="Budi Santoso"
          className="w-full border border-black/12 rounded-xl px-4 py-3 text-sm text-black placeholder-black/30 focus:outline-none focus:border-black/50 transition-colors bg-white"
        />
      </FormField>

      <FormField icon={<CreditCard size={14} />} label="Email Aktif">
        <input
          type="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="budi@email.com"
          className="w-full border border-black/12 rounded-xl px-4 py-3 text-sm text-black placeholder-black/30 focus:outline-none focus:border-black/50 transition-colors bg-white"
        />
      </FormField>

      <FormField
        icon={<MessageSquare size={14} />}
        label="Nomor WhatsApp"
        hint="Format: 08xxxxxxxxxx"
      >
        <input
          value={form.wa}
          onChange={(e) => updateField("wa", e.target.value)}
          placeholder="081234567890"
          className="w-full border border-black/12 rounded-xl px-4 py-3 text-sm text-black placeholder-black/30 focus:outline-none focus:border-black/50 transition-colors bg-white"
        />
      </FormField>

      {/* Summary */}
      <div className="rounded-xl border border-black/10 bg-black/[0.02] p-5 space-y-2">
        <p className="text-[10px] uppercase tracking-wider text-black/30 mb-3 font-medium">
          Ringkasan Order
        </p>
        {[
          ["Paket", form.paket?.toUpperCase() || "-"],
          ["Gaya", form.style || "-"],
          ["Mood", form.mood.join(", ") || "-"],
          ["Palet", form.palette || "-"],
          ["Halaman", form.halaman || "-"],
        ].map(([key, value]) => (
          <div key={key} className="flex gap-3 text-xs">
            <span className="text-black/30 w-16 shrink-0">{key}</span>
            <span className="text-black/70 capitalize">{value}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 py-3.5 rounded-xl text-sm font-medium border border-black/12 text-black/50 hover:bg-black/5 transition-all disabled:opacity-50"
        >
          Kembali
        </button>
        <button
          type="button"
          disabled={!canSubmit || isSubmitting}
          onClick={handleSubmit}
          className="flex-[2] py-3.5 rounded-xl text-sm font-semibold text-white bg-black hover:bg-black/80 transition-all disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Memproses...
            </>
          ) : (
            "Kirim Brief →"
          )}
        </button>
      </div>
    </>
  );
}
