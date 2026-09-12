import { NextResponse } from "next/server";
import { getAdminSession } from "../../../../../lib/adminAuth";
import { findOrderById, updateOrderFull, deleteOrder } from "../../../../../lib/db";

export async function GET(req, { params }) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;
  const order = findOrderById(id);

  if (!order) {
    return NextResponse.json(
      { success: false, error: "Order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, order });
}

export async function PUT(req, { params }) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;
  const body = await req.json();

  const updated = updateOrderFull(id, body);
  if (!updated) {
    return NextResponse.json(
      { success: false, error: "Order not found or update failed" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    order: updated,
    message: "Order updated successfully",
  });
}

export async function DELETE(req, { params }) {
  const session = await getAdminSession(req);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;
  const deleted = deleteOrder(id);

  if (!deleted) {
    return NextResponse.json(
      { success: false, error: "Order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Order deleted successfully",
  });
}
