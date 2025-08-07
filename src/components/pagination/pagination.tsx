import type { PaginationProps } from './pagination.types';
import { makeApiQuery } from '../../api/api';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Pagination({
  next,
  previous,
  setItems,
  setNext,
  setPrevious,
}: PaginationProps) {
  const [, setSearchParams] = useSearchParams();
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    setSearchParams({});
  }, []);

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev: URLSearchParams) => {
      const params = new URLSearchParams(prev);
      params.set('page', String(newPage));
      return params;
    });
  };
  const handlePrevClick = async () => {
    const [data] = await makeApiQuery<PaginationProps>(previous);
    const newPage = pageNum - 1;
    setItems(data.results);
    setNext(data.next ?? null);
    setPrevious(data.previous ?? null);
    setPageNum(newPage);
    setSearchParams({ page: String(newPage) });
    handlePageChange(newPage);
  };

  const handleNextClick = async () => {
    const [data] = await makeApiQuery<PaginationProps>(next);
    const newPage = pageNum + 1;
    setItems(data.results);
    setNext(data.next ?? null);
    setPrevious(data.previous ?? null);
    setPageNum(newPage);
    setSearchParams({ page: String(newPage) });
    handlePageChange(newPage);
  };

  const nextDisabled = next === null;
  const prevDisabled = previous === null;
  return (
    <>
      <div className="pagination-container">
        <button
          className={`prev-btn ${prevDisabled ? 'prev-disabled' : ''}`}
          onClick={handlePrevClick}
          disabled={prevDisabled}
        >
          &larr;
        </button>
        <div className="page-number-container">
          <div className="page-number">Page {pageNum}</div>
        </div>
        <button
          className={`next-btn ${nextDisabled ? 'next-disabled' : ''}`}
          onClick={handleNextClick}
          disabled={nextDisabled}
        >
          &rarr;
        </button>
      </div>
      ;
    </>
  );
}
