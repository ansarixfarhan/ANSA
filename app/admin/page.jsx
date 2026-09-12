"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiPackage,
  FiUsers,
  FiDollarSign,
  FiCheckCircle,
  FiClock,
  FiTruck,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiLogOut,
  FiExternalLink,
  FiEye,
  FiX,
  FiEdit2,
  FiPhone,
  FiMail,
  FiMapPin,
  FiTrash2,
  FiShield,
  FiLayers,
} from "react-icons/fi";
import { MdDiamond } from "react-icons/md";

const STATUS_CONFIG = {
  processing: { label: "Processing", bg: "bg-amber-950/70", text: "text-amber-300", border: "border-amber-700/50" },
  confirmed: { label: "Confirmed", bg: "bg-sky-950/70", text: "text-sky-300", border: "border-sky-700/50" },
  shipped: { label: "Shipped", bg: "bg-purple-950/70", text: "text-purple-300", border: "border-purple-700/50" },
  delivered: { label: "Delivered", bg: "bg-emerald-950/70", text: "text-emerald-300", border: "border-emerald-700/50" },
  cancelled: { label: "Cancelled", bg: "bg-rose-950/70", text: "text-rose-300", border: "border-rose-700/50" },
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tabs: 'orders' | 'customers' | 'catalog'
  const [activeTab, setActiveTab] = useState("orders");

  // Stats & data
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  // Filter & Search
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal / Detail view
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingForm, setTrackingForm] = useState({ courier: "", tracking_id: "" });
  const [actionLoading, setActionLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // 1. Verify Admin Session on Mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/auth/me");
        const data = await res.json();
        if (!res.ok || !data.success) {
          router.replace("/admin/login");
          return;
        }
        setAdmin(data.admin);
        fetchDashboardData();
      } catch {
        router.replace("/admin/login");
      }
    };

    checkAuth();
  }, [router]);

  // 2. Fetch Dashboard Data
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, ordersRes, usersRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/orders"),
        fetch("/api/admin/users"),
      ]);

      const statsData = await statsRes.json();
      const ordersData = await ordersRes.json();
      const usersData = await usersRes.json();

      if (statsData.success) setStats(statsData.stats);
      if (ordersData.success) setOrders(ordersData.orders);
      if (usersData.success) setUsers(usersData.users);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.replace("/admin/login");
    } catch {
      router.replace("/admin/login");
    }
  };

  // 4. Update Order Status
  const handleUpdateStatus = async (orderId, newStatus) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Update failed");

      // Update local state
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
      }

      showToast(`Order updated to "${newStatus.toUpperCase()}"`);
      // Refresh stats
      const statsRes = await fetch("/api/admin/stats");
      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.stats);
    } catch (err) {
      alert("Error updating order: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // 5. Update Tracking Details
  const handleSaveTracking = async (e) => {
    e.preventDefault();
    if (!selectedOrder) return;

    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${selectedOrder.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courier: trackingForm.courier,
          tracking_id: trackingForm.tracking_id,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Update failed");

      setOrders((prev) =>
        prev.map((o) =>
          o.id === selectedOrder.id
            ? { ...o, courier: trackingForm.courier, tracking_id: trackingForm.tracking_id }
            : o
        )
      );
      setSelectedOrder((prev) => ({
        ...prev,
        courier: trackingForm.courier,
        tracking_id: trackingForm.tracking_id,
      }));

      showToast("Tracking information updated successfully");
    } catch (err) {
      alert("Error saving tracking: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // 6. Delete Order
  const handleDeleteOrder = async (orderId) => {
    if (!confirm("Are you sure you want to permanently delete this order record?")) return;

    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Delete failed");

      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      if (selectedOrder && selectedOrder.id === orderId) setSelectedOrder(null);

      showToast("Order removed from database");
      const statsRes = await fetch("/api/admin/stats");
      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.stats);
    } catch (err) {
      alert("Error deleting order: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus =
      statusFilter === "all" || o.status?.toLowerCase() === statusFilter.toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesStatus;

    const matchesQuery =
      o.order_number?.toLowerCase().includes(q) ||
      o.customer_name?.toLowerCase().includes(q) ||
      o.phone?.toLowerCase().includes(q) ||
      o.email?.toLowerCase().includes(q) ||
      o.tracking_id?.toLowerCase().includes(q) ||
      o.city?.toLowerCase().includes(q);

    return matchesStatus && matchesQuery;
  });

  // Open modal handler
  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setTrackingForm({
      courier: order.courier || "BlueDart Express",
      tracking_id: order.tracking_id || "",
    });
  };

  if (loading && !admin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0e0b09] text-amber-200">
        <FiRefreshCw className="animate-spin text-amber-500 mb-3" size={32} />
        <p className="font-serif text-sm tracking-widest uppercase">Opening ANSA Atelier...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0b09] text-stone-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-amber-500 text-black px-5 py-3 rounded-2xl shadow-2xl font-serif text-xs font-bold tracking-wide flex items-center gap-2 animate-bounce">
          <FiCheckCircle size={16} /> {toastMessage}
        </div>
      )}

      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-40 bg-[#16110e]/95 backdrop-blur-md border-b border-amber-900/30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className="font-charm text-3xl font-bold text-amber-200"
              style={{ fontFamily: "'Charm', cursive" }}
            >
              ANSA
            </span>
            <span className="text-[10px] font-serif uppercase tracking-[0.25em] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/40">
              Admin Atelier
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-serif text-stone-300 transition border border-white/10"
            title="Open live website in new tab"
          >
            Live Store <FiExternalLink size={12} />
          </Link>

          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 transition border border-white/10"
            title="Refresh dashboard"
          >
            <FiRefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>

          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-amber-900/30">
            <div className="w-7 h-7 rounded-full bg-amber-900/40 text-amber-300 flex items-center justify-center font-serif text-xs font-bold border border-amber-600/30">
              {admin?.name?.[0] || "A"}
            </div>
            <span className="text-xs font-serif text-stone-300">{admin?.name || "Admin"}</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/40 border border-red-800/30 text-red-300 text-xs font-serif transition"
          >
            <FiLogOut size={13} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* ── Main Container ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ── Stats Metric Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Revenue */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#16110e] border border-amber-900/30 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-serif uppercase tracking-widest text-amber-300/80">
                Gross Revenue
              </span>
              <div className="p-2 rounded-xl bg-amber-950/60 text-amber-400 border border-amber-800/30">
                <FiDollarSign size={16} />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              ₹{stats?.totalRevenue?.toLocaleString("en-IN") || "0"}
            </h3>
            <p className="text-[11px] text-stone-400 mt-1 font-serif">
              {stats?.paymentStats?.paid || 0} orders settled
            </p>
          </div>

          {/* Total Orders */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#16110e] border border-amber-900/30 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-serif uppercase tracking-widest text-stone-400">
                Total Orders
              </span>
              <div className="p-2 rounded-xl bg-white/5 text-stone-300 border border-white/10">
                <FiPackage size={16} />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {stats?.totalOrders || orders.length}
            </h3>
            <p className="text-[11px] text-stone-400 mt-1 font-serif">
              {stats?.statusCounts?.delivered || 0} fulfilled & delivered
            </p>
          </div>

          {/* Processing / In Progress */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#16110e] border border-amber-900/30 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-serif uppercase tracking-widest text-amber-400/90">
                Pending Action
              </span>
              <div className="p-2 rounded-xl bg-amber-950/60 text-amber-300 border border-amber-800/40">
                <FiClock size={16} />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-300">
              {(stats?.statusCounts?.processing || 0) + (stats?.statusCounts?.confirmed || 0)}
            </h3>
            <p className="text-[11px] text-amber-200/60 mt-1 font-serif">
              {stats?.statusCounts?.processing || 0} processing · {stats?.statusCounts?.shipped || 0} in transit
            </p>
          </div>

          {/* Patrons / Users */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#16110e] border border-amber-900/30 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-serif uppercase tracking-widest text-stone-400">
                Registered Patrons
              </span>
              <div className="p-2 rounded-xl bg-white/5 text-stone-300 border border-white/10">
                <FiUsers size={16} />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {stats?.totalCustomers || users.length}
            </h3>
            <p className="text-[11px] text-stone-400 mt-1 font-serif">
              Exclusive lounge accounts
            </p>
          </div>
        </div>

        {/* ── Navigation Tabs ── */}
        <div className="flex items-center gap-2 border-b border-amber-900/30 pb-4 overflow-x-auto">
          {[
            { id: "orders", label: "Orders & Fulfillment", icon: <FiPackage size={15} />, count: orders.length },
            { id: "customers", label: "Patrons Directory", icon: <FiUsers size={15} />, count: users.length },
            { id: "catalog", label: "Product Catalog", icon: <MdDiamond size={15} />, count: 6 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-serif tracking-wider uppercase transition cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-amber-600/20 text-amber-200 border border-amber-500/50 shadow-md"
                  : "text-stone-400 hover:text-stone-200 hover:bg-white/5 border border-transparent"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/40 text-stone-300">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ══════════════ TAB 1: ORDERS ══════════════ */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {/* Filter Bar & Search */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" size={16} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by order #, patron name, phone, city..."
                  className="w-full bg-[#16110e] border border-amber-900/40 rounded-2xl pl-11 pr-4 py-2.5 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-amber-600/70 transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                  >
                    <FiX size={14} />
                  </button>
                )}
              </div>

              {/* Status Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {["all", "processing", "confirmed", "shipped", "delivered", "cancelled"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-serif uppercase tracking-wider transition whitespace-nowrap cursor-pointer ${
                      statusFilter === st
                        ? "bg-amber-500 text-black font-semibold shadow"
                        : "bg-[#16110e] border border-amber-900/30 text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    {st === "all" ? "All Statuses" : STATUS_CONFIG[st]?.label || st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-[#16110e]/70 border border-amber-900/20">
                <FiPackage size={36} className="mx-auto text-amber-700/60 mb-3" />
                <h4 className="text-lg font-serif text-stone-300">No matching orders found</h4>
                <p className="text-xs text-stone-500 mt-1 font-serif">
                  {searchQuery || statusFilter !== "all"
                    ? "Try clearing filters to see all orders"
                    : "No client orders have been placed yet."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-3xl border border-amber-900/30 bg-[#16110e] shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1e1713] text-stone-400 font-serif uppercase tracking-wider text-[10px] border-b border-amber-900/30">
                    <tr>
                      <th className="py-4 px-5">Order #</th>
                      <th className="py-4 px-5">Date</th>
                      <th className="py-4 px-5">Patron</th>
                      <th className="py-4 px-5">Items</th>
                      <th className="py-4 px-5">Amount</th>
                      <th className="py-4 px-5">Payment</th>
                      <th className="py-4 px-5">Status</th>
                      <th className="py-4 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-900/15">
                    {filteredOrders.map((order) => {
                      const cfg = STATUS_CONFIG[order.status?.toLowerCase()] || STATUS_CONFIG.processing;
                      return (
                        <tr
                          key={order.id}
                          className="hover:bg-amber-950/15 transition-colors group cursor-pointer"
                          onClick={() => openOrderDetails(order)}
                        >
                          <td className="py-4 px-5 font-mono font-semibold text-amber-200">
                            {order.order_number || order.id}
                          </td>
                          <td className="py-4 px-5 text-stone-400 font-serif">
                            {order.created_at
                              ? new Date(order.created_at).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })
                              : "—"}
                          </td>
                          <td className="py-4 px-5">
                            <div className="font-serif font-medium text-white">
                              {order.customer_name || "Guest Patron"}
                            </div>
                            <div className="text-[11px] text-stone-500 font-mono">
                              {order.phone || order.email || "No contact"}
                            </div>
                          </td>
                          <td className="py-4 px-5 text-stone-300 font-serif">
                            {order.items?.length || 1} product(s)
                          </td>
                          <td className="py-4 px-5 font-serif font-semibold text-white">
                            ₹{Number(order.total || 0).toLocaleString("en-IN")}
                          </td>
                          <td className="py-4 px-5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-stone-300">
                                {order.payment_method?.toUpperCase() || "COD"}
                              </span>
                              {order.payment_status === "paid" && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
                                  PAID
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-5" onClick={(e) => e.stopPropagation()}>
                            {/* Fast status selector */}
                            <select
                              value={order.status?.toLowerCase() || "processing"}
                              onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                              disabled={actionLoading}
                              className={`text-[11px] font-serif font-medium px-2.5 py-1.5 rounded-xl border ${cfg.border} ${cfg.bg} ${cfg.text} focus:outline-none cursor-pointer`}
                            >
                              <option value="processing" className="bg-[#16110e] text-amber-300">Processing</option>
                              <option value="confirmed" className="bg-[#16110e] text-sky-300">Confirmed</option>
                              <option value="shipped" className="bg-[#16110e] text-purple-300">Shipped</option>
                              <option value="delivered" className="bg-[#16110e] text-emerald-300">Delivered</option>
                              <option value="cancelled" className="bg-[#16110e] text-rose-300">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-4 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="inline-flex items-center gap-2">
                              <button
                                onClick={() => openOrderDetails(order)}
                                className="p-2 rounded-xl bg-white/5 hover:bg-amber-600/20 hover:text-amber-200 text-stone-400 transition"
                                title="View Full Order Details"
                              >
                                <FiEye size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteOrder(order.id)}
                                className="p-2 rounded-xl bg-white/5 hover:bg-rose-950/60 hover:text-rose-300 text-stone-500 transition"
                                title="Delete Order"
                              >
                                <FiTrash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ══════════════ TAB 2: CUSTOMERS ══════════════ */}
        {activeTab === "customers" && (
          <div className="space-y-6">
            <div className="overflow-x-auto rounded-3xl border border-amber-900/30 bg-[#16110e] shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1e1713] text-stone-400 font-serif uppercase tracking-wider text-[10px] border-b border-amber-900/30">
                  <tr>
                    <th className="py-4 px-5">Patron Name</th>
                    <th className="py-4 px-5">Email</th>
                    <th className="py-4 px-5">Phone</th>
                    <th className="py-4 px-5">Location</th>
                    <th className="py-4 px-5">Orders Placed</th>
                    <th className="py-4 px-5">Total Spend</th>
                    <th className="py-4 px-5">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-900/15 font-serif">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-stone-500">
                        No registered customers yet.
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u.id} className="hover:bg-amber-950/15 transition-colors">
                        <td className="py-4 px-5 font-medium text-white flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-amber-900/30 border border-amber-700/40 text-amber-300 flex items-center justify-center text-[11px] font-bold">
                            {u.name?.[0]?.toUpperCase() || "U"}
                          </div>
                          <span>{u.name}</span>
                        </td>
                        <td className="py-4 px-5 text-stone-300">{u.email}</td>
                        <td className="py-4 px-5 text-stone-400 font-mono">{u.phone || "—"}</td>
                        <td className="py-4 px-5 text-stone-400">
                          {u.city ? `${u.city}, ${u.state || ""}` : "—"}
                        </td>
                        <td className="py-4 px-5 font-semibold text-amber-300">
                          {u.ordersCount || 0} order(s)
                        </td>
                        <td className="py-4 px-5 text-white font-semibold">
                          ₹{Number(u.totalSpent || 0).toLocaleString("en-IN")}
                        </td>
                        <td className="py-4 px-5 text-stone-500 text-[11px]">
                          {u.createdAt
                            ? new Date(u.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "—"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══════════════ TAB 3: CATALOG ══════════════ */}
        {activeTab === "catalog" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: "royal-bridal-sherwani-gold-zari",
                  title: "Royal Bridal Sherwani in Antique Gold Zari",
                  category: "Wedding & Shadi Wear",
                  price: 28999,
                  img: "/wedding-sherwani.png",
                },
                {
                  id: "executive-safari-blazer-sand",
                  title: "Executive Safari Blazer in Structured Sand Linen",
                  category: "Formal & Office Wear",
                  price: 12999,
                  img: "/safari-blazer.png",
                },
                {
                  id: "midnight-velvet-smoking-tuxedo",
                  title: "Midnight Velvet Smoking Tuxedo with Silk Lapels",
                  category: "Party & Cocktail Wear",
                  price: 18499,
                  img: "/velvet.png",
                },
                {
                  id: "heritage-jodhpuri-bandhgala-jet-black",
                  title: "Heritage Jodhpuri Bandhgala in Jet Black Suiting",
                  category: "Wedding & Shadi Wear",
                  price: 21999,
                  img: "/hero.png",
                },
                {
                  id: "italian-linen-two-piece-business-suit",
                  title: "Italian Linen Two-Piece Executive Business Suit",
                  category: "Formal & Office Wear",
                  price: 16999,
                  img: "/safari-blazer.png",
                },
                {
                  id: "silk-brocade-cocktail-jacket-wine",
                  title: "Silk Brocade Cocktail Jacket in Deep Wine",
                  category: "Party & Cocktail Wear",
                  price: 14999,
                  img: "/velvet.png",
                },
              ].map((prod) => (
                <div
                  key={prod.id}
                  className="rounded-3xl bg-[#16110e] border border-amber-900/30 overflow-hidden shadow-xl flex flex-col"
                >
                  <div className="relative aspect-[4/3] bg-black">
                    <img
                      src={prod.img}
                      alt={prod.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 right-3 text-[10px] font-serif uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 border border-amber-800/40">
                      In Stock
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-serif uppercase tracking-widest text-[#b86b24]">
                        {prod.category}
                      </span>
                      <h4 className="font-serif text-white font-medium text-sm sm:text-base mt-1 line-clamp-2">
                        {prod.title}
                      </h4>
                    </div>
                    <div className="mt-4 pt-3 border-t border-amber-900/20 flex items-center justify-between">
                      <span className="text-base font-serif font-bold text-amber-200">
                        ₹{prod.price.toLocaleString("en-IN")}
                      </span>
                      <Link
                        href={`/products/${prod.id}`}
                        target="_blank"
                        className="text-xs text-stone-400 hover:text-amber-300 flex items-center gap-1 font-serif"
                      >
                        View Product <FiExternalLink size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ══════════════ ORDER DETAIL MODAL ══════════════ */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#16110e] border border-amber-900/40 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-amber-900/20 pb-4">
              <div>
                <span className="text-[10px] font-serif uppercase tracking-widest text-amber-400/90">
                  Client Order Details
                </span>
                <h3 className="text-2xl font-serif text-white mt-0.5">
                  Order #{selectedOrder.order_number || selectedOrder.id}
                </h3>
                <p className="text-xs text-stone-400 font-serif mt-0.5">
                  Placed on{" "}
                  {selectedOrder.created_at
                    ? new Date(selectedOrder.created_at).toLocaleString("en-IN")
                    : "—"}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white flex items-center justify-center"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Quick Status Control Banner */}
            <div className="p-4 rounded-2xl bg-[#1d1612] border border-amber-900/30 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-serif uppercase tracking-wider text-stone-400 block">
                  Current Status
                </span>
                <span
                  className={`inline-block mt-1 px-3 py-1 rounded-xl text-xs font-serif font-bold uppercase tracking-wider ${
                    STATUS_CONFIG[selectedOrder.status?.toLowerCase()]?.bg || "bg-amber-950/70"
                  } ${
                    STATUS_CONFIG[selectedOrder.status?.toLowerCase()]?.text || "text-amber-300"
                  }`}
                >
                  {selectedOrder.status || "Processing"}
                </span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {["confirmed", "shipped", "delivered"].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedOrder.id, st)}
                    disabled={actionLoading}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-amber-600 hover:text-white text-xs font-serif uppercase tracking-wider transition cursor-pointer"
                  >
                    Mark {STATUS_CONFIG[st]?.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer & Delivery Address */}
            <div className="grid sm:grid-cols-2 gap-4 text-xs font-serif">
              <div className="p-4 rounded-2xl bg-[#110e0b] border border-amber-900/20 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                  Patron Information
                </span>
                <p className="font-semibold text-white text-sm">
                  {selectedOrder.customer_name || "Guest Patron"}
                </p>
                <p className="text-stone-300 flex items-center gap-1.5">
                  <FiPhone size={12} className="text-amber-500" /> {selectedOrder.phone || "—"}
                </p>
                <p className="text-stone-300 flex items-center gap-1.5">
                  <FiMail size={12} className="text-amber-500" /> {selectedOrder.email || "—"}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#110e0b] border border-amber-900/20 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                  Delivery Address
                </span>
                <p className="text-stone-200 leading-relaxed">
                  {selectedOrder.address || "No street address recorded"}
                </p>
                <p className="text-stone-400">
                  {[selectedOrder.city, selectedOrder.state, selectedOrder.pincode]
                    .filter(Boolean)
                    .join(", ") || "India"}
                </p>
              </div>
            </div>

            {/* Tracking Editor Form */}
            <form onSubmit={handleSaveTracking} className="p-4 rounded-2xl bg-[#110e0b] border border-amber-900/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5 font-serif">
                  <FiTruck size={14} /> Dispatch & Courier Tracking
                </span>
                <Link
                  href={`/track-order?order=${encodeURIComponent(selectedOrder.order_number || selectedOrder.id)}`}
                  target="_blank"
                  className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-serif"
                >
                  Live Patron Tracking <FiExternalLink size={11} />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1 font-serif">
                    Courier Partner
                  </label>
                  <input
                    type="text"
                    value={trackingForm.courier}
                    onChange={(e) => setTrackingForm({ ...trackingForm, courier: e.target.value })}
                    placeholder="BlueDart / Delhivery / DTDC"
                    className="w-full bg-[#181310] border border-amber-900/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1 font-serif">
                    AWB Tracking Number
                  </label>
                  <input
                    type="text"
                    value={trackingForm.tracking_id}
                    onChange={(e) => setTrackingForm({ ...trackingForm, tracking_id: e.target.value })}
                    placeholder="e.g. AWB98412984"
                    className="w-full bg-[#181310] border border-amber-900/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={actionLoading}
                className="w-full py-2.5 rounded-xl bg-amber-700/60 hover:bg-amber-600 text-white text-xs font-serif uppercase tracking-wider font-semibold transition cursor-pointer"
              >
                Save Tracking Information
              </button>
            </form>

            {/* Ordered Items List */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-serif">
                Garments Ordered ({selectedOrder.items?.length || 1})
              </span>

              <div className="divide-y divide-amber-900/20 rounded-2xl bg-[#110e0b] border border-amber-900/20 p-2">
                {selectedOrder.items?.map((item, i) => (
                  <div key={i} className="p-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 rounded-lg bg-black overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || "/title_logo.png"}
                          alt={item.title || item.product_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h5 className="font-serif text-sm text-white font-medium">
                          {item.title || item.product_name}
                        </h5>
                        <p className="text-[11px] text-stone-400 font-serif mt-0.5">
                          Size: {item.size || "Standard"} · Qty: {item.qty || 1}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-serif font-bold text-white text-sm">
                        ₹{((item.price || 0) * (item.qty || 1)).toLocaleString("en-IN")}
                      </p>
                      <p className="text-[10px] text-stone-500 font-serif">
                        ₹{Number(item.price || 0).toLocaleString("en-IN")} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-4 rounded-2xl bg-[#110e0b] border border-amber-900/20 flex items-center justify-between font-serif text-sm">
              <span className="text-stone-400 uppercase tracking-widest text-xs">Total Order Value</span>
              <span className="text-xl font-bold text-amber-200">
                ₹{Number(selectedOrder.total || 0).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
