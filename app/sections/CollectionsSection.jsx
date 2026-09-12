"use client";
import { FiShield, FiTruck, FiRefreshCw } from "react-icons/fi";
import { MdDiamond } from "react-icons/md";

const FEATURES = [
  {
    icon: <MdDiamond size={20} className="text-[#7a3b00]" />,
    title: "Refined Fabrics",
    desc: "Curated textures & premium materials",
  },
  {
    icon: <FiTruck size={20} className="text-[#7a3b00]" />,
    title: "Pan-India Delivery",
    desc: "Free shipping on orders above ₹999",
  },
  {
    icon: <FiRefreshCw size={20} className="text-[#7a3b00]" />,
    title: "Custom Tailoring",
    desc: "Bespoke sizing & crafted precision",
  },
  {
    icon: <FiShield size={20} className="text-[#7a3b00]" />,
    title: "Authentic Quality",
    desc: "Hand-tested textiles & craftsmanship",
  },
];

export default function CollectionsSection() {
  return (
    <section id="features" className="bg-[#f5f3ef] py-12 sm:py-16 border-y border-[#7a3b00]/10">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 md:px-12">
        {/* ── Feature Strip ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <div key={i} className="flex items-start gap-3.5 sm:gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-[#7a3b00]/10">
              <div className="p-2.5 rounded-lg bg-[#7a3b00]/10 flex-shrink-0">
                {f.icon}
              </div>
              <div>
                <h4 className="font-serif text-[#7a3b00] text-sm sm:text-base font-semibold">
                  {f.title}
                </h4>
                <p className="text-xs text-[#6b4c35] mt-0.5 leading-relaxed font-serif">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}