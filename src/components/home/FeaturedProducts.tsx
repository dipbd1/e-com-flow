import ProductGrid from '@/components/products/ProductGrid';
import SectionHeading from '@/components/ui/SectionHeading';
import { Product } from '@/types';

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section>
      <SectionHeading 
        title="Featured Products" 
        viewAllLink="/products?featured=true" 
      />
      <ProductGrid products={products} />
    </section>
  );
}