import ProductGrid from '@/components/products/ProductGrid';
import SortSelect from '@/components/products/SortSelect';
import ProductFilters from '@/components/products/ProductFilters';
import Breadcrumb from '@/components/ui/Breadcrumb';

const ITEMS_PER_PAGE = 24;

interface ProductsPageProps {
  searchParams: {
    category?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  };
}

async function getProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const products = await getProducts();
  
  // Apply filters based on searchParams
  let filteredProducts = [...products];
  
  // Filter by category
  if (searchParams.category) {
    filteredProducts = filteredProducts.filter(
      product => product.categoryId === searchParams.category
    );
  }

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
    { label: 'Products', href: '/products' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <ProductFilters
            totalProducts={filteredProducts.length}
            currentCategory={searchParams.category}
            priceRange={{
              min: searchParams.minPrice || '',
              max: searchParams.maxPrice || '',
            }}
          />
        </div>
        
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">All Products</h1>
            <SortSelect currentSort={searchParams.sort || 'newest'} />
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