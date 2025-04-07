import { Category } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="group relative overflow-hidden rounded-lg aspect-[4/3]">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h2 className="text-2xl font-bold text-white mb-2">{category.name}</h2>
          <p className="text-white/80 text-sm line-clamp-2">{category.description}</p>
        </div>
      </div>
    </Link>
  );
} 