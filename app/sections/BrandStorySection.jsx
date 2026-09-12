import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function BrandStorySection() {
  return (
    <section className="bg-[#f5f3ef] text-black px-6 sm:px-12 md:px-16 py-20 sm:py-28 md:py-36">
      <div className="max-w-5xl mx-auto text-center">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-8 h-[1px] bg-[#7a3b00]" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.35em] uppercase text-[#7a3b00] font-serif">
            The ANSA Philosophy
          </span>
          <span className="w-8 h-[1px] bg-[#7a3b00]" />
        </div>

        {/* Heading */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] font-serif text-[#7a3b00] tracking-[-0.02em]"
        >
          A Destination for Refined Fabrics
          <br className="hidden sm:inline" />
          {" "}and Timeless Fashion
        </h2>

        {/* Story copy directly from ansadesigner.cloud */}
        <p
          className="mt-8 sm:mt-10 text-[15px] sm:text-[17px] md:text-[19px] text-[#6b4c35] leading-[1.85] max-w-3xl mx-auto font-serif"
        >
          At ANSA, we curate premium fabrics that blend craftsmanship with contemporary elegance. From luxurious textures to statement materials, every collection is selected for those who value quality, detail, and sophistication. Discover fabrics that inspire designers, empower creators, and transform ideas into timeless fashion.
        </p>

        {/* Brand values pills */}
        <div className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-serif text-xs sm:text-sm tracking-wider uppercase text-[#7a3b00]/90">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#7a3b00]/20 bg-white/60 shadow-sm">
            <span>✦</span>
            <span>Bespoke Tailoring</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#7a3b00]/20 bg-white/60 shadow-sm">
            <span>✦</span>
            <span>Handpicked Textiles</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#7a3b00]/20 bg-white/60 shadow-sm">
            <span>✦</span>
            <span>Ajmer Designer Lounge</span>
          </div>
        </div>
      </div>
    </section>
  );
}
