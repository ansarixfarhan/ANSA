"use client";
import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";

const reviews = [
  {
    name: "Rafat Jamal",
    city: "Ajmer",
    rating: 5,
    text: "Very good experience at ANSA Designer Lounge. It's an amazing place for refined fabrics and bespoke menswear.",
    product: "Safari Blazer Collection",
    avatar: "RJ",
    color: "from-amber-700 to-amber-900",
    link: "https://maps.app.goo.gl/Las7yC4LUc6fDndU6",
  },
  {
    name: "Arsh Ali",
    city: "Jaipur",
    rating: 5,
    text: "ANSA's wedding sherwanis and blazers are truly magnificent. The fabrics feel luxurious and the tailoring is impeccable.",
    product: "Wedding Sherwani",
    avatar: "AA",
    color: "from-amber-600 to-amber-800",
    link: "https://maps.app.goo.gl/Las7yC4LUc6fDndU6",
  },
  {
    name: "Zoya Ansari",
    city: "Delhi",
    rating: 5,
    text: "Great quality fabrics with timeless designs, rich textures, and attentive service. Highly satisfied with ANSA.",
    product: "Velvet Blazer",
    avatar: "ZA",
    color: "from-amber-800 to-stone-900",
    link: "https://maps.app.goo.gl/Las7yC4LUc6fDndU6",
  },
  {
    name: "Aisha Syed",
    city: "Ajmer",
    rating: 5,
    text: "A destination for refined fabrics indeed! The craftsmanship and contemporary elegance at ANSA is unmatched.",
    product: "Bespoke Couture",
    avatar: "AS",
    color: "from-amber-700 to-yellow-800",
    link: "https://maps.app.goo.gl/Las7yC4LUc6fDndU6",
  },
  {
    name: "Faiz Ahmad",
    city: "Ajmer",
    rating: 5,
    text: "Visited ANSA Designer Lounge for wedding shopping. The collection of sherwanis and fabric cuts is spectacular.",
    product: "Heritage Sherwani",
    avatar: "FA",
    color: "from-amber-900 to-stone-900",
    link: "https://maps.app.goo.gl/Las7yC4LUc6fDndU6",
  },
  {
    name: "Saima Arfin",
    city: "Rajasthan",
    rating: 5,
    text: "Seeing the collection here truly made my heart happy. Perfect combination of quality and style. Everyone must visit the lounge!",
    product: "Signature Fabrics",
    avatar: "SA",
    color: "from-amber-600 to-amber-900",
    link: "https://maps.app.goo.gl/Las7yC4LUc6fDndU6",
  },
];

export default function ReviewSection() {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <>
      {/* ── Marquee strip ── */}
      <div className="bg-[#7a3b00] py-3.5 overflow-hidden">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 28s linear infinite" }}
        >
          {[...Array(4)].map((_, j) =>
            [
              "Refined Fabrics",
              "Bespoke Menswear",
              "Wedding Sherwanis",
              "Safari & Velvet Blazers",
              "ANSA Designer Lounge Ajmer",
              "Timeless Fashion",
            ].map((item, i) => (
              <span
                key={`${j}-${i}`}
                className="inline-flex items-center gap-3 text-xs sm:text-sm font-medium text-white tracking-wider px-8 font-serif"
              >
                <span style={{ color: "rgba(255,255,255,0.4)" }}>✦</span>
                {item}
              </span>
            )),
          )}
        </div>
      </div>

      {/* ── Reviews slider ── */}
      <section
        className="py-16 sm:py-24 overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, #fdfbf7 0%, #f5f3ef 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex items-end justify-between mb-10 sm:mb-12">
            <div>
              <p className="text-xs text-[#7a3b00] font-semibold tracking-widest uppercase mb-2 font-serif">
                Client Testimonials
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 font-serif"
              >
                Words From Our Patrons
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      size={13}
                      className="fill-amber-500 text-amber-500"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-800">5.0</span>
                <span className="text-sm text-gray-400 font-serif">Verified Client Reviews</span>
              </div>
            </div>

            {/* Desktop arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => sliderRef.current?.slickPrev()}
                className="w-10 h-10 rounded-full border border-[#7a3b00]/20 flex items-center justify-center text-gray-600 hover:border-[#7a3b00] hover:text-[#7a3b00] transition-all bg-white"
              >
                <FiChevronLeft size={17} />
              </button>
              <button
                onClick={() => sliderRef.current?.slickNext()}
                className="w-10 h-10 rounded-full border border-[#7a3b00]/20 flex items-center justify-center text-gray-600 hover:border-[#7a3b00] hover:text-[#7a3b00] transition-all bg-white"
              >
                <FiChevronRight size={17} />
              </button>
            </div>
          </div>

          {/* Slider */}
          <div className="overflow-hidden">
            <Slider ref={sliderRef} {...settings}>
              {reviews.map((review) => (
                <div key={review.name} className="px-2 sm:px-3">
                  <a
                    href={review.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#7a3b00]/10 shadow-sm hover:shadow-xl hover:border-[#7a3b00]/30 transition-all duration-300 group flex flex-col h-full w-full justify-between min-h-[260px]">
                      <div>
                        {/* Quote icon */}
                        <FaQuoteLeft
                          size={24}
                          className="text-[#7a3b00]/20 mb-4 group-hover:text-[#7a3b00]/40 transition-colors"
                        />

                        {/* Stars */}
                        <div className="flex gap-1 mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <FiStar
                              key={i}
                              size={12}
                              className="fill-amber-500 text-amber-500"
                            />
                          ))}
                        </div>

                        {/* Review text */}
                        <p className="text-gray-700 text-sm leading-relaxed mb-6 font-serif">
                          "{review.text}"
                        </p>
                      </div>

                      {/* Author */}
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-tr ${review.color} text-white flex items-center justify-center font-bold text-xs shadow-sm`}
                        >
                          {review.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm font-serif">
                            {review.name}
                          </p>
                          <p className="text-xs text-[#7a3b00] font-serif">
                            {review.product} • {review.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
}
