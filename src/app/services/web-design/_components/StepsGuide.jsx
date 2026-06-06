import { ChevronRight } from "lucide-react";

const steps = [
  {
    no: "01",
    title: "Pilih Paket",
    desc: "Pilih paket yang sesuai dengan kebutuhan dan anggaran Anda.",
  },
  {
    no: "02",
    title: "Isi Formulir",
    desc: "Lengkapi form desain dengan detail visi dan preferensi Anda.",
  },
  {
    no: "03",
    title: "Lakukan Pembayaran",
    desc: "Transfer ke rekening kami dan konfirmasi via WhatsApp.",
  },
  {
    no: "04",
    title: "Proses Desain",
    desc: "Tim kami mulai bekerja dan mengirim progress secara berkala.",
  },
  {
    no: "05",
    title: "Revisi & Selesai",
    desc: "Review hasilnya, minta revisi jika perlu, lalu website siap tayang.",
  },
];

export function StepsGuide({ stepsRef, sectionRefs }) {
  return (
    <section>
      <div ref={(el) => (sectionRefs.current[0] = el)} className="mb-5">
        <p className="text-[10px] uppercase tracking-[0.16em] text-black/35 mb-1.5">
          Panduan
        </p>
        <h2
          className="text-xl font-semibold tracking-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          Cara Pemesanan
        </h2>
        <p className="text-xs text-black/45 mt-1">
          Ikuti langkah berikut untuk memesan website impian Anda.
        </p>
      </div>

      <div className="space-y-2">
        {steps.map((step, i) => (
          <div
            key={step.no}
            ref={(el) => (stepsRef.current[i] = el)}
            className="flex gap-3 p-3 rounded-xl border border-black/7 bg-black/[0.015] hover:bg-black/[0.03] transition-colors duration-200"
          >
            <span className="text-[10px] font-semibold text-black/25 mt-0.5 w-4 shrink-0">
              {step.no}
            </span>
            <div className="flex-1">
              <p className="text-xs font-semibold text-black mb-0.5">
                {step.title}
              </p>
              <p className="text-xs text-black/50 leading-relaxed">
                {step.desc}
              </p>
            </div>
            <ChevronRight size={14} className="text-black/20 shrink-0 mt-0.5" />
          </div>
        ))}
      </div>
    </section>
  );
}
