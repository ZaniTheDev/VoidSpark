export function Footer() {
  return (
    <footer className="border-t border-black/8 mt-16">
      <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-black/35">
          © 2025 Voidspark Studio. Semua hak dilindungi.
        </p>
        <p className="text-xs text-black/35">
          Ada pertanyaan?{" "}
          <a
            href="https://wa.me/6285813495425"
            className="text-black underline underline-offset-2"
          >
            Hubungi kami
          </a>
        </p>
      </div>
    </footer>
  );
}
