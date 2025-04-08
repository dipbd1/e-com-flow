import ProductGrid from '@/components/products/ProductGrid';
import SectionHeading from '@/components/ui/SectionHeading';
import { Product } from '@/types/product';

interface OnSaleProps {
  products: Product[];
}

export default function OnSale({ products }: OnSaleProps) {
  return (
    <section>
      <SectionHeading 
        title="On Sale" 
        viewAllLink="/products?sale=true" 
      />
      <ProductGrid products={products} />
    </section>
  );
}