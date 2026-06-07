import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Hardcoded for testing 
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123"; 

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = jwt.sign(
        { username, role: "admin" },
        process.env.JWT_SECRET || "test-secret-key",
        { expiresIn: "24h" },
      );
      return NextResponse.json({ token });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
