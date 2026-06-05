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
      <div ref={(el) => (sectionRefs.current[0] = el)} className="mb-8">
        <p className="text-[11px] uppercase tracking-[0.18em] text-black/35 mb-2">
          Panduan
        </p>
        <h2
          className="text-2xl font-semibold tracking-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          Cara Pemesanan
        </h2>
        <p className="text-sm text-black/45 mt-1.5">
          Ikuti langkah berikut untuk memesan website impian Anda.
        </p>
      </div>

      <div className="space-y-3">
        {steps.map((step, i) => (
          <div
            key={step.no}
            ref={(el) => (stepsRef.current[i] = el)}
            className="flex gap-5 p-5 rounded-2xl border border-black/7 bg-black/[0.015] hover:bg-black/[0.03] transition-colors duration-200"
          >
            <span className="text-[11px] font-semibold text-black/25 mt-0.5 w-5 shrink-0">
              {step.no}
            </span>
            <div>
              <p className="text-sm font-semibold text-black mb-0.5">
                {step.title}
              </p>
              <p className="text-sm text-black/50 leading-relaxed">
                {step.desc}
              </p>
            </div>
            <ChevronRight
              size={16}
              className="ml-auto text-black/20 shrink-0 mt-0.5"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
