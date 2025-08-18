import type { Character } from '../card-list/card-list.types';

export type PaginationProps = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
  setItems: (items: Character[]) => void;
  setNext: (url: string | null) => void;
  setPrevious: (url: string | null) => void;
  setIsLoading: (value: boolean) => void;
  setError: (value: string) => void;
};

export type Direction = -1 | 1;
