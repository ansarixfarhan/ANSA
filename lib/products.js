import { supabase } from "./supabase";
import { CATEGORIES, PRODUCTS } from "./catalog";

const PRODUCT_SELECT = `
  *,
  categories(name,slug),
  product_images(image_url,sort_order),
  product_variants(id,size,price,stock)
`;

function normalizeProduct(product) {
  return {
    id: product.id,
    title: product.name || product.title,
    slug: product.slug,
    description: product.description,
    price: Number(product.price),
    compareAtPrice: product.compare_at_price || product.compareAtPrice,
    category: product.categories?.name || product.category || "",
    productType: product.categories?.name || product.productType || "",
    collections: product.categories
      ? [product.categories.slug]
      : product.collections || [],
    isFeatured: Boolean(product.featured || product.isFeatured),
    images:
      product.product_images?.map((img) => img.image_url) ||
      product.images ||
      [],
    variants:
      product.product_variants?.map((variant) => ({
        id: variant.id,
        size: variant.size,
        price: Number(variant.price ?? product.price),
        stock: variant.stock,
        available: variant.stock > 0,
      })) ||
      product.variants ||
      [],
    fabric: product.fabric || "Premium Bespoke Blend",
    care: product.care || "Dry Clean Only",
    tags: product.tags || [],
  };
}

function isSupabaseConfigured() {
  if (!supabase) return false;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || url.includes("hoxuxcbmonryrymxgyza") || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return false;
  }
  return true;
}

export async function getFeaturedProducts() {
  if (!isSupabaseConfigured()) {
    return PRODUCTS.filter((p) => p.isFeatured).map(normalizeProduct);
  }
  try {
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("featured", true)
      .eq("active", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return PRODUCTS.filter((p) => p.isFeatured).map(normalizeProduct);
    }
    return data.map(normalizeProduct);
  } catch {
    return PRODUCTS.filter((p) => p.isFeatured).map(normalizeProduct);
  }
}

export async function getAllProducts() {
  if (!isSupabaseConfigured()) {
    return PRODUCTS.map(normalizeProduct);
  }
  try {
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("active", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return PRODUCTS.map(normalizeProduct);
    }
    return data.map(normalizeProduct);
  } catch {
    return PRODUCTS.map(normalizeProduct);
  }
}

export async function getProductBySlug(slug) {
  if (!isSupabaseConfigured()) {
    const match = PRODUCTS.find((p) => p.slug === slug);
    return match ? normalizeProduct(match) : null;
  }
  try {
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("slug", slug)
      .eq("active", true)
      .single();

    if (error || !data) {
      const match = PRODUCTS.find((p) => p.slug === slug);
      return match ? normalizeProduct(match) : null;
    }
    return normalizeProduct(data);
  } catch {
    const match = PRODUCTS.find((p) => p.slug === slug);
    return match ? normalizeProduct(match) : null;
  }
}

export async function getProductsByCategory(categorySlug) {
  if (!isSupabaseConfigured()) {
    const filtered = PRODUCTS.filter(
      (p) =>
        p.collections?.includes(categorySlug) ||
        p.category?.toLowerCase().includes(categorySlug.replace("-", " "))
    );
    return (filtered.length > 0 ? filtered : PRODUCTS).map(normalizeProduct);
  }
  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        categories!inner(name,slug),
        product_images(image_url,sort_order),
        product_variants(id,size,price,stock)
      `)
      .eq("categories.slug", categorySlug)
      .eq("active", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      const filtered = PRODUCTS.filter(
        (p) =>
          p.collections?.includes(categorySlug) ||
          p.category?.toLowerCase().includes(categorySlug.replace("-", " "))
      );
      return (filtered.length > 0 ? filtered : PRODUCTS).map(normalizeProduct);
    }
    return data.map(normalizeProduct);
  } catch {
    const filtered = PRODUCTS.filter(
      (p) =>
        p.collections?.includes(categorySlug) ||
        p.category?.toLowerCase().includes(categorySlug.replace("-", " "))
    );
    return (filtered.length > 0 ? filtered : PRODUCTS).map(normalizeProduct);
  }
}

export async function getRelatedProducts(categoryId, currentProductId) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("category_id", categoryId)
      .neq("id", currentProductId)
      .eq("active", true)
      .limit(8);

    if (error || !data || data.length === 0) {
      return PRODUCTS.filter((p) => p.id !== currentProductId).slice(0, 4).map(normalizeProduct);
    }
    return data.map(normalizeProduct);
  } catch {
    return PRODUCTS.filter((p) => p.id !== currentProductId).slice(0, 4).map(normalizeProduct);
  }
}

export async function getProductWithRelated(slug) {
  const product = await getProductBySlug(slug);
  if (!product) return null;

  const related = await getRelatedProducts(product.category_id || product.category, product.id);
  return { product, related };
}

export async function getAllCategories() {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error || !data || data.length === 0) {
      return CATEGORIES;
    }
    return data;
  } catch {
    return CATEGORIES;
  }
}