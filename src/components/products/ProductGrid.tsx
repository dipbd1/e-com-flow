import { Product } from '@/types/product';
import Pagination from '@/components/ui/Pagination';
import { AnimatedProductGrid } from './AnimatedProductGrid';
import { ProductList } from './ProductList';
import { ProductSchema } from './ProductSchema';

interface ProductGridProps {
  products: Product[];
  currentPage?: number;
  totalPages?: number;
}

export default function ProductGrid({ products, currentPage = 1, totalPages = 1 }: ProductGridProps) {
  return (
    <div className="space-y-6">
      {/* Schema markup for SEO */}
      <ProductSchema products={products} />

      {/* Server-rendered product list for SEO */}
      <div className="sr-only">
        <ProductList products={products} />
      </div>

      {/* Client-side animated grid for users */}
      <div className="not-sr-only">
        <AnimatedProductGrid products={products} />
      </div>

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}