import data from '@/data/data.json';
import { Product, Category, Data } from '@/types/product';

// Type assertion to handle the JSON data
const typedData = data as unknown as Data;

const products: Product[] = typedData.products;
const categories: Category[] = typedData.categories;

export function getProductBySlug(slug: string): Product | null {
  return products.find(product => product.slug === slug) || null;
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(product => product.categoryId === categorySlug);
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

export function getAllCategories(): Category[] {
  return categories;
}

export function getAllProducts(): Product[] {
  return products;
}

export const deals = products.filter(product => product.onSale);

export async function getHeroSlides() {
  return data.featured.heroSlider;
}

export async function getPromotions() {
  return data.featured.promotions;
} 