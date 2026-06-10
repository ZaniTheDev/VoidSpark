import { pricingPlans } from "../_config/pricing";

const formatPrice = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

export function OrderSummary({ form, order }) {
  const selectedPlan = pricingPlans.find((plan) => plan.id === form.paket);
  const total = selectedPlan?.priceValue || order?.totalPrice || 0;
  const downPayment = total ? total / 2 : 0;

  const items = [
    ["Invoice", order?.invoiceNumber],
    ["Paket", selectedPlan?.name || form.paket],
    ["Cocok untuk", selectedPlan?.bestFor],
    ["Harga", total ? formatPrice(total) : ""],
    ["DP 50%", downPayment ? formatPrice(downPayment) : ""],
    ["Gaya", form.style],
    ["Mood", form.mood?.join(", ")],
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
          <span className="text-black/30 w-20 shrink-0">{key}</span>
          <span className="text-black/70">{value}</span>
        </div>
      ))}
    </div>
  );
}
