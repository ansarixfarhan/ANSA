import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import CollectionGrid from "./CollectionGrid";
import {
  getProductsByCategory,
  getAllCategories,
} from "../../../lib/products";


async function getCollectionData(handle) {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getProductsByCategory(handle),
  ]);

  const category = categories.find((c) => c.slug === handle);

  if (!category) return null;

  return {
    collection: {
      id: category.id,
      title: category.name,
      slug: category.slug,
      description: "",
    },
    products,
  };
}

export async function generateMetadata({ params }) {
  const { handle } = await params;

  const data = await getCollectionData(handle);
  const title =
    data?.collection?.title ||
    handle
      .split("-")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");
  return {
    title: `${title} — ANSA`,
    description:
      data?.collection?.description || "Browse our curated collection at ANSA.",
  };
}

export default async function CollectionPage({ params, searchParams }) {
  const { handle } = await params;
  const { sort = "default" } = await searchParams;

  const data = await getCollectionData(handle);

  const products = data?.products || [];
  const col = data?.collection;
  products.sort((a, b) => {
  switch (sort) {
    case "price-asc":
      return a.price - b.price;

    case "price-desc":
      return b.price - a.price;

    case "name-asc":
      return a.title.localeCompare(b.title);

    default:
      return 0;
  }
});

  if (!col && products.length === 0) notFound();

  const info = {
    title:
      col?.title ||
      handle
        .split("-")
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" "),
    description: col?.description || "Explore our curated collection.",
  };

  const sortLinks = [
    { label: "Featured", value: "default" },
    { label: "Price: Low", value: "price-asc" },
    { label: "Price: High", value: "price-desc" },
    { label: "Newest", value: "newest" },
    { label: "Name: A–Z", value: "name-asc" },
  ];

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="bg-gradient-to-br from-[#fbf9f5] via-[#f7f3eb] to-white border-b border-[#7a3b00]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[var(--secondary)] transition-colors mb-4 font-serif"
          >
            <ArrowLeft size={13} /> All Men's Collections
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-[var(--secondary)] font-semibold tracking-widest uppercase font-serif">
              Men's Designer Collection
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight font-serif"
          >
            {info.title}
          </h1>
          {info.description && (
            <p className="text-gray-500 text-sm mt-2 max-w-lg leading-relaxed">
              {info.description}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-3 font-medium">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </div>
      </div>

      {/* Sort bar */}
      {products.length > 0 && (
        <div className="border-b border-gray-100 bg-white sticky top-[60px] z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <p className="text-xs text-gray-500 hidden sm:block">
              Showing {products.length} products
            </p>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {sortLinks.map((s) => (
                <Link
                  key={s.value}
                  href={`/collections/${handle}?sort=${s.value}`}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    sort === s.value
                      ? "bg-[var(--secondary)] text-white"
                      : "text-gray-500 bg-gray-50 hover:bg-red-50 hover:text-[var(--secondary)]"
                  }`}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {products.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">👕</div>
            <p className="text-gray-500 font-medium text-lg">
              No products in this collection yet
            </p>
            <p className="text-sm text-gray-400 mt-1 mb-6">
              Check back soon or browse all products
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--secondary)] text-white rounded-xl font-medium text-sm hover:bg-[#c03535] transition-colors cursor-pointer"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <>
            <CollectionGrid products={products} />
            <div className="text-center mt-12 pt-8 border-t border-gray-100">
              <p className="text-sm text-gray-400 mb-4">
                Looking for something specific?
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--secondary)] hover:underline underline-offset-4"
              >
                Browse all products →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
