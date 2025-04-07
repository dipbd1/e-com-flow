import { Suspense } from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import PromotionBanner from '@/components/home/PromotionBanner';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import NewArrivals from '@/components/home/NewArrivals';
import OnSale from '@/components/home/OnSale';

async function getFeaturedData() {
  const res = await fetch('http://localhost:3000/api/featured', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch featured data');
  return res.json();
}

async function getCategories() {
  const res = await fetch('http://localhost:3000/api/categories', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

async function getFeaturedProducts() {
  const res = await fetch('http://localhost:3000/api/products?featured=true', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch featured products');
  return res.json();
}

async function getNewArrivals() {
  const res = await fetch('http://localhost:3000/api/products?new=true', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch new arrivals');
  return res.json();
}

async function getOnSaleProducts() {
  const res = await fetch('http://localhost:3000/api/products?sale=true', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch on sale products');
  return res.json();
}

export default async function Home() {
  // Fetch data in parallel with error handling
  const [featuredData, categories, featuredProducts, newArrivals, onSaleProducts] = await Promise.all([
    getFeaturedData().catch(() => ({ heroSlider: [], promotions: [] })),
    getCategories().catch(() => []),
    getFeaturedProducts().catch(() => []),
    getNewArrivals().catch(() => []),
    getOnSaleProducts().catch(() => []),
  ]);
  
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section>
        <Suspense fallback={<div className="aspect-[21/9] bg-gray-200 rounded-lg animate-pulse"></div>}>
          <HeroSlider slides={featuredData.heroSlider} />
        </Suspense>
        
        <div className="mt-6">
          <PromotionBanner promotions={featuredData.promotions} />
        </div>
      </section>
      
      {/* Categories */}
      <CategoryGrid categories={categories} />
      
      {/* Featured Products */}
      <FeaturedProducts products={featuredProducts} />
      
      {/* New Arrivals */}
      <NewArrivals products={newArrivals} />
      
      {/* On Sale Products */}
      <OnSale products={onSaleProducts} />
    </div>
  );
}
