import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/auth";
import { getOrdersByUserId, getOrdersByEmail } from "../../../../lib/db";

export async function GET(req) {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Fetch orders by userId or email
    const userOrders = getOrdersByUserId(user.id);
    const emailOrders = getOrdersByEmail(user.email);

    // Merge unique orders
    const map = new Map();
    for (const o of [...userOrders, ...emailOrders]) {
      map.set(o.id, o);
    }
    const orders = Array.from(map.values()).sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (err) {
    console.error("Fetch user orders error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
