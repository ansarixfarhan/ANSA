import { NextResponse } from "next/server";
import { findOrderByNumber, findOrderById } from "../../../lib/db";
import { supabase } from "../../../lib/supabase";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const orderNumber = searchParams.get("orderNumber") || searchParams.get("order");
    const phone = searchParams.get("phone");

    if (!orderNumber) {
      return NextResponse.json({ success: false, error: "Order number is required" }, { status: 400 });
    }

    // 1. First search in local persistent database
    let order = findOrderByNumber(orderNumber) || findOrderById(orderNumber);

    // 2. If not found and Supabase is available, try Supabase
    if (!order) {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*, order_items(*)")
          .or(`order_number.eq.${orderNumber},id.eq.${orderNumber}`)
          .single();

        if (!error && data) {
          order = {
            ...data,
            items: data.order_items || [],
          };
        }
      } catch {
        // Ignore Supabase connection error
      }
    }

    if (!order) {
      return NextResponse.json(
        { success: false, error: `No order found matching "${orderNumber}". Please check the order number.` },
        { status: 404 }
      );
    }

    // Optional phone validation
    if (phone && phone.trim()) {
      const cleanInput = phone.trim().replace(/\D/g, "");
      const cleanOrderPhone = (order.phone || "").replace(/\D/g, "");
      if (cleanOrderPhone && !cleanOrderPhone.includes(cleanInput) && !cleanInput.includes(cleanOrderPhone)) {
        return NextResponse.json(
          { success: false, error: "The phone number does not match the record for this order number." },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (err) {
    console.error("Track order error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while tracking the order." },
      { status: 500 }
    );
  }
}
