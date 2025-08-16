'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useGetCharactersQuery } from '../../services/api';
import { PaginationProps } from './pagination.types';

export function Pagination({ currentPage, onPageChange }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParams.get('search') || '';

  const { data, error } = useGetCharactersQuery({
    page: currentPage,
    search: searchQuery,
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.delete('page');
    params.delete('details');
    router.replace(`${pathname}?${params.toString()}`);
  }, []);

  const handlePrev = () => {
    if (data?.previous) {
      const params = new URLSearchParams(searchParams);
      params.set('page', String(currentPage - 1));
      router.push(`${pathname}?${params.toString()}`);
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (data?.next) {
      const params = new URLSearchParams(searchParams);
      params.set('page', String(currentPage + 1));
      router.push(`${pathname}?${params.toString()}`);
      onPageChange(currentPage + 1);
    }
  };

  const nextDisabled = data?.next === null;
  const prevDisabled = data?.previous === null;

  if (!data) {
    if (error && 'status' in error) {
      return <div>Error: {error.status}</div>;
    }
  }

  return (
    <div className="pagination-container">
      <button
        className={`prev-btn ${prevDisabled ? 'prev-disabled' : ''}`}
        onClick={handlePrev}
        disabled={prevDisabled}
      >
        &larr;
      </button>
      <div className="page-number-container">
        <div className="page-number">Page {currentPage}</div>
      </div>
      <button
        className={`next-btn ${nextDisabled ? 'next-disabled' : ''}`}
        onClick={handleNext}
        disabled={nextDisabled}
      >
        &rarr;
      </button>
    </div>
  );
}
