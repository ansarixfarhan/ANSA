import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/auth";

export async function GET(req) {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return NextResponse.json({ success: false, user: null }, { status: 200 });
    }

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error("Auth me error:", err);
    return NextResponse.json({ success: false, user: null }, { status: 200 });
  }
}
