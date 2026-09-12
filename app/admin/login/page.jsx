"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiLock, FiUser, FiEye, FiEyeOff, FiArrowRight, FiShield } from "react-icons/fi";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Please enter your admin username and passkey.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Authentication failed. Please check credentials.");
      }

      // Success, route to dashboard
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#140f0c] via-[#0d0a08] to-black flex flex-col justify-center items-center px-4 py-12">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <span
              className="font-charm text-5xl sm:text-6xl font-bold text-amber-200 tracking-wider transition-transform group-hover:scale-105 block"
              style={{ fontFamily: "'Charm', cursive" }}
            >
              ANSA
            </span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/40 text-amber-300 text-[11px] font-serif uppercase tracking-widest mt-2">
            <FiShield size={12} /> Atelier Command Center
          </div>
          <h2 className="text-xl font-serif text-white/90 mt-3">Admin Portal Login</h2>
          <p className="text-xs text-stone-400 mt-1 font-serif">
            Manage customer orders, bespoke fulfillment & patron records
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#181310]/90 border border-amber-900/30 rounded-3xl p-7 sm:p-9 shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-red-800/50 text-red-200 text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-serif uppercase tracking-wider text-amber-200/80 mb-2">
                Admin Username or Email
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700/60" size={16} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@ansadesigner.cloud"
                  className="w-full bg-[#110e0b] border border-amber-900/40 rounded-xl pl-11 pr-4 py-3 text-sm text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-amber-600/80 transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif uppercase tracking-wider text-amber-200/80 mb-2">
                Admin Passkey
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700/60" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#110e0b] border border-amber-900/40 rounded-xl pl-11 pr-11 py-3 text-sm text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-amber-600/80 transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#7a3b00] to-[#b86b24] hover:from-[#9a4b00] hover:to-[#cf7e30] text-white text-xs font-serif uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50 transition cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <span>Enter Control Room</span>
                  <FiArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Security notice */}
          <div className="mt-6 pt-5 border-t border-amber-900/20 text-center">
            <p className="text-[11px] text-stone-400 font-serif">
              🔒 Authenticated session protected via encrypted server cookies.
            </p>
            <p className="text-[10px] text-stone-500 mt-1 font-mono">
              Credentials configured via environment variables.
            </p>
          </div>
        </div>

        {/* Store link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-stone-400 hover:text-amber-200 transition font-serif"
          >
            ← Back to ANSA Luxury Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
