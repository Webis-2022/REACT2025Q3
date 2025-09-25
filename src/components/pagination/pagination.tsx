'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useGetCharactersQuery } from '../../services/api';
import { PaginationProps } from './pagination.types';
import { useTranslations } from 'next-intl';

export function Pagination({ currentPage, onPageChange }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations('Pagination');

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

  const updatePage = (shouldDecrease = false) => {
    const newPage = shouldDecrease ? currentPage - 1 : currentPage + 1;
    if (newPage < 1) return;

    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    router.push(`${pathname}?${params.toString()}`);

    onPageChange?.(newPage);
  };

  const handlePrev = () => updatePage(true);
  const handleNext = () => updatePage(false);

  const prevDisabled = data?.previous === null;
  const nextDisabled = data?.next === null;

  if (!data) {
    if (error && 'status' in error) {
      return <div>Error: {error.status}</div>;
    }
    return null;
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
        <div className="page-number">
          {t('page')} {currentPage}
        </div>
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
