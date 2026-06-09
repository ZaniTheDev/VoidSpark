import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!jwtSecret || !adminUsername || !adminPasswordHash) {
      console.error("Admin auth environment variables are not configured");
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const usernameMatches = username === adminUsername;
    const passwordMatches = await bcrypt.compare(password, adminPasswordHash);

    if (!usernameMatches || !passwordMatches) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      { username: adminUsername, role: "admin" },
      jwtSecret,
      { expiresIn: "24h" },
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
