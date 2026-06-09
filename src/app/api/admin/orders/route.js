import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

function verifyToken(request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

export async function GET(request) {
  const user = verifyToken(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}

export async function PUT(request) {
  const user = verifyToken(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderId, status } = await request.json();

  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });

  return NextResponse.json(order);
}

export async function DELETE(request) {
  const user = verifyToken(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderId } = await request.json();
  if (!orderId) {
    return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
  }

  await prisma.order.delete({
    where: { id: orderId },
  });

  return NextResponse.json({ success: true });
}
