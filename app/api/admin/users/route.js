import { NextResponse } from "next/server";
import { getAdminSession } from "../../../../lib/adminAuth";
import { getAllUsers, getAllOrders } from "../../../../lib/db";

export async function GET(req) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const users = getAllUsers();
  const orders = getAllOrders();

  // Attach order count & total spent to each user
  const safeUsers = users.map((user) => {
    const { passwordHash: _, ...safe } = user;
    const userOrders = orders.filter(
      (o) => o.user_id === user.id || o.email?.toLowerCase() === user.email?.toLowerCase()
    );
    const totalSpent = userOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    return {
      ...safe,
      ordersCount: userOrders.length,
      totalSpent,
    };
  });

  safeUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return NextResponse.json({
    success: true,
    users: safeUsers,
    count: safeUsers.length,
  });
}
