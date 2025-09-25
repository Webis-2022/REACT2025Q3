import type { Character } from '../card-list/card-list.types';

export type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  count: number;
  results: Character[];
};

export type Direction = -1 | 1;
