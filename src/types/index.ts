export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  tagline: string;
  image: string;
  productCount: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  categorySlug: string;
  image: string;
  images: string[];
  tags: string[];
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  minOrder?: number;
  sku: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}
