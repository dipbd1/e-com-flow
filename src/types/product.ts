export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  price: number;
  salePrice: number | null;
  description: string;
  features: string[];
  specifications: {
    [key: string]: string;
  };
  variants?: ProductVariant[];
  rating: number;
  reviewCount: number;
  stock: number;
  images: string[];
  featured: boolean;
  newArrival: boolean;
  onSale: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface Data {
  categories: Category[];
  products: Product[];
} 