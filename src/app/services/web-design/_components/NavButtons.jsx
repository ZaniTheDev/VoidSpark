export function NavButtons({
  onBack,
  onNext,
  disabled,
  nextText = "Lanjutkan ->",
}) {
  return (
    <div className="flex gap-3 pt-1">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3.5 rounded-xl text-sm font-medium border border-black/12 text-black/50 hover:bg-black/5 transition-all"
        >
          Kembali
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        className="flex-[2] py-3.5 rounded-xl text-sm font-semibold text-white bg-black hover:bg-black/80 active:scale-[0.98] transition-all disabled:opacity-25 disabled:pointer-events-none"
      >
        {nextText}
      </button>
    </div>
  );
}
