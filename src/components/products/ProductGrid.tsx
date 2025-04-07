import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import Pagination from '@/components/ui/Pagination';

interface ProductGridProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
}

export default function ProductGrid({ products, currentPage, totalPages }: ProductGridProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}