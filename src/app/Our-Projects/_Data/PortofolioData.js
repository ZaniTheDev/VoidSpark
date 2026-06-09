// src/data/portfolioData.js
export const ourWorkProjects = [
  {
    id: 1,
    title: "Short Form Content",
    description: "Membuat konten edukasi short form",
    category: "Editing",
    service: "Editing",
    image: "/images/editing.png",
    year: "2025",
    featured: true,
  },

  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Membuat website E-Commerce yang menjual subscription kopi",
    category: "Website",
    service: "UX Design & Development",
    image: "/images/websiteKopi.png",
    year: "2024",
    featured: false,
  },

  {
    id: 3,
    title: "Website Sekolah",
    description: "Membuat website sekolah yang dilengkapi dengan sistem CMS",
    category: "Education",
    service: "Website",
    image: "/images/website-bani-adna.png",
    year: "2025",
    featured: false,
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
