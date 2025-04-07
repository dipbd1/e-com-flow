import { notFound } from 'next/navigation';
import { getCategoryBySlug, getProductsByCategory } from '@/lib/data';
import ProductGrid from '@/components/products/ProductGrid';
import CategoryHeader from '@/components/category/CategoryHeader';
import CategoryFilters from '@/components/category/CategoryFilters';
import Breadcrumb from '@/components/ui/Breadcrumb';

interface CategoryPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug);
  
  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.id);
  
  // Apply filters based on searchParams
  let filteredProducts = [...products];
  
  // Sort products
  if (searchParams.sort) {
    switch (searchParams.sort) {
      case 'price-asc':
        filteredProducts.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
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

  // Calculate category statistics
  const totalProducts = filteredProducts.length;
  const averageRating = filteredProducts.reduce((acc, product) => acc + product.rating, 0) / totalProducts;
  const onSaleCount = filteredProducts.filter(product => product.onSale).length;
  const newArrivalsCount = filteredProducts.filter(product => product.newArrival).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Categories', href: '/categories' },
          { label: category.name, href: `/category/${category.slug}` },
        ]}
      />

      <CategoryHeader category={category} />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <CategoryFilters 
            category={category}
            totalProducts={totalProducts}
            currentSort={searchParams.sort}
            minPrice={searchParams.minPrice}
            maxPrice={searchParams.maxPrice}
          />
        </div>
        
        <div className="lg:col-span-3">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>Total Products: {totalProducts}</span>
              {onSaleCount > 0 && <span>On Sale: {onSaleCount}</span>}
              {newArrivalsCount > 0 && <span>New Arrivals: {newArrivalsCount}</span>}
              <span>Average Rating: {averageRating.toFixed(1)}</span>
            </div>
          </div>

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