import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const adminPassword = process.env.ADMIN_SECRET_PASSWORD;

    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (!email) {
      return NextResponse.json({ error: "Admin ID required" }, { status: 400 });
    }

    const supabase = await createAdminClient();
    const { data: user, error: userError } = await supabase
      .from("admin_users")
      .select("id, role, is_active")
      .eq("email", email)
      .single();

    if (userError || !user || !user.is_active) {
      return NextResponse.json({ error: "Admin ID not authorized" }, { status: 401 });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("CRITICAL: JWT_SECRET environment variable is not set.");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }
    const secret = new TextEncoder().encode(jwtSecret);
    
    // Sign JWT valid for 7 days
    const token = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    const response = NextResponse.json({ success: true });
    
    // Set cookie
    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
