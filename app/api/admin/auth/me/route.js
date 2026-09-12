import { NextResponse } from "next/server";
import { getAdminSession } from "../../../../../lib/adminAuth";

export async function GET(req) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    admin: {
      username: session.username,
      name: session.name,
      role: session.role,
    },
  });
}
