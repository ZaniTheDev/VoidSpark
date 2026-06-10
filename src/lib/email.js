import { Resend } from "resend";
import { pricingPlans } from "@/app/services/web-design/_config/pricing";

const resend = new Resend(process.env.RESEND_API_KEY);

const formatPrice = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

function getPlan(order) {
  return pricingPlans.find((plan) => plan.id === order.paket);
}

export async function sendOrderConfirmations(order) {
  const plan = getPlan(order);
  const total = plan?.priceValue || 0;
  const fromEmail =
    process.env.ORDER_FROM_EMAIL || "Voidspark Studio <onboarding@resend.dev>";
  const adminEmail = process.env.ADMIN_EMAIL;

  await resend.emails.send({
    from: fromEmail,
    to: order.email,
    subject: `Order Confirmation - ${order.invoiceNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #000;">Terima kasih, ${order.nama}!</h1>
        <p>Order Anda telah kami terima dengan detail:</p>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Invoice: ${order.invoiceNumber}</h3>
          <p><strong>Paket:</strong> ${plan?.name || order.paket}</p>
          <p><strong>Total:</strong> ${total ? formatPrice(total) : "-"}</p>
          <p><strong>DP 50%:</strong> ${total ? formatPrice(total / 2) : "-"}</p>
          <p><strong>Style:</strong> ${order.style}</p>
          <p><strong>Mood:</strong> ${order.mood.join(", ") || "-"}</p>
          <p><strong>Halaman:</strong> ${order.halaman}</p>
        </div>

        <p>Kami akan menghubungi Anda dalam 1x24 jam melalui WhatsApp atau email.</p>
        <p>Simpan invoice ini sebagai referensi Anda.</p>

        <hr style="margin: 30px 0;" />
        <p style="color: #666; font-size: 12px;">
          Voidspark Studio
        </p>
      </div>
    `,
  });

  if (!adminEmail) return;

  await resend.emails.send({
    from: fromEmail,
    to: adminEmail,
    subject: `New Order: ${order.invoiceNumber}`,
    html: `
      <h1>New Order Received</h1>
      <p><strong>Customer:</strong> ${order.nama}</p>
      <p><strong>Email:</strong> ${order.email}</p>
      <p><strong>WhatsApp:</strong> ${order.wa}</p>
      <p><strong>Package:</strong> ${plan?.name || order.paket}</p>
      <p><strong>Invoice:</strong> ${order.invoiceNumber}</p>
      <p><strong>Pages:</strong> ${order.halaman}</p>
    `,
  });
}
