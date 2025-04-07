import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface SectionHeadingProps {
  title: string;
  viewAllLink?: string;
  viewAllText?: string;
}

export default function SectionHeading({
  title,
  viewAllLink,
  viewAllText = 'View all',
}: SectionHeadingProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {viewAllLink && (
        <Link href={viewAllLink} className="text-sm font-medium text-primary hover:underline flex items-center">
          {viewAllText} <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      )}
    </div>
  );
}