import FeaturedSlider from "./FeaturedSlider";
import { getFeaturedProducts } from "../../lib/products";

export default async function FeaturedProducts() {
  console.log("FeaturedProducts component running");

  const products = await getFeaturedProducts();

  console.log("Products:", products);

  return <FeaturedSlider products={products} />;
}