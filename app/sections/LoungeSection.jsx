import Link from "next/link";
import { FiMapPin, FiMail, FiPhone, FiExternalLink, FiInstagram } from "react-icons/fi";

export default function LoungeSection() {
  return (
    <section id="lounge" className="bg-[#f5f3ef] border-t border-[#7a3b00]/10 scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Showcase Image with 'Let's Connect' */}
        <div className="relative h-[55vh] md:h-[70vh] lg:h-[80vh] overflow-hidden group">
          <picture>
            <source srcSet="/ansa.webp" type="image/webp" />
            <img
              src="/ansa.png"
              alt="ANSA Designer Lounge"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </picture>
          <div className="absolute inset-0 bg-black/35 transition-opacity group-hover:bg-black/25" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 md:p-16">
            <span className="text-amber-200/90 text-xs font-serif uppercase tracking-[0.3em] mb-2">
              ANSA Designer Lounge
            </span>
            <h2 className="text-[36px] sm:text-[48px] md:text-[60px] 2xl:text-[72px] font-serif text-white tracking-tight leading-none">
              Let’s Connect
            </h2>
          </div>
        </div>

        {/* Right: Contact Information directly from ansadesigner.cloud */}
        <div className="flex items-center px-8 sm:px-12 md:px-16 py-16 sm:py-20 md:py-24">
          <div className="space-y-12 sm:space-y-14 w-full">
            {/* Visit */}
            <div className="flex items-start gap-6 sm:gap-8">
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#7a3b00] min-w-[100px] sm:min-w-[120px]">
                Visit:
              </h3>
              <div className="text-[#6b4c35] space-y-1.5 text-base sm:text-lg font-serif">
                <a
                  href="https://maps.app.goo.gl/Las7yC4LUc6fDndU6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group hover:text-[#7a3b00] transition-colors block"
                >
                  <p className="leading-snug">
                    Railway Station, Police Chowki, Cinema Road, opp. Sardar Light, Dayanand Colony
                  </p>
                  <p className="mt-1 font-medium">Ajmer, Rajasthan 305001, India</p>
                  <span className="inline-flex items-center gap-1 text-xs text-[#7a3b00] underline mt-1">
                    Open in Google Maps <FiExternalLink size={11} />
                  </span>
                </a>
              </div>
            </div>

            {/* Write */}
            <div className="flex items-start gap-6 sm:gap-8">
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#7a3b00] min-w-[100px] sm:min-w-[120px]">
                Write:
              </h3>
              <div className="text-[#6b4c35] space-y-1 text-base sm:text-lg font-serif">
                <a
                  href="mailto:ansadesigner.in@gmail.com"
                  className="hover:text-[#7a3b00] underline underline-offset-4 transition-colors"
                >
                  ansadesigner.in@gmail.com
                </a>
                <p className="text-xs text-[#6b4c35]/80 font-sans mt-1">
                  For appointments, bespoke enquiries & bridal consultations
                </p>
              </div>
            </div>

            {/* Call */}
            <div className="flex items-start gap-6 sm:gap-8">
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#7a3b00] min-w-[100px] sm:min-w-[120px]">
                Call:
              </h3>
              <div className="text-[#6b4c35] space-y-1 text-base sm:text-lg font-serif">
                <a
                  href="tel:+919610013835"
                  className="hover:text-[#7a3b00] font-medium transition-colors"
                >
                  +91 96100 13835
                </a>
                <p className="text-xs text-[#6b4c35]/80 font-sans mt-1">
                  Available Mon–Sat: 10:30 AM – 8:30 PM IST
                </p>
              </div>
            </div>

            {/* Follow */}
            <div className="flex items-start gap-6 sm:gap-8">
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#7a3b00] min-w-[100px] sm:min-w-[120px]">
                Follow:
              </h3>
              <div className="text-[#6b4c35] space-y-1 text-base sm:text-lg font-serif">
                <a
                  href="https://instagram.com/ansadesigner.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#7a3b00] font-medium transition-colors inline-flex items-center gap-2"
                >
                  <FiInstagram size={18} className="text-[#7a3b00]" />
                  @ansadesigner.in
                  <FiExternalLink size={12} className="opacity-70" />
                </a>
                <p className="text-xs text-[#6b4c35]/80 font-sans mt-1">
                  Follow us for new luxury drops, showroom fittings & reels
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
