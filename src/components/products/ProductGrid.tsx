import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import Pagination from '@/components/ui/Pagination';

interface ProductGridProps {
  products: Product[];
  currentPage?: number;
  totalPages?: number;
}

export default function ProductGrid({ products, currentPage = 1, totalPages = 1 }: ProductGridProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
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