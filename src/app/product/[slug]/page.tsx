import { notFound } from 'next/navigation';
import ProductGallery from '@/components/products/ProductGallery';
import ProductInfo from '@/components/products/ProductInfo';
import ProductActions from '@/components/products/ProductActions';
import { getProductBySlug, getCategoryBySlug } from '@/lib/data';
import Breadcrumb from '@/components/ui/Breadcrumb';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const category = await getCategoryBySlug(product.categoryId);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Categories', href: '/categories' },
          { label: category?.name || 'Category', href: `/category/${category?.slug}` },
          { label: product.name, href: `/product/${product.slug}` },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductGallery images={product.images} />
        <div className="flex flex-col gap-6">
          <ProductInfo product={product} />
          <ProductActions product={product} />
        </div>
      </div>
    </div>
  );
} 