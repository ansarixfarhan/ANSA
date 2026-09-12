import { NextResponse } from "next/server";
import { getAdminSession } from "../../../../lib/adminAuth";
import { getAdminMetrics } from "../../../../lib/db";

export async function GET(req) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const stats = getAdminMetrics();
  return NextResponse.json({ success: true, stats });
}
