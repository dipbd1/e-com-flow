import { Product } from '@/types';
import data from '@/data/data.json';

export async function getProducts(): Promise<Product[]> {
  // Using local data instead of API call
  return data.products;
  
  // Real API implementation (commented for now)
  /*
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/products`, { 
    next: { revalidate: 3600 } 
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return res.json();
  */
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(product => product.categoryId === categoryId);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(product => product.featured);
}

export async function getNewArrivals(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(product => product.newArrival);
}

export async function getOnSaleProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(product => product.onSale);
}

// Additional utility function for single product
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find(product => product.slug === slug);
}