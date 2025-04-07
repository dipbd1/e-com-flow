'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updatePage = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', page.toString());
    router.push(`?${newParams.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(
    (page) =>
      page === 1 ||
      page === totalPages ||
      (page >= currentPage - 1 && page <= currentPage + 1)
  );

  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={() => updatePage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded-md disabled:opacity-50"
      >
        Previous
      </button>

      {visiblePages.map((page, index) => (
        <div key={page} className="flex items-center gap-2">
          {index > 0 && visiblePages[index - 1] !== page - 1 && (
            <span className="px-2">...</span>
          )}
          <button
            onClick={() => updatePage(page)}
            className={cn(
              'px-3 py-1 border rounded-md',
              currentPage === page && 'bg-primary text-white'
            )}
          >
            {page}
          </button>
        </div>
      ))}

      <button
        onClick={() => updatePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded-md disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
} 