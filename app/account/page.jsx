"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiPackage,
  FiHeart,
  FiLogOut,
  FiCheckCircle,
  FiSave,
  FiShield,
  FiTruck,
} from "react-icons/fi";

export default function AccountPage() {
  const router = useRouter();
  const { user, loading, logout, updateProfile } = useAuth();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?redirect=/account");
    } else if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pincode: user.pincode || "",
      });
    }
  }, [user, loading, router]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await updateProfile(form);
      setSuccessMsg("Your profile and shipping details have been saved.");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setErrorMsg(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
    router.refresh();
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#faf6f1] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[var(--secondary)] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500 font-medium">Loading your luxury profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf6f1] py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[var(--secondary)] to-[#5a2a00] text-white flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-md">
              {user.name ? user.name[0].toUpperCase() : "A"}
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--secondary)] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                Lounge Member
              </span>
              <h1
                className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                {user.name}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-2 mt-0.5">
                <FiMail size={13} /> {user.email} {user.phone && `· ${user.phone}`}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:border-rose-300 hover:bg-rose-50 text-gray-600 hover:text-rose-600 text-xs font-semibold transition cursor-pointer"
          >
            <FiLogOut size={14} /> Sign Out
          </button>
        </div>

        {/* Quick Nav Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Link
            href="/account/orders"
            className="bg-white p-5 rounded-2xl border border-amber-100/80 hover:border-[var(--secondary)] transition shadow-sm group flex flex-col items-center text-center"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-[var(--secondary)] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <FiPackage size={20} />
            </div>
            <span className="text-sm font-semibold text-gray-900">My Orders</span>
            <span className="text-xs text-gray-400 mt-0.5">View & Track</span>
          </Link>

          <Link
            href="/wishlist"
            className="bg-white p-5 rounded-2xl border border-amber-100/80 hover:border-[var(--secondary)] transition shadow-sm group flex flex-col items-center text-center"
          >
            <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <FiHeart size={20} />
            </div>
            <span className="text-sm font-semibold text-gray-900">Saved Wishlist</span>
            <span className="text-xs text-gray-400 mt-0.5">Favorite Pieces</span>
          </Link>

          <Link
            href="/track-order"
            className="bg-white p-5 rounded-2xl border border-amber-100/80 hover:border-[var(--secondary)] transition shadow-sm group flex flex-col items-center text-center"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <FiTruck size={20} />
            </div>
            <span className="text-sm font-semibold text-gray-900">Live Tracking</span>
            <span className="text-xs text-gray-400 mt-0.5">Express BlueDart</span>
          </Link>

          <Link
            href="/contact"
            className="bg-white p-5 rounded-2xl border border-amber-100/80 hover:border-[var(--secondary)] transition shadow-sm group flex flex-col items-center text-center"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <FiPhone size={20} />
            </div>
            <span className="text-sm font-semibold text-gray-900">Concierge</span>
            <span className="text-xs text-gray-400 mt-0.5">Ajmer Lounge</span>
          </Link>
        </div>

        {/* Profile & Default Address Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-amber-100">
          <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-6">
            <div>
              <h2
                className="text-xl sm:text-2xl font-semibold text-gray-900"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Personal Details & Shipping Address
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Saved information will automatically populate during checkout
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <FiShield size={14} /> Encrypted & Secure
            </div>
          </div>

          {successMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm flex items-center gap-2.5">
              <FiCheckCircle size={18} className="flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold tracking-wider text-gray-700 uppercase mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <FiUser size={16} />
                  </div>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[var(--secondary)] focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                    placeholder="Your Full Name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider text-gray-700 uppercase mb-2">
                  Contact Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <FiPhone size={16} />
                  </div>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[var(--secondary)] focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                    placeholder="10-digit mobile"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold tracking-wider text-gray-700 uppercase mb-2">
                  Default Delivery Street Address
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3.5 pointer-events-none text-gray-400">
                    <FiMapPin size={16} />
                  </div>
                  <textarea
                    rows="3"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[var(--secondary)] focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                    placeholder="House/Apartment number, street, landmark..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider text-gray-700 uppercase mb-2">
                  City
                </label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[var(--secondary)] focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                  placeholder="e.g. Ajmer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider text-gray-700 uppercase mb-2">
                  State
                </label>
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[var(--secondary)] focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                  placeholder="e.g. Rajasthan"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider text-gray-700 uppercase mb-2">
                  Pincode
                </label>
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[var(--secondary)] focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                  placeholder="e.g. 305001"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--secondary)] text-white font-medium text-sm hover:bg-[#9a4b00] transition shadow-md shadow-amber-900/10 disabled:opacity-60 cursor-pointer"
              >
                <FiSave size={16} />
                {saving ? "Saving Changes..." : "Save Preferences"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
