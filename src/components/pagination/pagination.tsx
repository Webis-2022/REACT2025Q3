import type { PaginationProps } from './pagination.types';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetCharactersQuery } from '../../services/api';

export function Pagination({ currentPage, onPageChange }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const { data, error } = useGetCharactersQuery({
    page: currentPage,
    search: searchQuery,
  });

  useEffect(() => {
    setSearchParams({});
  }, []);

  const handlePrev = () => {
    if (data?.previous) {
      setSearchParams({ page: String(currentPage - 1) });
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (data?.next) {
      setSearchParams({ page: String(currentPage + 1) });
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
    <>
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
      ;
    </>
  );
}
