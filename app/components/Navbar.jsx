"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  FiShoppingBag,
  FiSearch,
  FiMenu,
  FiX,
  FiChevronDown,
  FiHeart,
  FiTruck,
  FiPackage,
  FiArrowRight,
  FiUser,
  FiLogOut,
  FiInstagram,
} from "react-icons/fi";

const STATIC_BASE = [{ label: "Home", href: "/" }];
const STATIC_END = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ transparent = false }) {
  const { totalItems, toggleCart } = useCart();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistCount, setWishlistCount] = useState(0);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const searchRef = useRef(null);
  const accountRef = useRef(null);

  const syncWishlist = () => {
    try {
      const w = JSON.parse(localStorage.getItem("ansa_wishlist") || localStorage.getItem("stylecode_wishlist") || "[]");
      setWishlistCount(Array.isArray(w) ? w.length : 0);
    } catch {
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    setMounted(true);
    syncWishlist();

    const onScroll = () => setScrolled(window.scrollY > 60);
    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountDropdownOpen(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wishlist-updated", syncWishlist);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wishlist-updated", syncWishlist);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setAccountDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 100);
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Transparent mode: only show solid bg after scrolling
  const isTransparentMode =
    transparent && !scrolled && !mobileOpen && !searchOpen;

  const navBg = isTransparentMode
    ? "bg-transparent"
    : "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.06)]";

  const textColor = isTransparentMode ? "text-white/90" : "text-gray-700";
  const activeColor = isTransparentMode
    ? "text-white"
    : "text-[var(--secondary)]";
  const iconColor = isTransparentMode
    ? "text-white/80 hover:text-white hover:bg-white/10"
    : "text-gray-600 hover:text-[var(--secondary)] hover:bg-red-50";
  const badgeBg = isTransparentMode
    ? "bg-white text-[var(--secondary)]"
    : "bg-[var(--secondary)] text-white";

  const collectionChildren = [
    { label: "All Men's Collections", href: "/shop" },
    { label: "Wedding & Shadi Couture", href: "/collections/wedding-wear" },
    { label: "Party & Cocktail Wear", href: "/collections/party-wear" },
    { label: "Formal & Office Wear", href: "/collections/office-formal" },
    { label: "Safari Blazers & Suits", href: "/collections/safari-blazers" },
    { label: "Bespoke Suiting Fabrics", href: "/collections/bespoke-fabrics" },
  ];

  return (
    <>
      {/* Announcement bar — only shown when NOT in transparent mode */}
      {!isTransparentMode && (
        <div className="bg-[var(--secondary)] text-white text-center text-xs py-2 px-4 tracking-widest uppercase font-medium flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <span>ANSA Designer Lounge | Exclusive Refined Fabrics & Bespoke Tailoring</span>
          <span className="hidden sm:inline opacity-60">|</span>
          <span className="text-amber-200 font-medium">Ajmer Flagship Lounge</span>
        </div>
      )}

      {/* Navbar — fixed so it overlaps hero, sticky on other pages */}
      <header
        className={`${transparent ? "fixed" : "sticky"} top-0 left-0 right-0 z-[30] transition-all duration-500 ${navBg}`}
      >
        {/* ── Desktop ── */}
        <div className="hidden md:grid grid-cols-3 items-center max-w-7xl mx-auto px-4 sm:px-6 h-[68px]">
          {/* LEFT */}
          <nav className="flex items-center gap-6">
            {STATIC_BASE.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:transition-all ${
                  isActive(link.href)
                    ? `${activeColor} after:w-full after:bg-current`
                    : `${textColor} hover:${isTransparentMode ? "text-white" : "text-[var(--secondary)]"} after:w-0 hover:after:w-full after:bg-current`
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Collections dropdown */}
            <div className="relative group z-[9999]">
              <button
                className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${
                  pathname.startsWith("/collections") ||
                  pathname.startsWith("/shop")
                    ? activeColor
                    : textColor
                }`}
              >
                Collections{" "}
                <FiChevronDown
                  size={13}
                  className="transition-transform duration-200 group-hover:rotate-180"
                />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-[9999]">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 py-2 min-w-[210px] max-h-80 overflow-y-auto">
                  {collectionChildren.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`flex items-center justify-between px-5 py-2.5 text-sm transition-colors ${
                        isActive(child.href)
                          ? "text-[var(--secondary)] bg-amber-50/60 font-medium"
                          : "text-gray-600 hover:text-[var(--secondary)] hover:bg-amber-50/60"
                      }`}
                    >
                      {child.label}
                      {isActive(child.href) && <FiArrowRight size={12} />}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {STATIC_END.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href) ? activeColor : textColor
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CENTER — logo text */}
          <div className="flex justify-center items-center">
            <Link href="/" className="flex items-center justify-center group text-center select-none">
              <span
                className={`font-charm text-3xl sm:text-4xl font-bold transition-all duration-300 ${
                  isTransparentMode ? "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" : "text-[#7a3b00]"
                }`}
                style={{ fontFamily: "'Charm', cursive" }}
              >
                ANSA
              </span>
            </Link>
          </div>

          {/* RIGHT — icons */}
          <div className="flex items-center justify-end gap-1">
            {[
              {
                onClick: () => setSearchOpen(!searchOpen),
                icon: <FiSearch size={18} />,
              },
            ].map((btn, i) => (
              <button
                key={i}
                onClick={btn.onClick}
                className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${iconColor}`}
              >
                {btn.icon}
              </button>
            ))}

            <Link
              href="/track-order"
              className={`hidden lg:flex w-9 h-9 items-center justify-center rounded-xl transition-all ${iconColor}`}
              title="Track Order"
            >
              <FiPackage size={18} />
            </Link>

            <Link
              href="/wishlist"
              className={`relative w-9 h-9 flex items-center justify-center rounded-xl transition-all ${iconColor}`}
              title="Wishlist"
            >
              <FiHeart size={18} />
              {mounted && wishlistCount > 0 && (
                <span
                  className={`absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] text-[9px] font-bold rounded-full flex items-center justify-center px-1 leading-none ${isTransparentMode ? "bg-white text-[var(--secondary)]" : "bg-rose-500 text-white"}`}
                >
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* User Account Button & Dropdown */}
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className={`relative w-9 h-9 flex items-center justify-center rounded-xl transition-all cursor-pointer ${iconColor} ${
                  user ? "border border-amber-300/60 bg-amber-50/50" : ""
                }`}
                title={user ? user.name : "Account"}
              >
                {user ? (
                  <span className="text-xs font-bold text-[var(--secondary)]">
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </span>
                ) : (
                  <FiUser size={18} />
                )}
              </button>

              {accountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[9999] animate-in fade-in slide-in-from-top-2 duration-200">
                  {user ? (
                    <>
                      <div className="px-4 py-2.5 border-b border-gray-100">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Signed in as</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/account"
                          onClick={() => setAccountDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-amber-50/60 hover:text-[var(--secondary)] transition"
                        >
                          <FiUser size={14} /> My Profile & Address
                        </Link>
                        <Link
                          href="/account/orders"
                          onClick={() => setAccountDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-amber-50/60 hover:text-[var(--secondary)] transition"
                        >
                          <FiPackage size={14} /> My Orders
                        </Link>
                        <Link
                          href="/wishlist"
                          onClick={() => setAccountDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-amber-50/60 hover:text-[var(--secondary)] transition"
                        >
                          <FiHeart size={14} /> Saved Wishlist
                        </Link>
                      </div>
                      <div className="border-t border-gray-100 pt-1">
                        <button
                          onClick={() => {
                            setAccountDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        >
                          <FiLogOut size={14} /> Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-3">
                      <p className="text-xs text-gray-600 mb-3 px-1">
                        Sign in to access your orders, bespoke fittings, and wishlist.
                      </p>
                      <Link
                        href="/login"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[var(--secondary)] text-white text-xs font-semibold hover:bg-[#9a4b00] transition"
                      >
                        Sign In to Lounge
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="w-full mt-2 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-gray-200 text-gray-700 text-xs font-medium hover:bg-gray-50 transition"
                      >
                        Create an Account
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={toggleCart}
              className={`relative w-9 h-9 flex items-center justify-center rounded-xl transition-all ${iconColor}`}
              title="Cart"
            >
              <FiShoppingBag size={18} />
              {mounted && totalItems > 0 && (
                <span
                  className={`absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] text-[9px] font-bold rounded-full flex items-center justify-center px-1 leading-none ${isTransparentMode ? "bg-white text-[var(--secondary)]" : "bg-[var(--secondary)] text-white"}`}
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile ── */}
        <div className="md:hidden flex items-center justify-between max-w-7xl mx-auto px-4 h-14 z-10">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${iconColor}`}
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center select-none">
            <span
              className={`font-charm text-2xl sm:text-3xl font-bold ${
                isTransparentMode ? "text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]" : "text-[#7a3b00]"
              }`}
              style={{ fontFamily: "'Charm', cursive" }}
            >
              ANSA
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${iconColor}`}
              title="Search"
            >
              <FiSearch size={18} />
            </button>
            <Link
              href={user ? "/account" : "/login"}
              className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${iconColor}`}
              title={user ? user.name : "Account"}
            >
              {user ? (
                <span className="text-xs font-bold text-[var(--secondary)] w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                  {user.name ? user.name[0].toUpperCase() : "U"}
                </span>
              ) : (
                <FiUser size={18} />
              )}
            </Link>
            <button
              onClick={toggleCart}
              className={`relative w-9 h-9 flex items-center justify-center rounded-xl transition-all ${iconColor}`}
              title="Cart"
            >
              <FiShoppingBag size={18} />
              {mounted && totalItems > 0 && (
                <span
                  className={`absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] text-[9px] font-bold rounded-full flex items-center justify-center px-1 leading-none ${isTransparentMode ? "bg-white text-[var(--secondary)]" : "bg-[var(--secondary)] text-white"}`}
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div
          className={`overflow-hidden transition-all duration-300 border-t ${searchOpen ? "max-h-16 border-gray-100" : "max-h-0 border-transparent"} ${isTransparentMode ? "border-white/20" : "border-gray-100"}`}
        >
          <div
            className={`max-w-7xl mx-auto px-4 sm:px-6 py-3 ${isTransparentMode ? "bg-black/30 backdrop-blur-md" : "bg-white"}`}
          >
            <div className="relative max-w-xl">
              <FiSearch
                size={15}
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${isTransparentMode ? "text-white/50" : "text-gray-400"}`}
              />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search luxury fabrics, blazers, sherwanis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim())
                    window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`;
                  if (e.key === "Escape") setSearchOpen(false);
                }}
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-sm focus:outline-none transition-all ${
                  isTransparentMode
                    ? "bg-white/15 border border-white/25 text-white placeholder-white/40 focus:bg-white/25"
                    : "bg-gray-50 border border-gray-200 focus:border-[var(--secondary)] focus:bg-white"
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${isTransparentMode ? "text-white/50" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <FiX size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[999] md:hidden transition-all duration-300 ${mobileOpen ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 bottom-0 w-[300px] max-w-[85vw] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center">
              <span
                className="font-charm text-2xl font-bold text-[#7a3b00]"
                style={{ fontFamily: "'Charm', cursive" }}
              >
                ANSA
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500"
            >
              <FiX size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-3 px-3">
            <Link
              href="/"
              className={`flex items-center px-3 py-3.5 text-sm font-semibold rounded-xl transition-colors ${pathname === "/" ? "text-[var(--secondary)] bg-red-50" : "text-gray-800 hover:bg-gray-50"}`}
            >
              Home
            </Link>
            <div>
              <button
                onClick={() => setCollectionsOpen(!collectionsOpen)}
                className="w-full flex items-center justify-between px-3 py-3.5 text-sm font-semibold text-gray-800 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Collections{" "}
                <FiChevronDown
                  size={15}
                  className={`text-gray-400 transition-transform duration-200 ${collectionsOpen ? "rotate-180" : ""}`}
                />
              </button>
              {collectionsOpen && (
                <div className="ml-3 mb-1 border-l-2 border-red-100 pl-3 space-y-0.5">
                  {collectionChildren.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`flex items-center px-3 py-2.5 text-sm rounded-lg transition-colors ${isActive(child.href) ? "text-[var(--secondary)] bg-red-50 font-medium" : "text-gray-600 hover:text-[var(--secondary)] hover:bg-red-50"}`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {STATIC_END.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-3 py-3.5 text-sm font-semibold rounded-xl transition-colors ${isActive(link.href) ? "text-[var(--secondary)] bg-red-50" : "text-gray-800 hover:bg-gray-50"}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="my-3 border-t border-gray-100" />

            {/* Mobile User Profile Section */}
            {user ? (
              <div className="mb-3 p-3 rounded-2xl bg-amber-50/60 border border-amber-200/60">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[var(--secondary)] text-white font-bold text-xs flex items-center justify-center">
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-gray-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-1 pt-1 border-t border-amber-200/40">
                  <Link
                    href="/account"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 py-1.5 text-xs font-medium text-gray-700 hover:text-[var(--secondary)]"
                  >
                    <FiUser size={13} /> My Profile & Address
                  </Link>
                  <Link
                    href="/account/orders"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 py-1.5 text-xs font-medium text-gray-700 hover:text-[var(--secondary)]"
                  >
                    <FiPackage size={13} /> My Orders
                  </Link>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-2 py-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 cursor-pointer"
                  >
                    <FiLogOut size={13} /> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-3 p-3 rounded-2xl bg-gray-50 border border-gray-200/60">
                <p className="text-xs text-gray-600 mb-2">Lounge Member Access</p>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="py-2 text-center text-xs font-semibold rounded-xl bg-[var(--secondary)] text-white hover:bg-[#9a4b00] transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="py-2 text-center text-xs font-medium rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}

            {[
              {
                icon: FiHeart,
                label: "Wishlist",
                href: "/wishlist",
                badge: wishlistCount,
              },
              {
                icon: FiPackage,
                label: "Track Order",
                href: "/track-order",
                badge: 0,
              },
            ].map(({ icon: Icon, label, href, badge }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between px-3 py-3 text-sm text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center">
                    <Icon size={15} className="text-gray-500" />
                  </div>
                  {label}
                </div>
                {badge > 0 && (
                  <span className="min-w-[20px] h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1.5">
                    {badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="px-4 pb-6 pt-3 border-t border-gray-100 space-y-2.5">
            <Link
              href="/shop"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-[var(--secondary)] text-white rounded-2xl font-semibold text-sm hover:bg-[#9a4b00] transition-all"
            >
              <FiShoppingBag size={15} /> Explore Collection
            </Link>
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
              <FiTruck size={11} className="text-amber-600" />Men's Couture: Shadi · Party · Office
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
