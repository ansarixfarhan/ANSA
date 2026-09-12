import { NextResponse } from "next/server";
import {
  verifyAdminCredentials,
  createAdminToken,
  ADMIN_COOKIE_NAME,
} from "../../../../../lib/adminAuth";
import { checkRateLimit, getClientIp } from "../../../../../lib/rateLimit";

export async function POST(req) {
  try {
    const ip = getClientIp(req);
    const limit = checkRateLimit(`admin_login:${ip}`, 5, 15 * 60 * 1000);

    if (!limit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many login attempts. Please wait ${limit.retryAfter} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required." },
        { status: 400 }
      );
    }

    const admin = verifyAdminCredentials(username, password);

    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Invalid admin credentials." },
        { status: 401 }
      );
    }

    const token = await createAdminToken(admin);

    const response = NextResponse.json({
      success: true,
      admin: {
        username: admin.username,
        name: admin.name,
      },
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json(
      { success: false, error: "Authentication failed." },
      { status: 500 }
    );
  }
}
