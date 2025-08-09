import type { Character } from '../card-list/card-list.types';

export type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
  setItems: (items: Character[]) => void;
  setNext: (url: string | null) => void;
  setPrevious: (url: string | null) => void;
};
