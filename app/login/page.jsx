"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      setSuccess(true);
      setTimeout(() => {
        router.push(redirect);
        router.refresh();
      }, 600);
    } catch (err) {
      setError(err.message || "Failed to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf6f1] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center justify-center group">
          <span
            className="font-charm text-4xl sm:text-5xl font-bold text-[#7a3b00] transition-transform group-hover:scale-105"
            style={{ fontFamily: "'Charm', cursive" }}
          >
            ANSA
          </span>
        </Link>
        <h1
          className="mt-4 text-3xl font-semibold text-gray-900"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          Welcome Back to Luxury
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Sign in to access your curated orders, bespoke fittings, and wishlist
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-xl shadow-amber-900/5 rounded-3xl border border-amber-100 sm:px-10">
          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2.5">
              <FiAlertCircle size={18} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm flex items-center gap-2.5">
              <FiCheckCircle size={18} className="flex-shrink-0" />
              <span>Login successful! Redirecting...</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold tracking-wider text-gray-700 uppercase mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <FiMail size={17} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@domain.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--secondary)] focus:ring-2 focus:ring-amber-500/20 focus:outline-none text-sm transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold tracking-wider text-gray-700 uppercase">
                  Password
                </label>
                <Link
                  href="/contact"
                  className="text-xs text-[var(--secondary)] hover:underline font-medium"
                >
                  Need help?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <FiLock size={17} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:border-[var(--secondary)] focus:ring-2 focus:ring-amber-500/20 focus:outline-none text-sm transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[var(--secondary)] text-white font-medium text-sm hover:bg-[#9a4b00] transition shadow-md shadow-amber-900/10 disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Signing in..." : (
                <>
                  Sign In to Lounge <FiArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 border-t border-gray-100 pt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account yet?{" "}
              <Link
                href={`/signup${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
                className="font-semibold text-[var(--secondary)] hover:underline"
              >
                Create an Account
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
          ANSA Designer Lounge · Railway Station Cinema Road, Ajmer · +91 96100 13835
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf6f1] flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
