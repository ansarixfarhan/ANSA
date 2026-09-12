import { NextResponse } from "next/server";
import { getAdminSession } from "../../../../lib/adminAuth";
import { getAllOrders } from "../../../../lib/db";

export async function GET(req) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const query = searchParams.get("search")?.trim().toLowerCase();

  let orders = getAllOrders();

  // Filter by status if provided
  if (status && status !== "all") {
    orders = orders.filter((o) => o.status?.toLowerCase() === status.toLowerCase());
  }

  // Filter by search query if provided
  if (query) {
    orders = orders.filter((o) => {
      const orderNum = o.order_number?.toLowerCase() || "";
      const name = o.customer_name?.toLowerCase() || "";
      const phone = o.phone?.toLowerCase() || "";
      const email = o.email?.toLowerCase() || "";
      const tracking = o.tracking_id?.toLowerCase() || "";
      return (
        orderNum.includes(query) ||
        name.includes(query) ||
        phone.includes(query) ||
        email.includes(query) ||
        tracking.includes(query)
      );
    });
  }

  // Sort newest first
  orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return NextResponse.json({
    success: true,
    orders,
    count: orders.length,
  });
}
