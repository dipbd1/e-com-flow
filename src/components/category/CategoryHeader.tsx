import { Category } from '@/types/product';
import Image from 'next/image';

interface CategoryHeaderProps {
  category: Category;
}

export default function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <div className="mb-8">
      <div className="relative h-48 w-full rounded-lg overflow-hidden mb-6">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">{category.name}</h1>
        </div>
      </div>
      <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto">
        {category.description}
      </p>
    </div>
  );
} 