"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiInstagram, FiFacebook, FiMail, FiPhone, FiMapPin, FiHeart } from "react-icons/fi";

const supportLinks = [
  { label: "Track Order", href: "/track-order" },
  { label: "Exchange Policy", href: "/exchange" },
  { label: "Shipping Info", href: "/shipping" },
  // { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];
const companyLinks = [
  { label: "About Us", href: "/about" },
  // { label: "Our Story", href: "/about#story" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   fetch("/api/collections").then(r => r.json()).then(d => {
  //     if (d.success) setCategories(d.collections);
  //   }).catch(() => {});
  // }, []);

  const shopLinks = [
  { label: "All Products", href: "/shop" },
];

  return (
    <footer className="bg-[#111111] text-white">
      {/* Newsletter */}
      <div className="bg-[#3b1606] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200/80">Exclusive Updates</span>
            <h3
              className="text-2xl sm:text-3xl font-serif text-white mt-1"
            >
              Stay in Style
            </h3>
            <p className="text-white/70 text-sm mt-1 max-w-md font-serif">
              Be the first to discover new collections, limited releases, and exclusive refined fabrics.
            </p>
          </div>
          <div className="flex w-full max-w-md gap-0 bg-white overflow-hidden shadow-lg">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 min-w-0 px-4 sm:px-5 py-3.5 text-sm text-black placeholder:text-gray-400 focus:outline-none font-serif"
            />
            <button className="px-6 sm:px-8 py-3.5 bg-[#7a3b00] text-white text-base font-semibold hover:bg-[#9a4b00] transition-colors whitespace-nowrap flex-shrink-0">
              →
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center mb-4 group">
              <span
                className="font-charm text-3xl sm:text-4xl font-bold text-white tracking-wider"
                style={{ fontFamily: "'Charm', cursive" }}
              >
                ANSA
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 font-serif">
              ANSA Designer Lounge — Exclusive menswear atelier in Ajmer, specializing in royal wedding wear, party tuxedos, and bespoke office formalwear.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/ansadesigner.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @ansadesigner.in"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-amber-700/50 hover:bg-amber-950/40 transition-all"
              >
                <FiInstagram size={16} />
              </a>
              <a
                href="https://maps.app.goo.gl/Las7yC4LUc6fDndU6"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Location"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-amber-700/50 hover:bg-amber-950/40 transition-all"
              >
                <FiMapPin size={16} />
              </a>
              <a
                href="mailto:ansadesigner.in@gmail.com"
                aria-label="Email"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-amber-700/50 hover:bg-amber-950/40 transition-all"
              >
                <FiMail size={16} />
              </a>
              <a
                href="tel:+919610013835"
                aria-label="Call"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-amber-700/50 hover:bg-amber-950/40 transition-all"
              >
                <FiPhone size={16} />
              </a>
            </div>
          </div>

          {/* Collections & Shop */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-amber-200/80 mb-4 font-serif">
              Men's Collections
            </h4>
            <ul className="space-y-2.5 font-serif text-sm">
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-white transition-colors">
                  All Men's Collections
                </Link>
              </li>
              <li>
                <Link href="/collections/wedding-wear" className="text-gray-400 hover:text-white transition-colors">
                  Wedding & Shadi Wear
                </Link>
              </li>
              <li>
                <Link href="/collections/party-wear" className="text-gray-400 hover:text-white transition-colors">
                  Party & Cocktail Wear
                </Link>
              </li>
              <li>
                <Link href="/collections/office-formal" className="text-gray-400 hover:text-white transition-colors">
                  Formal & Office Wear
                </Link>
              </li>
              <li>
                <Link href="/collections/safari-blazers" className="text-gray-400 hover:text-white transition-colors">
                  Safari Blazers & Suits
                </Link>
              </li>
              <li>
                <Link href="/collections/bespoke-fabrics" className="text-gray-400 hover:text-white transition-colors">
                  Bespoke Suiting Fabrics
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-amber-200/80 mb-4 font-serif">
              Customer Care
            </h4>
            <ul className="space-y-2.5 font-serif text-sm">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Lounge Location */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-amber-200/80 mb-4 font-serif">
              ANSA Designer Lounge
            </h4>
            <div className="space-y-3 text-sm text-gray-400 font-serif">
              <a
                href="https://maps.app.goo.gl/Las7yC4LUc6fDndU6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-amber-200 transition-colors"
              >
                <FiMapPin size={16} className="text-[#b86b24] flex-shrink-0 mt-0.5" />
                <span>Railway Station, Police Chowki, Cinema Road, opp. Sardar Light, Dayanand Colony, Ajmer, Rajasthan 305001</span>
              </a>
              <a
                href="tel:+919610013835"
                className="flex items-center gap-2.5 hover:text-amber-200 transition-colors"
              >
                <FiPhone size={15} className="text-[#b86b24] flex-shrink-0" />
                <span>+91 96100 13835</span>
              </a>
              <a
                href="mailto:ansadesigner.in@gmail.com"
                className="flex items-center gap-2.5 hover:text-amber-200 transition-colors"
              >
                <FiMail size={15} className="text-[#b86b24] flex-shrink-0" />
                <span>ansadesigner.in@gmail.com</span>
              </a>
              <a
                href="https://instagram.com/ansadesigner.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-amber-200 transition-colors"
              >
                <FiInstagram size={15} className="text-[#b86b24] flex-shrink-0" />
                <span>@ansadesigner.in</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 font-serif">
          <p className="text-center sm:text-left">
            Copyright © {new Date().getFullYear()} ANSA Designer Lounge. All Rights Reserved.
          </p>
          <a
            href="https://smartxhacker.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-300 transition-colors text-center sm:text-right"
          >
            Developed by Farhan Ansari
          </a>
        </div>
      </div>
    </footer>
  );
}
