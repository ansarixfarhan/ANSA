import { getAllProducts, getAllCategories } from "../../lib/products";
import ShopClient from "./ShopClient";

export const revalidate = 3600;

export const metadata = {
  title: "Shop All Collections | ANSA",
  description:
    "Explore ANSA's curated collection of refined fabrics, safari blazers, wedding sherwanis, velvet blazers, and luxury menswear.",
};

export default async function ShopPage() {
  const [products, categoriesData] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  const collections = (categoriesData || []).map((c) => ({
    id: c.id,
    handle: c.slug,
    title: c.name,
    name: c.name,
  }));

  return (
    <ShopClient
      initialProducts={products}
      collections={collections}
    />
  );
}