import { Category } from '@/types';
import CategoryCard from '@/components/ui/CategoryCard';
import SectionHeading from '@/components/ui/SectionHeading';

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section>
      <SectionHeading 
        title="Shop by Category" 
        viewAllLink="/categories" 
        viewAllText="View all categories" 
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}