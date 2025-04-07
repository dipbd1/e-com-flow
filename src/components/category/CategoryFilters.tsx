'use client';

import { Category } from '@/types/product';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface CategoryFiltersProps {
  category: Category;
  totalProducts: number;
  currentSort?: string;
  minPrice?: string;
  maxPrice?: string;
}

export default function CategoryFilters({
  category,
  totalProducts,
  currentSort,
  minPrice,
  maxPrice,
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
      <div>
        <h3 className="text-lg font-semibold mb-4">Sort By</h3>
        <div className="space-y-2">
          {[
            { value: 'newest', label: 'Newest' },
            { value: 'price-asc', label: 'Price: Low to High' },
            { value: 'price-desc', label: 'Price: High to Low' },
            { value: 'rating', label: 'Top Rated' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateSearchParams({ sort: option.value })}
              className={cn(
                'block w-full text-left px-4 py-2 rounded-md',
                currentSort === option.value
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Min"
            value={minPrice || ''}
            onChange={(e) =>
              updateSearchParams({ minPrice: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice || ''}
            onChange={(e) =>
              updateSearchParams({ maxPrice: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Showing {totalProducts} products
      </div>
    </div>
  );
} 