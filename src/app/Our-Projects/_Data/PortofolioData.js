// src/data/portfolioData.js
export const CASES = [
  {
    id: "01",
    mission: "Misi 01",
    tag: "Web Design",
    title:
      "Selamatkan toko kopi yang kehilangan 60% pelanggan karena website-nya terlihat seperti dibuat tahun 2009.",
    desc: "Menu tidak bisa di-scroll di HP, tombol pesan error, dan foto produk blur. Kami rebuild dari nol dalam 5 hari.",
    location: "Jakarta · 2025",
    large: true,
  },
  {
    id: "02",
    mission: "Misi 02",
    tag: "Branding",
    title:
      "Brand studio arsitektur butik yang terlihat lebih tua dari gedung yang mereka desain.",
    desc: "Logo pixelated, warna tidak konsisten. Sekarang: identitas visual yang bikin klien korporat percaya.",
    location: "Bandung · 2025",
    large: false,
  },
  {
    id: "03",
    mission: "Misi 03",
    tag: "Editing Video",
    title:
      "Konten podcast yang bagus isinya, tapi ditonton 200 orang karena editingnya membosankan.",
    desc: "Reformat jadi short-form clips dengan caption dynamic. Views naik 12x dalam 3 minggu.",
    location: "Surabaya · 2024",
    large: false,
  },
];

export const HOTSPOTS = [
  {
    id: 1,
    style: { top: "14px", left: "140px" },
    tip: "Logo kiri atas meningkatkan brand recall 30% dibanding posisi tengah.",
    tipPos: { top: "4px", left: "175px" },
  },
  {
    id: 2,
    style: { top: "14px", right: "90px" },
    tip: "CTA di navbar: 2.4× lebih banyak klik vs tombol footer-only.",
    tipPos: { top: "4px", right: "10px" },
  },
  {
    id: 3,
    style: { bottom: "96px", left: "24px" },
    tip: "Pill button (bukan kotak): +18% CTR di mobile.",
    tipPos: { bottom: "140px", left: "60px" },
  },
  {
    id: 4,
    style: { bottom: "54px", left: "24px" },
    tip: "Warna hitam solid: konversi 200% vs hijau/merah.",
    tipPos: { bottom: "98px", left: "60px" },
  },
];

export const METRICS = [
  ["8.4s", "Load dulu"],
  ["→ 1.1s", "Load sekarang"],
  ["+340%", "Konversi naik"],
];

export const MARQUEE_ITEMS = [
  "Web Design",
  "Editing Video",
  "Branding",
  "UI/UX",
  "Visual Identity",
  "Motion Design",
];

export const TABS = ["Misi Klien", "Sebelum vs Sesudah", "Anotasi Desain"];
