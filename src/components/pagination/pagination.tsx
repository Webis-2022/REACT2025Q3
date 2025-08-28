import type { Direction, PaginationProps } from './pagination.types';
import { useSearchParams } from 'react-router-dom';
import { useGetCharactersQuery } from '../../services/api';

export function Pagination({ currentPage, onPageChange }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const { data, error, isLoading } = useGetCharactersQuery({
    page: currentPage,
    search: searchQuery,
  });

  const updatePage = (delta: Direction) => {
    const newPage = currentPage + delta;
    if (newPage < 1) return;

    setSearchParams((prev: URLSearchParams) => {
      const params = new URLSearchParams(prev);
      params.set('page', String(newPage));
      return params;
    });

    onPageChange?.(newPage);
  };

  const handlePrevClick = () => updatePage(-1);
  const handleNextClick = () => updatePage(1);

  const nextDisabled = !data?.next;
  const prevDisabled = !data?.previous;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const status = 'status' in error ? (error.status as number) : 'Unknown';
    return <div>Error: {status}</div>;
  }

  return (
    <div className="pagination-container">
      <button
        className={`prev-btn ${prevDisabled ? 'prev-disabled' : ''}`}
        onClick={handlePrevClick}
        disabled={prevDisabled}
      >
        &larr;
      </button>

      <div className="page-number-container">
        <div className="page-number">Page {currentPage}</div>
      </div>

      <button
        className={`next-btn ${nextDisabled ? 'next-disabled' : ''}`}
        onClick={handleNextClick}
        disabled={nextDisabled}
      >
        &rarr;
      </button>
    </div>
  );
}
