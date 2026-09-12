"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  const { signup } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!form.phone.trim() || form.phone.length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!form.password || form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await signup({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      setSuccess(true);
      setTimeout(() => {
        router.push(redirect);
        router.refresh();
      }, 600);
    } catch (err) {
      setError(err.message || "Failed to create account.");
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
          Join the ANSA Family
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Create an account for personalized styling consultations and seamless orders
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
              <span>Account created! Redirecting to your lounge...</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold tracking-wider text-gray-700 uppercase mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <FiUser size={17} />
                </div>
                <input
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Farhan Ali"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[var(--secondary)] focus:ring-2 focus:ring-amber-500/20 focus:outline-none text-sm transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider text-gray-700 uppercase mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <FiMail size={17} />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="farhan@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[var(--secondary)] focus:ring-2 focus:ring-amber-500/20 focus:outline-none text-sm transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider text-gray-700 uppercase mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <FiPhone size={17} />
                </div>
                <input
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[var(--secondary)] focus:ring-2 focus:ring-amber-500/20 focus:outline-none text-sm transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider text-gray-700 uppercase mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <FiLock size={17} />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 focus:border-[var(--secondary)] focus:ring-2 focus:ring-amber-500/20 focus:outline-none text-sm transition"
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

            <div>
              <label className="block text-xs font-semibold tracking-wider text-gray-700 uppercase mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <FiLock size={17} />
                </div>
                <input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[var(--secondary)] focus:ring-2 focus:ring-amber-500/20 focus:outline-none text-sm transition"
                />
              </div>
            </div>

            <p className="text-xs text-gray-500 pt-1">
              By creating an account, you agree to ANSA's{" "}
              <Link href="/terms" className="text-[var(--secondary)] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[var(--secondary)] hover:underline">
                Privacy Policy
              </Link>.
            </p>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full mt-3 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[var(--secondary)] text-white font-medium text-sm hover:bg-[#9a4b00] transition shadow-md shadow-amber-900/10 disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Creating Account..." : (
                <>
                  Register Account <FiArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-100 pt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href={`/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
                className="font-semibold text-[var(--secondary)] hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
          ANSA Designer Lounge · Where Fabric Meets Elegance · Ajmer, Rajasthan
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf6f1] flex items-center justify-center">Loading...</div>}>
      <SignupForm />
    </Suspense>
  );
}
