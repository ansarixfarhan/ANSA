"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowRight, FiChevronDown, FiInstagram } from "react-icons/fi";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToCollections = () => {
    const el = document.getElementById("collections");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-black flex items-center justify-center pt-16 md:pt-20"
      style={{ minHeight: "100svh" }}
    >
      {/* ── Background image with subtle ken burns zoom ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat sm:bg-fixed transform scale-105 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: "url('/hero.png')",
          filter: "brightness(0.68)",
        }}
      />

      {/* ── Layered cinematic overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-[#111111]/90" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        {/* Primary headline from ansadesigner.cloud */}
        <div className="space-y-1 sm:space-y-3">
          <h1
            className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[1.05] transition-all duration-1000 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.7)" }}
          >
            Where Fabric
          </h1>
          <h1
            className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[1.05] transition-all duration-1000 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.7)" }}
          >
            Meets Elegance
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className={`text-base sm:text-lg md:text-xl text-gray-200 mt-6 max-w-xl font-serif tracking-wide transition-all duration-1000 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Crafted with passion, heritage craftsmanship & precision tailoring
        </p>

        {/* Action buttons */}
        <div
          className={`mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 transition-all duration-1000 delay-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button
            onClick={scrollToCollections}
            className="group px-8 py-3.5 sm:px-10 sm:py-4 bg-[#7a3b00] text-white rounded-full font-serif font-medium tracking-widest uppercase text-xs sm:text-sm hover:bg-[#9a4b00] transition-all duration-300 shadow-xl shadow-amber-950/40 hover:-translate-y-0.5 flex items-center gap-2"
          >
            View Collections
            <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
          <Link
            href="/shop"
            className="px-8 py-3.5 sm:px-9 sm:py-4 border border-white/40 text-white rounded-full font-serif tracking-widest uppercase text-xs sm:text-sm backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300"
          >
            Explore Shop
          </Link>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div
        onClick={scrollToCollections}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 cursor-pointer text-white/50 hover:text-white transition-colors"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase font-serif">
          Scroll
        </span>
        <FiChevronDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}
