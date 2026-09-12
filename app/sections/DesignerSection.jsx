"use client";

import Link from "next/link";
import { FiInstagram, FiPhone, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { MdDiamond } from "react-icons/md";

export default function DesignerSection() {
  return (
    <section className="bg-[#1a1410] text-white py-20 sm:py-28 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#9a4b00]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-amber-900/30">
              <img
                src="/hero.png"
                alt="Kaif Designer Atelier"
                className="w-full h-full object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-500/20">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-300">
                  Founder & Master Couturier
                </span>
                <h3 className="text-2xl font-serif text-white mt-0.5">Kaif Designer</h3>
                <a
                  href="https://instagram.com/kaif_designer888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 mt-2 font-medium"
                >
                  <FiInstagram size={13} /> @kaif_designer888
                </a>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-[#7a3b00] to-[#421c00] text-white p-4 rounded-2xl shadow-xl border border-amber-500/30 text-center">
              <span className="text-xs font-serif uppercase tracking-widest text-amber-200 block">Exclusively</span>
              <span className="text-xl font-bold font-serif">Men's Couture</span>
            </div>
          </div>

          {/* Right Column: Founder Story & 3 Pillars (7 cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-700/40 text-amber-300 text-xs font-serif tracking-widest uppercase mb-4">
              <MdDiamond size={13} /> The Creative Force Behind ANSA
            </div>

            <h2
              className="text-3xl sm:text-5xl font-serif text-white leading-tight mb-4"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Designs Created by <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
                Kaif Designer
              </span>
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-serif mb-8">
              At ANSA Designer Lounge in Ajmer, master couturier <strong>Kaif Designer</strong> creates and directs all bespoke menswear silhouettes. Specializing in high-craft garments engineered for three essential occasions:
            </p>

            {/* 3 Pillars Grid */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-white/5 border border-amber-900/30 backdrop-blur-sm">
                <span className="text-lg mb-1 block">👑</span>
                <h4 className="text-sm font-semibold text-amber-200 font-serif">Shadi & Wedding</h4>
                <p className="text-xs text-gray-400 mt-1 leading-snug">
                  Royal bridal sherwanis, Jodhpuri bandhgalas & groom couture with antique hand-zari work.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-amber-900/30 backdrop-blur-sm">
                <span className="text-lg mb-1 block">🍸</span>
                <h4 className="text-sm font-semibold text-amber-200 font-serif">Party & Evening</h4>
                <p className="text-xs text-gray-400 mt-1 leading-snug">
                  Micro-velvet tuxedos, silk brocade evening blazers & statement cocktail attire.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-amber-900/30 backdrop-blur-sm">
                <span className="text-lg mb-1 block">💼</span>
                <h4 className="text-sm font-semibold text-amber-200 font-serif">Office & Formals</h4>
                <p className="text-xs text-gray-400 mt-1 leading-snug">
                  Executive safari blazers, structured corporate two-piece suits & Italian linen tailoring.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#7a3b00] hover:bg-[#9a4b00] text-white text-xs font-serif font-medium tracking-wider uppercase transition shadow-lg"
              >
                Explore Kaif's Designs <FiArrowRight size={14} />
              </Link>

              <a
                href="https://instagram.com/kaif_designer888"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-serif tracking-wider uppercase transition"
              >
                <FiInstagram size={14} className="text-pink-400" /> @kaif_designer888
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
