import { notFound } from 'next/navigation';
import ProductDetail from '@/components/products/ProductDetail';
import Breadcrumb from '@/components/ui/Breadcrumb';


type tParams = Promise<{
  slug: string;
}>;

async function getProduct(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/products/${slug}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  return res.json();
}

async function getCategoryBySlug(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/categories?slug=${slug}`);
  if (!res.ok) {
    throw new Error('Failed to fetch category');
  }
  return res.json();
}

export default async function ProductPage(props:{ params : tParams }) {
  const resolvedParams = await props.params;
  const product = await getProduct(resolvedParams.slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  const category = await getCategoryBySlug(product.categoryId);

  if (!category) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: category.name, href: `/category/${category.slug}` },
    { label: product.name, href: `/product/${product.slug}` },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      <ProductDetail product={product} />
    </div>
  );
} 