import { NextResponse } from "next/server";
import { findOrderById, findOrderByNumber } from "../../../../lib/db";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    // 1. Check local persistent DB
    let order = findOrderById(id) || findOrderByNumber(id);

    // 2. If not found locally, try Supabase (if configured)
    if (!order && supabaseAdmin) {
      try {
        const { data: supaOrder, error: orderError } = await supabaseAdmin
          .from("orders")
          .select("*")
          .eq("id", id)
          .single();

        if (!orderError && supaOrder) {
          const { data: items } = await supabaseAdmin
            .from("order_items")
            .select("*")
            .eq("order_id", id);

          order = {
            ...supaOrder,
            items: items || [],
          };
        }
      } catch {
        // Supabase error ignored
      }
    }

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error: "Order not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (err) {
    console.error("Order query error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}