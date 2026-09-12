import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "../../../../lib/db";
import { createSessionToken, AUTH_COOKIE_NAME } from "../../../../lib/auth";
import { checkRateLimit, getClientIp } from "../../../../lib/rateLimit";

export async function POST(req) {
  try {
    const ip = getClientIp(req);
    const limit = checkRateLimit(`signup:${ip}`, 5, 60 * 60 * 1000); // 5 signups per hour per IP

    if (!limit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many registration attempts. Please wait ${Math.ceil(limit.retryAfter / 60)} minutes before trying again.`,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, phone, password } = body;

    if (!name?.trim()) {
      return NextResponse.json({ success: false, error: "Please enter your name." }, { status: 400 });
    }
    if (!email?.trim() || !email.includes("@")) {
      return NextResponse.json({ success: false, error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!password || password.length < 6) {
      return NextResponse.json({ success: false, error: "Password must be at least 6 characters." }, { status: 400 });
    }

    const existing = findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { success: false, error: "An account with this email already exists. Please log in." },
        { status: 409 }
      );
    }

    const newUser = createUser({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || "",
      password,
    });

    const token = await createSessionToken(newUser);

    const response = NextResponse.json({
      success: true,
      user: newUser,
      message: "Account created successfully.",
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create account." },
      { status: 500 }
    );
  }
}
