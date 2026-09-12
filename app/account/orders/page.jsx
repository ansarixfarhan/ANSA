"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import {
  FiPackage,
  FiArrowLeft,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiShoppingBag,
  FiChevronRight,
  FiCalendar,
  FiCreditCard,
  FiMapPin,
} from "react-icons/fi";

const STATUS_BADGES = {
  processing: { label: "Processing", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: FiClock },
  confirmed:  { label: "Confirmed", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: FiCheckCircle },
  shipped:    { label: "Shipped", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", icon: FiTruck },
  delivered:  { label: "Delivered", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: FiCheckCircle },
  cancelled:  { label: "Cancelled", bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", icon: FiAlertCircle },
};

export default function UserOrdersPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?redirect=/account/orders");
      return;
    }

    if (user) {
      fetch("/api/orders/user")
        .then((r) => r.json())
        .then((data) => {
          if (data.success && data.orders) {
            setOrders(data.orders);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#faf6f1] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[var(--secondary)] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500 font-medium">Fetching your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf6f1] py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link
              href="/account"
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[var(--secondary)] transition mb-2"
            >
              <FiArrowLeft size={13} /> Back to Lounge Account
            </Link>
            <h1
              className="text-2xl sm:text-3xl font-semibold text-gray-900"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              My Luxury Orders
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Review history, tracking, and itemized receipts
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--secondary)] text-white text-xs font-semibold hover:bg-[#9a4b00] transition"
          >
            <FiShoppingBag size={14} /> Shop Collection
          </Link>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-amber-100">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[var(--secondary)] flex items-center justify-center mx-auto mb-4 text-2xl">
              <FiPackage size={28} />
            </div>
            <h2
              className="text-2xl font-semibold text-gray-900 mb-2"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              No Orders Found Yet
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
              You haven't placed any orders yet. Discover our latest collection of wedding sherwanis, safari blazers, and luxury fabrics.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--secondary)] text-white text-sm font-semibold hover:bg-[#9a4b00] transition"
            >
              Explore Collections <FiChevronRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusCfg = STATUS_BADGES[order.status] || STATUS_BADGES.processing;
              const StatusIcon = statusCfg.icon;
              const formattedDate = new Date(order.created_at).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-100/90 transition hover:shadow-md"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-gray-100">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-base font-bold text-gray-900">
                          {order.order_number}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border}`}
                        >
                          <StatusIcon size={12} /> {statusCfg.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 flex items-center gap-1.5">
                        <FiCalendar size={13} /> Ordered on {formattedDate}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/track-order?order=${order.order_number}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 text-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white border border-amber-200 text-xs font-semibold transition"
                      >
                        <FiTruck size={13} /> Track Courier
                      </Link>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="py-5 divide-y divide-gray-100">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            <img
                              src={item.image || "/title_logo.png"}
                              alt={item.title || item.product_name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {item.title || item.product_name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.size ? `Size: ${item.size} · ` : ""}Qty: {item.qty}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">
                            ₹{(item.price * item.qty).toLocaleString("en-IN")}
                          </p>
                          <p className="text-xs text-gray-400">
                            ₹{item.price.toLocaleString("en-IN")} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <FiCreditCard size={14} className="text-gray-400" />
                        Method: {order.payment_method === "online" ? "Paid Online (Razorpay)" : "Cash on Delivery (COD)"}
                      </span>
                      {order.city && (
                        <span className="flex items-center gap-1.5">
                          <FiMapPin size={14} className="text-gray-400" />
                          Ship to: {order.city}, {order.state}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-500">Total Amount:</span>
                      <span className="text-lg font-bold text-gray-900">
                        ₹{Number(order.total).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
