// SuccessState.jsx
import { Check, CheckCircle2, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export function SuccessState({ onContinue }) {
  const [invoiceNumber, setInvoiceNumber] = useState("");

  useEffect(() => {
    const invoice = localStorage.getItem("lastInvoiceNumber");
    if (invoice) setInvoiceNumber(invoice);
  }, []);

  return (
    <div className="rounded-2xl border border-black/10 p-10 text-center">
      <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center mx-auto mb-5">
        <Check size={24} color="white" />
      </div>
      <h3 className="text-xl font-semibold tracking-tight mb-2">
        Brief Diterima!
      </h3>
      {invoiceNumber && (
        <p className="text-xs text-black/40 mb-2 font-mono">
          Invoice: {invoiceNumber}
        </p>
      )}
      <p className="text-sm text-black/50 leading-relaxed max-w-xs mx-auto mb-6">
        Kami akan meninjau brief Anda dan menghubungi dalam 1×24 jam melalui
        email atau WhatsApp.
      </p>
      <div className="inline-flex items-center gap-2 text-xs text-black/35 bg-black/5 px-4 py-2 rounded-full mb-6">
        <CheckCircle2 size={12} />
        Simpan nomor invoice untuk referensi
      </div>

      {/* Add continue button */}
      {onContinue && (
        <button
          onClick={onContinue}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-black hover:bg-black/80 transition-all"
        >
          Lanjut ke Pembayaran
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}
