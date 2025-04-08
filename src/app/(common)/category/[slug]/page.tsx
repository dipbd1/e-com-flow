import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getCategoryProducts } from "@/lib/api/categories";
import ProductGrid from "@/components/products/ProductGrid";
import Breadcrumb from "@/components/ui/Breadcrumb";

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const category = await getCategoryBySlug(resolvedParams.slug);
  
  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    };
  }

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  
  const category = await getCategoryBySlug(resolvedParams.slug);
  
  if (!category) {
    notFound();
  }

  const products = await getCategoryProducts(resolvedParams.slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: category.name, href: `/category/${category.slug}` },
        ]}
      />
      
      <h1 className="text-3xl font-bold mb-6">{category.name}</h1>
      <p className="text-gray-600 mb-8">{category.description}</p>

      <ProductGrid products={products} />
    </div>
  );
} 