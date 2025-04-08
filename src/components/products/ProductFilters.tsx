'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface ProductFiltersProps {
  totalProducts: number;
  currentCategory?: string;
  priceRange: {
    min: string;
    max: string;
  };
}

export default function ProductFilters({ }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  const updateSearchParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    router.push(`/products?${newParams.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-medium mb-2">Category</h3>
        <select
          className="w-full rounded-md border p-2"
          value={category || ''}
          onChange={(e) => updateSearchParams({ category: e.target.value })}
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="home">Home & Kitchen</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full rounded-md border p-2"
            value={minPrice || ''}
            onChange={(e) => updateSearchParams({ minPrice: e.target.value })}
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full rounded-md border p-2"
            value={maxPrice || ''}
            onChange={(e) => updateSearchParams({ maxPrice: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
} 