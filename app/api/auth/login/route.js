import { NextResponse } from "next/server";
import { findUserByEmail, verifyPassword } from "../../../../lib/db";
import { createSessionToken, AUTH_COOKIE_NAME } from "../../../../lib/auth";
import { checkRateLimit, getClientIp } from "../../../../lib/rateLimit";

export async function POST(req) {
  try {
    const ip = getClientIp(req);
    const limit = checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000);

    if (!limit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many login attempts. Please wait ${limit.retryAfter} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email, password } = body;

    if (!email?.trim() || !password) {
      return NextResponse.json(
        { success: false, error: "Please enter both email and password." },
        { status: 400 }
      );
    }

    const user = findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = await createSessionToken(user);
    const { passwordHash: _, ...safeUser } = user;

    const response = NextResponse.json({
      success: true,
      user: safeUser,
      message: "Logged in successfully.",
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
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
