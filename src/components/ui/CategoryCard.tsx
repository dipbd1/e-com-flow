import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.slug}`} className="group">
      <div className="relative aspect-video overflow-hidden rounded-lg mb-2">
        <Image
          src={category.image || '/images/placeholder.jpg'}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-all duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h3 className="text-white font-semibold text-xl">{category.name}</h3>
        </div>
      </div>
    </Link>
  );
}