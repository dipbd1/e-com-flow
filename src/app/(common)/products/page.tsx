import ProductGrid from '@/components/products/ProductGrid';
import SortSelect from '@/components/products/SortSelect';
import ProductFilters from '@/components/products/ProductFilters';
import Breadcrumb from '@/components/ui/Breadcrumb';

const ITEMS_PER_PAGE = 24;

type ProductsPageProps = {
  params: Promise<{
    [key: string]: string | string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

async function getProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  
  const category = resolvedSearchParams.category as string | undefined;
  const sort = resolvedSearchParams.sort as string | undefined;
  const minPrice = resolvedSearchParams.minPrice as string | undefined;
  const maxPrice = resolvedSearchParams.maxPrice as string | undefined;
  const page = resolvedSearchParams.page as string | undefined;

  const products = await getProducts();
  
  // Apply filters based on searchParams
  let filteredProducts = [...products];
  
  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(
      product => product.categoryId === category
    );
  }

  // Sort products
  if (sort) {
    switch (sort) {
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
  if (minPrice) {
    const min = parseFloat(minPrice);
    filteredProducts = filteredProducts.filter(
      product => (product.salePrice || product.price) >= min
    );
  }
  if (maxPrice) {
    const max = parseFloat(maxPrice);
    filteredProducts = filteredProducts.filter(
      product => (product.salePrice || product.price) <= max
    );
  }

  // Pagination
  const currentPage = parseInt(page || '1');
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <ProductFilters
            totalProducts={filteredProducts.length}
            currentCategory={category}
            priceRange={{
              min: minPrice || '',
              max: maxPrice || '',
            }}
          />
        </div>
        
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">All Products</h1>
            <SortSelect currentSort={sort || 'newest'} />
          </div>
          
          <ProductGrid
            products={paginatedProducts}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
} 