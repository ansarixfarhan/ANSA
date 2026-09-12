import Link from "next/link";
import { FiArrowRight, FiHeart, FiStar, FiPackage, FiTruck, FiShield, FiMapPin, FiInstagram } from "react-icons/fi";
import { MdDiamond } from "react-icons/md";

export const metadata = {
  title: "About Us — ANSA | Where Fabric Meets Elegance",
  description:
    "Discover the story of ANSA Designer Lounge in Ajmer, Rajasthan — a destination for refined fabrics, bespoke menswear, wedding sherwanis, and timeless couture.",
  keywords: [
    "about ANSA",
    "ANSA Designer Lounge",
    "ANSA Ajmer",
    "luxury fabrics Ajmer",
    "bespoke menswear Rajasthan",
    "wedding sherwani designer",
    "safari blazer",
  ],
  openGraph: {
    title: "About Us — ANSA Designer Lounge",
    description:
      "At ANSA, we curate premium fabrics that blend craftsmanship with contemporary elegance.",
    url: "https://www.ansadesigner.cloud/about",
    type: "website",
    images: [{ url: "/ansa.png", width: 1200, height: 630, alt: "ANSA Designer Lounge" }],
  },
  alternates: { canonical: "https://www.ansadesigner.cloud/about" },
};

const values = [
  {
    icon: <MdDiamond size={22} className="text-[#7a3b00]" />,
    title: "Refined Fabrics",
    desc: "Every textile is hand-curated from master mills and artisanal looms. We select luxurious textures and statement materials that define modern sophistication.",
  },
  {
    icon: <FiHeart size={22} className="text-[#7a3b00]" />,
    title: "Artisanal Craftsmanship",
    desc: "From hand-tailored safari blazers to intricately detailed wedding sherwanis, each silhouette is crafted with absolute passion, care, and precision.",
  },
  {
    icon: <FiStar size={22} className="text-[#7a3b00]" />,
    title: "Bespoke Excellence",
    desc: "At our Ajmer Designer Lounge, we offer personalized styling and tailoring consultations to bring your bespoke sartorial visions to life.",
  },
  {
    icon: <FiShield size={22} className="text-[#7a3b00]" />,
    title: "Timeless Quality",
    desc: "Transparent standards and uncompromising quality. What you discover at ANSA is crafted to endure and elevate every occasion.",
  },
];

const milestones = [
  { year: "The Vision", title: "ANSA Lounge Founded", desc: "Established in Ajmer, Rajasthan, with a refined mission: to curate world-class fabrics and create modern luxury couture." },
  { year: "Signature Lines", title: "Blazers & Sherwanis", desc: "Launched our bespoke Safari Blazers, Wedding Sherwanis, and Velvet Evening Blazers, earning acclaim across the region." },
  { year: "Textile Curation", title: "Expanded Loom Network", desc: "Direct partnerships with master textile creators, expanding the collection of silk, velvet, and structured heritage fabrics." },
  { year: "Digital Presence", title: "Digital Flagship", desc: "Expanded the ANSA experience online, bringing refined fabrics and designer consultation to patrons across India." },
];

const team = [
  {
    name: "Master Design Atelier",
    role: "Creative Direction & Bespoke Tailoring",
    bio: "Leading ANSA Designer Lounge in crafting exclusive royal wedding sherwanis, party tuxedos, and bespoke office formalwear.",
  },
  {
    name: "Master Atelier Tailors",
    role: "Bespoke Cutters & Pattern Makers",
    bio: "Expert Rajasthani master tailors with decades of hand-embroidery, canvas construction, and precision fitting.",
  },
  {
    name: "Textile Sourcing Guild",
    role: "Curated Luxury Fabrics",
    bio: "Dedicated to curating the finest Italian Merino wools, raw silks, plush micro-velvets, and Belgian linens for modern gentlemen.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#f5f3ef] via-[#ede9e1] to-white border-b border-[#7a3b00]/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7a3b00]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-28 relative">
          <div className="max-w-3xl">
            <p className="text-xs text-[#7a3b00] font-semibold tracking-widest uppercase mb-3 font-serif">
              Our Story & Heritage
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-serif text-gray-900 leading-tight mb-5"
            >
              Where Fabric
              <span className="text-[#7a3b00] italic font-serif"> Meets Elegance</span>
            </h1>
            <p className="text-base sm:text-lg text-[#6b4c35] leading-relaxed mb-8 max-w-2xl font-serif">
              At ANSA Designer Lounge in Ajmer, we curate and tailor exclusive menswear. From royal wedding (shadi) sherwanis to party tuxedos and executive office formals, every silhouette is designed for men who demand uncompromising distinction.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#7a3b00] text-white rounded-full font-serif font-medium text-sm hover:bg-[#9a4b00] transition-all shadow-lg shadow-amber-950/20 hover:-translate-y-0.5"
              >
                Explore Collections <FiArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-gray-800 rounded-full font-serif font-medium text-sm border border-[#7a3b00]/20 hover:border-[#7a3b00] transition-all"
              >
                Visit Our Lounge
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { num: "100%", label: "Refined Fabrics" },
              { num: "Bespoke", label: "Tailoring Atelier" },
              { num: "5.0★", label: "Client Experience" },
              { num: "Ajmer", label: "Designer Lounge" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl sm:text-4xl font-bold text-[#7a3b00] font-serif">{s.num}</p>
                <p className="text-sm text-gray-600 mt-1 font-serif uppercase tracking-wider text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="text-xs text-[#7a3b00] font-semibold tracking-widest uppercase mb-3 font-serif">
              Our Craft & Mission
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 mb-6 leading-tight">
              A Destination for Refined Fabrics and Timeless Fashion
            </h2>
            <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed font-serif">
              <p>
                ANSA was born out of an appreciation for authentic materials and the transformative power of master tailoring. In an era of mass-produced fashion, we return to the core of sartorial distinction: exceptional textiles, thoughtful structure, and timeless silhouettes.
              </p>
              <p>
                Located in Ajmer, our Designer Lounge serves as a sanctuary for fabric enthusiasts, grooms, and connoisseurs of bespoke menswear. From regal Wedding Sherwanis to structured Safari Blazers and rich Velvet creations, each garment tells a story of dedicated artistry.
              </p>
              <p>
                Discover fabrics that inspire designers, empower creators, and transform ideas into timeless fashion.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-stone-100">
              <img
                src="/ansa.png"
                alt="ANSA Designer Lounge Storefront"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-5 border border-amber-900/10">
              <p className="text-xl font-bold text-[#7a3b00] font-serif">ANSA Designer Lounge</p>
              <p className="text-xs text-gray-500 mt-0.5 font-serif">Ajmer, Rajasthan, India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#f5f3ef] py-16 sm:py-24 border-y border-[#7a3b00]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs text-[#7a3b00] font-semibold tracking-widest uppercase mb-2 font-serif">What Sets Us Apart</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900">The Pillars of ANSA</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-7 border border-[#7a3b00]/10 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#7a3b00]/10 flex items-center justify-center mb-5">
                  {v.icon}
                </div>
                <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-serif">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-14">
          <p className="text-xs text-[#7a3b00] font-semibold tracking-widest uppercase mb-2 font-serif">The Evolution</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900">Our Journey of Excellence</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <span className="text-xs font-serif font-bold text-[#7a3b00] uppercase tracking-wider">{m.year}</span>
              <h3 className="text-lg font-serif font-semibold text-gray-900 mt-2 mb-2">{m.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-serif">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-16 sm:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs text-[#7a3b00] font-semibold tracking-widest uppercase mb-2 font-serif">Leadership & Craft</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900">The People Behind ANSA</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((t) => (
              <div key={t.name} className="p-7 rounded-2xl bg-[#fdfbf7] border border-[#7a3b00]/10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#7a3b00]/10 text-[#7a3b00] mx-auto flex items-center justify-center font-serif text-xl font-bold mb-4">
                  {t.name[0]}
                </div>
                <h3 className="text-xl font-serif font-semibold text-gray-900">{t.name}</h3>
                <p className="text-xs text-[#7a3b00] font-serif uppercase tracking-wider mt-1 mb-3">{t.role}</p>
                <p className="text-xs sm:text-sm text-gray-600 font-serif leading-relaxed mb-4">{t.bio}</p>
                {t.instagram && (
                  <a
                    href={t.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#7a3b00]/30 text-[#7a3b00] hover:bg-[#7a3b00] hover:text-white text-xs font-serif font-medium transition"
                  >
                    <FiInstagram size={13} /> {t.handle || "Instagram"}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Lounge Banner */}
      <section className="bg-[#3b1606] text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif mb-4">Experience the ANSA Designer Lounge</h2>
          <p className="text-white/70 font-serif max-w-xl mx-auto mb-8 text-sm sm:text-base">
            Visit our physical lounge in Ajmer to explore our collection of refined fabrics and consult with our master tailors.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://maps.app.goo.gl/Las7yC4LUc6fDndU6"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-[#7a3b00] hover:bg-[#9a4b00] text-white rounded-full font-serif text-sm transition-all shadow-lg flex items-center gap-2"
            >
              <FiMapPin size={15} /> Find Us in Ajmer
            </a>
            <a
              href="tel:+919610013835"
              className="px-8 py-3.5 border border-white/30 hover:bg-white hover:text-black text-white rounded-full font-serif text-sm transition-all"
            >
              Call +91 96100 13835
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
