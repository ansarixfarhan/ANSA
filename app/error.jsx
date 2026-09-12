"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiRefreshCw, FiHome } from "react-icons/fi";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] bg-[#faf6f1] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-100/60 text-[var(--secondary)] flex items-center justify-center mb-4 text-2xl">
        ⚠️
      </div>
      <h1
        className="text-3xl font-semibold text-gray-900 mb-2"
        style={{ fontFamily: "var(--font-cormorant), serif" }}
      >
        Something Went Wrong
      </h1>
      <p className="text-sm text-gray-500 max-w-md mb-6">
        An unexpected error occurred while preparing this view. Please try refreshing the page or return to the main lounge.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--secondary)] text-white text-xs font-semibold hover:bg-[#9a4b00] transition cursor-pointer"
        >
          <FiRefreshCw size={13} /> Try Again
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-xs font-medium hover:bg-gray-50 transition"
        >
          <FiHome size={13} /> Return Home
        </Link>
      </div>
    </div>
  );
}
