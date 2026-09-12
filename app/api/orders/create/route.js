import { NextResponse } from "next/server";
import { createOrder as createDbOrder } from "../../../../lib/db";
import { getCurrentUser } from "../../../../lib/auth";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { checkRateLimit, getClientIp } from "../../../../lib/rateLimit";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const ip = getClientIp(req);
    const limit = checkRateLimit(`order:${ip}`, 10, 10 * 60 * 1000); // 10 orders per 10 mins

    if (!limit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Order rate limit reached. Please wait ${Math.ceil(limit.retryAfter / 60)} minutes before placing another order.`,
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    const {
      customer,
      items,
      paymentMethod = "cod",
      paymentStatus = "pending",
      subtotal,
      shipping,
      total,
      razorpay,
      userId: passedUserId,
    } = body;

    if (!customer || !items?.length) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid order data. Please check items and customer information.",
        },
        { status: 400 }
      );
    }

    // Determine user ID if authenticated
    let userId = passedUserId || null;
    if (!userId) {
      const currentUser = await getCurrentUser(req);
      if (currentUser) {
        userId = currentUser.id;
      }
    }

    // 1. Create order in persistent DB
    const order = createDbOrder({
      userId,
      customer,
      items,
      paymentMethod,
      paymentStatus,
      subtotal,
      shipping,
      total,
      razorpay,
    });

    // 2. Dual-save to Supabase if reachable
    try {
      if (supabaseAdmin) {
        const { data: supaOrder } = await supabaseAdmin
          .from("orders")
          .insert({
            order_number: order.order_number,
            customer_name: customer.name,
            phone: customer.phone,
            email: customer.email,
            address: customer.address,
            city: customer.city,
            state: customer.state,
            pincode: customer.pincode,
            subtotal,
            shipping,
            total,
            payment_method: paymentMethod,
            payment_status: paymentStatus,
            razorpay_order_id: razorpay?.order_id || null,
            razorpay_payment_id: razorpay?.payment_id || null,
          })
          .select()
          .single();

        if (supaOrder?.id) {
          const orderItems = items.map((item) => ({
            order_id: supaOrder.id,
            product_id: item.id,
            variant_id: item.variantId || null,
            product_name: item.title,
            size: item.size || null,
            price: item.price,
            qty: item.qty || 1,
          }));
          await supabaseAdmin.from("order_items").insert(orderItems);
        }
      }
    } catch {
      // Supabase is optional/unreachable; ignore error and proceed with local order
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.order_number,
    });
  } catch (err) {
    console.error("Order creation error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "An unexpected error occurred while placing your order.",
      },
      { status: 500 }
    );
  }
}