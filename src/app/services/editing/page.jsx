"use client";

export default function Home() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* Main Text */}
        <h1 className="svc-headline text-6xl sm:text-7xl md:text-[1.5rem] font-semibold leading-[0.95] tracking-[-0.03em] text-neutral-900 will-change-transform">
          This page is under construction 🚧
        </h1>

        {/* Back Button with spacing */}
        <button
          onClick={goBack}
          className="mt-5 px-6 py-1.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
