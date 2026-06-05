import { useState } from "react";
import { Check, Copy, CircleAlert, ChevronRight } from "lucide-react";
import { bankAccounts, qrisAccounts } from "../_config/pricing";

export function PaymentInfo() {
  const [copied, setCopied] = useState("");

  const copyRek = (val, id) => {
    navigator.clipboard.writeText(val);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  // Add this copy function for QRIS
  const copyQris = (val, id) => {
    navigator.clipboard.writeText(val);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="space-y-4">
      {/* notice */}
      <div className="flex gap-3 p-4 rounded-xl bg-black/[0.03] border border-black/8">
        <CircleAlert size={15} className="shrink-0 mt-0.5 text-black/40" />
        <p className="text-xs text-black/55 leading-relaxed">
          Pembayaran dilakukan setelah kami mengirimkan invoice resmi melalui
          email atau WhatsApp. Harap transfer sesuai nominal yang tertera, lalu
          kirim bukti transfer ke WhatsApp kami.
        </p>
      </div>

      {/* bank accounts */}
      {bankAccounts.map((account, i) => (
        <div key={i} className="rounded-2xl border border-black/10 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-black/35 mb-1 font-medium">
                Transfer Bank
              </p>
              <p className="text-lg font-semibold tracking-tight">
                {account.bank}
              </p>
            </div>
            <span className="text-xl px-3 py-1 rounded-full bg-black/5 text-black/50 font-medium">
              {account.bank}
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/[0.025] border border-black/6">
              <div>
                <p className="text-[10px] text-black/35 mb-0.5">
                  Nomor Rekening
                </p>
                <p className="text-sm font-semibold tracking-widest">
                  {account.noRek}
                </p>
              </div>
              <button
                onClick={() => copyRek(account.noRek, `rek-${i}`)}
                className="flex items-center gap-1.5 text-xs text-black/40 hover:text-black transition-colors px-3 py-1.5 rounded-lg hover:bg-black/5"
              >
                {copied === `rek-${i}` ? (
                  <Check size={13} />
                ) : (
                  <Copy size={13} />
                )}
                {copied === `rek-${i}` ? "Disalin" : "Salin"}
              </button>
            </div>
            <div className="px-3.5 py-2.5 rounded-xl bg-black/[0.025] border border-black/6">
              <p className="text-[10px] text-black/35 mb-0.5">Atas Nama</p>
              <p className="text-sm font-medium">{account.atas}</p>
            </div>
          </div>
        </div>
      ))}

      {/* QRIS accounts */}
      {qrisAccounts.map((account, i) => (
        <div key={i} className="rounded-2xl border border-black/10 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-black/35 mb-1 font-medium">
                Transfer QRIS
              </p>
              <p className="text-lg font-semibold tracking-tight">
                Scan QR Code
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-black/5 text-black/50 font-medium">
              QRIS
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-black/[0.025] border border-black/6">
              <div className="bg-gray-50 rounded-xl flex items-center justify-center mb-3 overflow-hidden border border-black/5 p-4">
                <img
                  src={account.qrisImageUrl}
                  alt="QRIS Code"
                  className=" md:w-100 md:h-100 object-contain"
                />
              </div>
              <button
                onClick={() => copyQris(account.qrisImageUrl, `qris-${i}`)}
                className="flex items-center gap-1.5 text-xs text-black/40 hover:text-black transition-colors px-3 py-1.5 rounded-lg hover:bg-black/5"
              >
                {copied === `qris-${i}` ? (
                  <Check size={13} />
                ) : (
                  <Copy size={13} />
                )}
                {copied === `qris-${i}` ? "Sedang diunduh" : "Unduh QRIS"}
              </button>
            </div>
            <div className="px-3.5 py-2.5 rounded-xl bg-black/[0.025] border border-black/6">
              <p className="text-[10px] text-black/35 mb-0.5">Atas Nama</p>
              <p className="text-sm font-medium">{account.atas}</p>
            </div>
          </div>
        </div>
      ))}

      {/* konfirmasi */}
      <div className="rounded-2xl border border-black/10 p-6">
        <p className="text-[10px] uppercase tracking-wider text-black/35 mb-4 font-medium">
          Konfirmasi Pembayaran
        </p>
        <p className="text-sm text-black/60 leading-relaxed mb-5">
          Setelah transfer, kirimkan bukti pembayaran beserta{" "}
          <span className="font-medium text-black">nama lengkap</span> dan{" "}
          <span className="font-medium text-black">paket yang dipilih</span> ke
          WhatsApp kami.
        </p>
        <a
          href="https://wa.me/6281234567890?text=Halo,%20saya%20sudah%20transfer%20untuk%20order%20website"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-black hover:bg-black/80 transition-all"
        >
          Konfirmasi via WhatsApp
          <ChevronRight size={14} />
        </a>
      </div>

      {/* catatan */}
      <div className="rounded-2xl border border-black/8 bg-black/[0.015] p-5 space-y-2.5">
        <p className="text-[10px] uppercase tracking-wider text-black/30 mb-3 font-medium">
          Catatan Penting
        </p>
        {[
          "Harga belum termasuk pajak (jika berlaku)",
          "Pembayaran DP 50% di awal, 50% saat selesai",
          "Refund tidak dapat dilakukan setelah pekerjaan dimulai",
          "Timeline berjalan setelah pembayaran DP diterima",
          "Hubungi kami untuk negosiasi paket custom",
        ].map((note, i) => (
          <div
            key={i}
            className="flex items-start gap-2.5 text-xs text-black/50"
          >
            <span className="w-1 h-1 rounded-full bg-black/25 shrink-0 mt-1.5" />
            {note}
          </div>
        ))}
      </div>
    </div>
  );
}
