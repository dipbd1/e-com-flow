export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice: number | null;
  description: string;
  rating: number;
  reviewCount: number;
  images: string[];
  featured: boolean;
  newArrival: boolean;
  onSale: boolean;
  categoryId: string;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface SliderItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  icon: string;
}