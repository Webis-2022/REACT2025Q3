import './pagination.css';
import type { FullDataResponse, PaginationProps } from './pagination.types';
import { makeApiQuery } from '../../api/api';
import type { setItemProps } from './pagination.types';
import { useEffect, useState } from 'react';

export function Pagination({
  next,
  previous,
  setItems,
  setNext,
  setPrevious,
}: PaginationProps) {
  const handlePrevClick = async () => {
    console.log('$$$', previous);
    const [data] = await makeApiQuery(previous);
    setItems(data.results);
    setNext(data.next ?? null);
    setPrevious(data.previous ?? null);
  };

  const handleNextClick = async () => {
    console.log('===', next);
    const [data] = await makeApiQuery(next);
    setItems(data.results);
    setNext(data.next ?? null);
    setPrevious(data.previous ?? null);
  };

  const nextDisabled = next === null;
  const prevDisabled = previous === null;
  return (
    <>
      <div className="pagination-container">
        <button
          className={`prev-btn ${prevDisabled ? 'prev-disabled' : ''}`}
          onClick={handlePrevClick}
        >
          &larr;
        </button>
        <button
          className={`next-btn ${nextDisabled ? 'next-disabled' : ''}`}
          onClick={handleNextClick}
        >
          &rarr;
        </button>
      </div>
      ;
    </>
  );
}
