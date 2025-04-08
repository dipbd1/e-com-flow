'use client';

import { Category } from '@/types/product';
import { useRouter, useSearchParams } from 'next/navigation';

interface CategoryFiltersProps {
  category: Category;
  totalProducts: number;
  currentSort?: string;
  priceRange?: {
    min: string;
    max: string;
  };
}

export default function CategoryFilters({
  category,
  totalProducts,
  currentSort = 'newest',
  priceRange = { min: '', max: '' },
}: CategoryFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    router.push(`/category/${category.slug}?${newParams.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <span className="text-sm text-gray-600">{totalProducts} products</span>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Sort By</h4>
          <div className="space-y-2">
            <button
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                currentSort === 'newest'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => updateSearchParams({ sort: 'newest' })}
            >
              Newest
            </button>
            <button
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                currentSort === 'price-low'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => updateSearchParams({ sort: 'price-low' })}
            >
              Price: Low to High
            </button>
            <button
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                currentSort === 'price-high'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => updateSearchParams({ sort: 'price-high' })}
            >
              Price: High to Low
            </button>
            <button
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                currentSort === 'rating'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => updateSearchParams({ sort: 'rating' })}
            >
              Top Rated
            </button>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Price Range</h4>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full px-3 py-2 rounded-md border text-sm"
              value={priceRange.min}
              onChange={(e) => updateSearchParams({ minPrice: e.target.value })}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-full px-3 py-2 rounded-md border text-sm"
              value={priceRange.max}
              onChange={(e) => updateSearchParams({ maxPrice: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 