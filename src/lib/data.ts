import data from '@/data/data.json';
import { Product, Category, Data } from '@/types/product';

// Type assertion to handle the JSON data
const typedData = data as unknown as Data;

export const products = typedData.products;
export const categories = typedData.categories;

export function getProductBySlug(slug: string): Product | null {
  return products.find(product => product.slug === slug) || null;
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(product => product.categoryId === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

export function getNewArrivals(): Product[] {
  return products.filter(product => product.newArrival);
}

export function getOnSaleProducts(): Product[] {
  return products.filter(product => product.onSale);
}

export function getCategoryBySlug(slug: string): Category | null {
  return categories.find(category => category.slug === slug) || null;
} 