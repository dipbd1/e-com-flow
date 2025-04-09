import { Product } from '@/types/product';

interface ProductSchemaProps {
  products: Product[];
}

export function ProductSchema({ products }: ProductSchemaProps) {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': products.map((product, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Product',
        'name': product.name,
        'description': product.description,
        'image': product.images?.[0] || '',
        'sku': product.id,
        'offers': {
          '@type': 'Offer',
          'price': product.salePrice || product.price,
          'priceCurrency': 'USD',
          'availability': product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          'priceValidUntil': new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
        },
        'brand': {
          '@type': 'Brand',
          'name': 'Your Brand Name' // Replace with your actual brand name
        },
        'aggregateRating': product.rating ? {
          '@type': 'AggregateRating',
          'ratingValue': product.rating,
          'reviewCount': product.reviewCount
        } : undefined,
        'category': product.categoryId,
        'url': `${process.env.NEXT_PUBLIC_SITE_URL}/product/${product.slug}`,
        'new': product.newArrival,
        'sale': product.onSale
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
    />
  );
} 