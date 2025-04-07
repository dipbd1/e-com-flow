'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function DealsSortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'discount';

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('sort', e.target.value);
    router.push(`/deals?${newParams.toString()}`);
  };

  return (
    <select
      className="rounded-md border p-2"
      value={currentSort}
      onChange={handleSortChange}
    >
      <option value="discount">Biggest Discount</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
      <option value="rating">Top Rated</option>
    </select>
  );
} 