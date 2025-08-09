import type { PaginationProps } from '../pagination/pagination.types';

export type DetailsWindowProps = {
  data: PaginationProps | null;
  onClose: () => void;
};
