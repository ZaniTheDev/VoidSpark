import { prisma } from "@/lib/prisma";
import { sendOrderConfirmations } from "@/lib/email";
import { NextResponse } from "next/server";
import { z } from "zod";
import { pricingPlans } from "@/app/services/web-design/_config/pricing";
import {
  colorOptions,
  moodOptions,
  styleOptions,
} from "@/app/services/web-design/_config/design-options";

const validPackages = pricingPlans.map((plan) => plan.id);
const validStyles = styleOptions.map((option) => option.id);
const validPalettes = colorOptions.map((option) => option.name);

const orderSchema = z.object({
  nama: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(120),
  wa: z
    .string()
    .trim()
    .regex(/^(\+62|62|0)8[0-9]{8,13}$/),
  paket: z.enum(validPackages),
  style: z.enum(validStyles),
  mood: z.array(z.enum(moodOptions)).max(3).default([]),
  palette: z.enum(validPalettes),
  halaman: z.string().trim().min(2).max(1000),
  referensi: z.string().trim().max(2000).optional().default(""),
});

function generateInvoiceNumber() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `INV-${year}${month}-${random}`;
}

function getValidationMessage(error) {
  const firstIssue = error.issues?.[0];
  if (!firstIssue) return "Data order tidak valid";

  const field = firstIssue.path.join(".");
  return `Field ${field} tidak valid`;
}

export async function POST(request) {
  try {
    const json = await request.json();
    const parsed = orderSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: getValidationMessage(parsed.error) },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const selectedPlan = pricingPlans.find((plan) => plan.id === data.paket);

    const order = await prisma.order.create({
      data: {
        nama: data.nama,
        email: data.email,
        wa: data.wa,
        paket: data.paket,
        style: data.style,
        mood: data.mood,
        palette: data.palette,
        halaman: data.halaman,
        referensi: data.referensi,
        invoiceNumber: generateInvoiceNumber(),
      },
    });

    if (process.env.RESEND_API_KEY) {
      try {
        await sendOrderConfirmations(order);
      } catch (error) {
        console.error("Order email error:", error);
      }
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      invoiceNumber: order.invoiceNumber,
      totalPrice: selectedPlan?.priceValue || 0,
      packageName: selectedPlan?.name || data.paket,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Gagal membuat order. Silakan coba lagi." },
      { status: 500 },
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
