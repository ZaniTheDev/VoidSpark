import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmations(order) {
  // Get package price
  const prices = {
    starter: "Rp 1.500.000",
    pro: "Rp 3.500.000",
    business: "Rp 6.500.000",
  };

  // Email to customer
  await resend.emails.send({
    from: "Voidspark Studio <orders@voidspark.com>",
    to: order.email,
    subject: `Order Confirmation - ${order.invoiceNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #000;">Terima kasih, ${order.nama}!</h1>
        <p>Order Anda telah kami terima dengan detail:</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Invoice: ${order.invoiceNumber}</h3>
          <p><strong>Paket:</strong> ${order.paket.toUpperCase()}</p>
          <p><strong>Total:</strong> ${prices[order.paket]}</p>
          <p><strong>Style:</strong> ${order.style}</p>
          <p><strong>Mood:</strong> ${order.mood.join(", ")}</p>
        </div>
        
        <p>Kami akan menghubungi Anda dalam 1x24 jam melalui WhatsApp atau email.</p>
        <p>Simpan invoice ini sebagai referensi Anda.</p>
        
        <hr style="margin: 30px 0;" />
        <p style="color: #666; font-size: 12px;">
          Voidspark Studio<br/>
          Ada pertanyaan? Hubungi: +62 812-3456-7890
        </p>
      </div>
    `,
  });

  // Email to admin
  await resend.emails.send({
    from: "Voidspark Studio <notifications@voidspark.com>",
    to: "admin@voidspark.com",
    subject: `🔔 New Order: ${order.invoiceNumber}`,
    html: `
      <h1>New Order Received!</h1>
      <p><strong>Customer:</strong> ${order.nama}</p>
      <p><strong>Email:</strong> ${order.email}</p>
      <p><strong>WhatsApp:</strong> ${order.wa}</p>
      <p><strong>Package:</strong> ${order.paket}</p>
      <p><strong>Invoice:</strong> ${order.invoiceNumber}</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/orders/${order.id}">
        View Order Details
      </a>
    `,
  });
}
