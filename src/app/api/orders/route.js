import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function generateInvoiceNumber() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `INV-${year}${month}-${random}`;
}

export async function POST(request) {
  try {
    // Parse the JSON body
    const data = await request.json();

    // Validate required fields
    const required = [
      "nama",
      "email",
      "wa",
      "paket",
      "style",
      "palette",
      "halaman",
    ];
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing field: ${field}` },
          { status: 400 },
        );
      }
    }

    // Check if prisma is initialized
    if (!prisma) {
      console.error("Prisma not initialized");
      return NextResponse.json(
        { error: "Database connection error" },
        { status: 500 },
      );
    }

    // Create order in database
    const order = await prisma.order.create({
      data: {
        nama: data.nama,
        email: data.email,
        wa: data.wa,
        paket: data.paket,
        style: data.style,
        mood: data.mood || [],
        palette: data.palette,
        halaman: data.halaman,
        referensi: data.referensi || "",
        invoiceNumber: generateInvoiceNumber(),
      },
    });

    // Return success response
    return NextResponse.json({
      success: true,
      orderId: order.id,
      invoiceNumber: order.invoiceNumber,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    // Always return a valid JSON response
    return NextResponse.json(
      { error: "Failed to create order: " + error.message },
      { status: 500 },
    );
  }
}

// Add OPTIONS handler for CORS if needed
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
