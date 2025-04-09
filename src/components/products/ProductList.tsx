import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <section 
      aria-label="Product list"
      className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6"
    >
      {products.map((product) => (
        <article 
          key={product.id}
          itemScope
          itemType="https://schema.org/Product"
        >
          <meta itemProp="name" content={product.name} />
          <meta itemProp="description" content={product.description} />
          <meta itemProp="sku" content={product.id} />
          <meta itemProp="category" content={product.categoryId} />
          <meta itemProp="url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/product/${product.slug}`} />
          {product.rating && (
            <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
              <meta itemProp="ratingValue" content={product.rating.toString()} />
              <meta itemProp="reviewCount" content={product.reviewCount.toString()} />
            </div>
          )}
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="price" content={(product.salePrice || product.price).toString()} />
            <meta itemProp="priceCurrency" content="USD" />
            <meta itemProp="availability" content={product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"} />
          </div>
          <ProductCard product={product} />
        </article>
      ))}
    </section>
  );
} 