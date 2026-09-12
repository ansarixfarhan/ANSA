"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  FiShield,
  FiLock,
  FiCheckCircle,
  FiUser,
  FiTruck,
  FiArrowLeft,
  FiAlertCircle,
  FiCreditCard,
  FiPackage,
} from "react-icons/fi";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { user, loading: authLoading, updateProfile } = useAuth();

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [saveAddress, setSaveAddress] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // default to COD for instant testing
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Pre-fill form if user is logged in
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        name: prev.name || user.name || "",
        phone: prev.phone || user.phone || "",
        email: prev.email || user.email || "",
        address: prev.address || user.address || "",
        city: prev.city || user.city || "",
        state: prev.state || user.state || "",
        pincode: prev.pincode || user.pincode || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    if (!orderPlaced && items.length === 0) {
      router.replace("/cart");
    }
  }, [items, orderPlaced, router]);

  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function validate() {
    if (!form.name.trim()) return "Please enter your full name";
    if (!form.phone.trim()) return "Please enter your phone number";
    if (form.phone.replace(/\D/g, "").length < 10) return "Please enter a valid 10-digit phone number";
    if (!form.email.trim() || !form.email.includes("@")) return "Please enter a valid email address";
    if (!form.address.trim()) return "Please enter your street address";
    if (!form.city.trim()) return "Please enter your city";
    if (!form.state.trim()) return "Please enter your state";
    if (!form.pincode.trim() || form.pincode.length < 6) return "Please enter a valid 6-digit pincode";
    return null;
  }

  async function handlePlaceOrder() {
    setError("");
    const err = validate();
    if (err) {
      setError(err);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Optionally save address to user profile
    if (user && saveAddress) {
      updateProfile({
        name: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
      }).catch(() => {});
    }

    // ── 1. Cash on Delivery ──
    if (paymentMethod === "cod") {
      setLoading(true);
      try {
        const res = await fetch("/api/orders/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user?.id || null,
            customer: form,
            items,
            paymentMethod: "cod",
            paymentStatus: "pending",
            subtotal,
            shipping,
            total,
          }),
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.error);

        setOrderPlaced(true);
        clearCart();
        router.push(`/order-confirmed?id=${data.orderId}&order=${data.orderNumber}`);
      } catch (err) {
        setError(err.message || "Failed to place order.");
      } finally {
        setLoading(false);
      }
      return;
    }

    // ── 2. Online Payment (Razorpay) ──
    setLoading(true);
    try {
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_T9NqpUu3WGDbPH",
        amount: data.order.amount,
        currency: data.order.currency,
        name: "ANSA Designer Lounge",
        description: "Bespoke Couture Order",
        order_id: data.order.id,
        handler: async function (response) {
          try {
            const orderRes = await fetch("/api/orders/create", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: user?.id || null,
                customer: form,
                items,
                paymentMethod: "online",
                paymentStatus: "paid",
                subtotal,
                shipping,
                total,
                razorpay: {
                  order_id: response.razorpay_order_id,
                  payment_id: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                },
              }),
            });

            const orderData = await orderRes.json();
            if (!orderData.success) throw new Error(orderData.error);

            setOrderPlaced(true);
            clearCart();
            router.push(`/order-confirmed?id=${orderData.orderId}&order=${orderData.orderNumber}`);
          } catch (paymentErr) {
            setError(paymentErr.message || "Payment completed but order registration failed. Please contact us.");
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#9a4b00",
        },
      };

      if (typeof window !== "undefined" && window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        throw new Error("Payment gateway is loading. Please try again in a moment.");
      }
    } catch (err) {
      setError(err.message || "Payment initialization failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#faf6f1] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-[var(--secondary)] transition"
          >
            <FiArrowLeft size={14} /> Back to Shopping Bag
          </Link>
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <FiLock size={13} className="text-emerald-600" /> 256-Bit SSL Encrypted Checkout
          </div>
        </div>

        {/* Auth prompt banner */}
        {!authLoading && (
          <div className="mb-8 p-4 rounded-2xl bg-white border border-amber-100 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-50 text-[var(--secondary)] flex items-center justify-center font-bold text-xs">
                  {user.name ? user.name[0].toUpperCase() : "U"}
                </div>
                <div>
                  <p className="text-xs text-gray-400">Authenticated Checkout</p>
                  <p className="text-sm font-semibold text-gray-900">
                    Logged in as {user.name} ({user.email})
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-50 text-[var(--secondary)] flex items-center justify-center">
                  <FiUser size={15} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Have an ANSA account?
                  </p>
                  <p className="text-xs text-gray-500">
                    Sign in to use your saved addresses and track orders in your dashboard.
                  </p>
                </div>
              </div>
            )}

            {!user && (
              <Link
                href="/login?redirect=/checkout"
                className="px-4 py-2 rounded-xl bg-amber-50 text-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white border border-amber-200 text-xs font-semibold transition"
              >
                Sign In to Lounge
              </Link>
            )}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2.5">
            <FiAlertCircle size={18} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Form & Payment (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Delivery Address Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-100">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                <div>
                  <h2
                    className="text-xl font-semibold text-gray-900"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    1. Shipping & Customer Details
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Where should we deliver your bespoke order?
                  </p>
                </div>
                <FiTruck size={20} className="text-amber-700" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold tracking-wider text-gray-700 uppercase mb-1.5">
                    Full Name *
                  </label>
                  <input
                    name="name"
                    placeholder="e.g. Farhan Ali"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[var(--secondary)] focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wider text-gray-700 uppercase mb-1.5">
                    Contact Phone *
                  </label>
                  <input
                    name="phone"
                    placeholder="10-digit mobile"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[var(--secondary)] focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wider text-gray-700 uppercase mb-1.5">
                    Email Address *
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="order-receipt@domain.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[var(--secondary)] focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold tracking-wider text-gray-700 uppercase mb-1.5">
                    Street Address / House No. *
                  </label>
                  <textarea
                    rows="3"
                    name="address"
                    placeholder="Apartment, suite, unit, building, floor, street name"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[var(--secondary)] focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wider text-gray-700 uppercase mb-1.5">
                    City *
                  </label>
                  <input
                    name="city"
                    placeholder="e.g. Ajmer"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[var(--secondary)] focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wider text-gray-700 uppercase mb-1.5">
                    State *
                  </label>
                  <input
                    name="state"
                    placeholder="e.g. Rajasthan"
                    value={form.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[var(--secondary)] focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold tracking-wider text-gray-700 uppercase mb-1.5">
                    Postal Code (Pincode) *
                  </label>
                  <input
                    name="pincode"
                    placeholder="e.g. 305001"
                    value={form.pincode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[var(--secondary)] focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {user && (
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="saveAddress"
                    checked={saveAddress}
                    onChange={(e) => setSaveAddress(e.target.checked)}
                    className="rounded text-[var(--secondary)] focus:ring-amber-500 cursor-pointer"
                  />
                  <label htmlFor="saveAddress" className="text-xs text-gray-600 cursor-pointer">
                    Save this address to my ANSA account profile
                  </label>
                </div>
              )}
            </div>

            {/* Payment Options Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-100">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                <div>
                  <h2
                    className="text-xl font-semibold text-gray-900"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    2. Payment Method
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Choose how you'd like to complete your purchase
                  </p>
                </div>
                <FiCreditCard size={20} className="text-amber-700" />
              </div>

              <div className="space-y-3">
                <label
                  className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition cursor-pointer ${
                    paymentMethod === "cod"
                      ? "border-[var(--secondary)] bg-amber-50/40"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mt-1 text-[var(--secondary)] focus:ring-amber-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-gray-900">
                        Cash on Delivery (COD)
                      </p>
                      <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Pay easily in cash or via UPI upon delivery at your doorstep
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition cursor-pointer ${
                    paymentMethod === "online"
                      ? "border-[var(--secondary)] bg-amber-50/40"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                    className="mt-1 text-[var(--secondary)] focus:ring-amber-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-gray-900">
                        Pay Online (Razorpay)
                      </p>
                      <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        Instant
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards & Net Banking
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-100 sticky top-24">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
                <h2
                  className="text-xl font-semibold text-gray-900"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Order Summary
                </h2>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-[var(--secondary)]">
                  {items.reduce((s, i) => s + (i.qty || 1), 0)} items
                </span>
              </div>

              {/* Items List */}
              <div className="max-h-64 overflow-y-auto divide-y divide-gray-100 pr-1 mb-5">
                {items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-3 first:pt-0">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || item.images?.[0] || "/title_logo.png"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {item.size ? `Size ${item.size} · ` : ""}Qty: {item.qty}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-gray-900">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="space-y-2.5 pt-4 border-t border-gray-100 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-medium text-gray-900">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Express Delivery</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase text-xs">FREE</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-baseline pt-4 border-t border-gray-100 text-base">
                  <span className="font-bold text-gray-900">Total Payable</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                    <p className="text-[11px] text-gray-400 font-normal">Inclusive of all luxury taxes</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full mt-6 py-4 rounded-2xl bg-[var(--secondary)] text-white font-semibold text-sm hover:bg-[#9a4b00] transition shadow-lg shadow-amber-900/10 disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Securing Your Order...
                  </>
                ) : (
                  <>
                    {paymentMethod === "cod" ? "Confirm Cash on Delivery Order" : "Proceed to Razorpay Payment"}
                  </>
                )}
              </button>

              <div className="mt-4 text-center">
                <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
                  <FiShield size={12} className="text-emerald-600" /> Guaranteed Authentic ANSA Designer Lounge Garments
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}