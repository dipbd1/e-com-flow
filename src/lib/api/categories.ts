import { Category } from '@/types';
import data from '@/data/data.json';

export async function getCategories(): Promise<Category[]> {
  // Using local data instead of API call
  return data.categories;
  
  // Real API implementation (commented for now)
  /*
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/categories`, { 
    next: { revalidate: 3600 } 
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return res.json();
  */
}

// Additional utility function for single category
export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find(category => category.slug === slug);
}