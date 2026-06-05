import { FileText, MessageSquare } from "lucide-react";
import { FormField } from "./FormField";
import { NavButtons } from "./NavButtons";

export function DetailsStep({ form, updateField, onBack, onNext }) {
  const canProceed = form.halaman;

  return (
    <>
      <FormField
        icon={<FileText size={14} />}
        label="Halaman yang Dibutuhkan"
        hint="Contoh: Home, Layanan, Harga, Tentang Kami, Kontak"
      >
        <textarea
          rows={3}
          value={form.halaman}
          onChange={(e) => updateField("halaman", e.target.value)}
          placeholder="Home, Layanan, Harga, Kontak..."
          className="w-full border border-black/12 rounded-xl px-4 py-3 text-sm text-black placeholder-black/30 resize-none focus:outline-none focus:border-black/50 transition-colors bg-white"
        />
      </FormField>

      <FormField
        icon={<MessageSquare size={14} />}
        label="Referensi & Catatan Tambahan"
        hint="Website yang Anda sukai, fitur wajib, hal yang ingin dihindari"
        optional
      >
        <textarea
          rows={5}
          value={form.referensi}
          onChange={(e) => updateField("referensi", e.target.value)}
          placeholder="Saya suka tampilan apple.com yang minimalis... ingin ada animasi scroll... hindari warna merah..."
          className="w-full border border-black/12 rounded-xl px-4 py-3 text-sm text-black placeholder-black/30 resize-none focus:outline-none focus:border-black/50 transition-colors bg-white"
        />
      </FormField>

      <NavButtons onBack={onBack} onNext={onNext} disabled={!canProceed} />
    </>
  );
}
