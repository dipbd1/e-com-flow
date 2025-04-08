'use client';

import { notFound } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { getOnSaleProducts } from '@/lib/data';
import ProductGrid from '@/components/products/ProductGrid';
import DealsSortSelect from '@/components/deals/DealsSortSelect';
import { Suspense } from 'react';
import Breadcrumb from '@/components/ui/Breadcrumb';

function DealsContent() {
  const searchParams = useSearchParams();
  const deals = getOnSaleProducts();

  if (!deals.length) {
    notFound();
  }

  // Sort deals
  const sortedDeals = [...deals].sort((a, b) => {
    const sort = searchParams.get('sort');
    switch (sort) {
      case 'price-low':
        return (a.salePrice || a.price) - (b.salePrice || b.price);
      case 'price-high':
        return (b.salePrice || b.price) - (a.salePrice || a.price);
      case 'rating':
        return b.rating - a.rating;
      default: // discount
        const discountA = ((a.price - (a.salePrice || a.price)) / a.price) * 100;
        const discountB = ((b.price - (b.salePrice || b.price)) / b.price) * 100;
        return discountB - discountA;
    }
  });

  // Pagination
  const page = parseInt(searchParams.get('page') || '1');
  const itemsPerPage = 12;
  const totalPages = Math.ceil(sortedDeals.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedDeals = sortedDeals.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Deals", href: "/deals" },
        ]}
      />
      
      <h1 className="text-3xl font-bold mb-6">Hot Deals</h1>
      <p className="text-gray-600 mb-8">Check out our best deals and discounts!</p>

      <div className="flex justify-end mb-6">
        <DealsSortSelect />
      </div>
      <ProductGrid
        products={paginatedDeals}
        currentPage={page}
        totalPages={totalPages}
      />
    </div>
  );
}

export default function DealsPage() {
  return (
    <Suspense fallback={<div>Loading deals...</div>}>
      <DealsContent />
    </Suspense>
  );
} 