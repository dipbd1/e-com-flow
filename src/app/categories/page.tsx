import { categories } from '@/lib/data';
import CategoryCard from '@/components/category/CategoryCard';

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our wide range of products organized by category. Find exactly what you're looking for with our curated collections.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
} 