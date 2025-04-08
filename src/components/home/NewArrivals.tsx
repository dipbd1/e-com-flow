import ProductGrid from '@/components/products/ProductGrid';
import SectionHeading from '@/components/ui/SectionHeading';
import { Product } from '@/types/product';

interface NewArrivalsProps {
  products: Product[];
}

export default function NewArrivals({ products }: NewArrivalsProps) {
  return (
    <section>
      <SectionHeading 
        title="New Arrivals" 
        viewAllLink="/products?new=true" 
      />
      <ProductGrid products={products} />
    </section>
  );
}