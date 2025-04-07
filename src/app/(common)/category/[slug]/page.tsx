import { notFound } from 'next/navigation';
import { Product, Category } from '@/types/product';
import ProductGrid from '@/components/products/ProductGrid';
import CategoryHeader from '@/components/category/CategoryHeader';
import CategoryFilters from '@/components/category/CategoryFilters';
import Breadcrumb from '@/components/ui/Breadcrumb';

interface CategoryPageProps {
  params: { slug: string };
  searchParams: {
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  };
}

async function getCategory(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/categories?slug=${slug}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch category');
  }
  return res.json();
}

async function getCategoryProducts(categorySlug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/products?category=${categorySlug}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch category products');
  }
  return res.json();
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);
  
  if (!category) {
    notFound();
  }

  const products = await getCategoryProducts(category.slug);
  
  // Apply filters based on searchParams
  let filteredProducts = [...products];
  
  // Sort products
  if (searchParams.sort) {
    switch (searchParams.sort) {
      case 'price-low':
        filteredProducts.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
  }

  // Filter by price range
  if (searchParams.minPrice) {
    const minPrice = parseFloat(searchParams.minPrice);
    filteredProducts = filteredProducts.filter(
      product => (product.salePrice || product.price) >= minPrice
    );
  }
  if (searchParams.maxPrice) {
    const maxPrice = parseFloat(searchParams.maxPrice);
    filteredProducts = filteredProducts.filter(
      product => (product.salePrice || product.price) <= maxPrice
    );
  }

  // Pagination
  const page = parseInt(searchParams.page || '1');
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: category.name, href: `/category/${category.slug}` },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <CategoryHeader category={category} />
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <CategoryFilters
            category={category}
            totalProducts={filteredProducts.length}
            currentSort={searchParams.sort || 'newest'}
            priceRange={{
              min: searchParams.minPrice || '',
              max: searchParams.maxPrice || '',
            }}
          />
        </div>
        
        <div className="w-full md:w-3/4">
          <ProductGrid
            products={paginatedProducts}
            currentPage={page}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
} 