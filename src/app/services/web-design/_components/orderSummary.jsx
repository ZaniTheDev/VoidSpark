export function OrderSummary({ form }) {
  const items = [
    ["Paket", form.paket],
    ["Gaya", form.style],
    ["Mood", form.mood.join(", ")],
    ["Palet", form.palette],
    ["Halaman", form.halaman],
  ].filter(([, value]) => value);

  if (items.length === 0) return null;

  return (
    <div className="rounded-xl border border-black/10 bg-black/[0.02] p-5 space-y-2">
      <p className="text-[10px] uppercase tracking-wider text-black/30 mb-3 font-medium">
        Ringkasan Order
      </p>
      {items.map(([key, value]) => (
        <div key={key} className="flex gap-3 text-xs">
          <span className="text-black/30 w-16 shrink-0">{key}</span>
          <span className="text-black/70 capitalize">{value}</span>
        </div>
      ))}
    </div>
  );
}
