import { notFound } from "next/navigation";
import ProductDetail from "./ProductDetail";
import { getProductWithRelated } from "../../../lib/products";


export async function generateMetadata({ params }) {
  const { handle } = await params; // FIX

  const data = await getProductWithRelated(handle);

  if (!data) {
    return {
      title: "Product Not Found — ANSA",
    };
  }

  const { product } = data;

  return {
    title: `${product.title} | ANSA`,
    description: product.description?.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description?.slice(0, 160),
      images: product.images?.[0]
        ? [{ url: product.images[0] }]
        : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const { handle } = await params; // FIX

  const data = await getProductWithRelated(handle);

  if (!data) notFound();

  return (
    <ProductDetail
      product={data.product}
      related={data.related}
    />
  );
}