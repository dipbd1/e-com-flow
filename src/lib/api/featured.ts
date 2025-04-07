import { SliderItem, Promotion } from '@/types';
import data from '@/data/data.json';

export interface FeaturedData {
  heroSlider: SliderItem[];
  promotions: Promotion[];
}

export async function getFeaturedData(): Promise<FeaturedData> {
  // Using local data instead of API call
  return {
    heroSlider: data.featured.heroSlider,
    promotions: data.featured.promotions
  };
  
  // Real API implementation (commented for now)
  /*
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/featured`, { 
    next: { revalidate: 3600 } 
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch featured data');
  }
  
  return res.json();
  */
}