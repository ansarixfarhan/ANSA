export const metadata = {
  title: "ANSA Admin Atelier | Store & Orders Management",
  description: "Executive control room for ANSA Designer Lounge store orders, patrons, and fulfillment.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0f0c0a] text-[#f5f3ef] font-sans selection:bg-amber-600 selection:text-white">
      {children}
    </div>
  );
}
