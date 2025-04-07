export interface ProductVariant {
  id: string;
  size: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  categoryId: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured?: boolean;
  newArrival?: boolean;
  onSale?: boolean;
  createdAt: string;
  updatedAt: string;
  variants?: ProductVariant[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface Data {
  products: Product[];
  categories: Category[];
} 