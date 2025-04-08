import { Category } from '@/types/product';
import CategoryCard from '@/components/category/CategoryCard';

async function getCategories() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/categories`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  return res.json();
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Shop by Category</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our wide range of products organized by category. Find exactly what you&apos;re looking for with our easy-to-navigate categories.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category: Category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
} 