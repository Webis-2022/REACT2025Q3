export type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  count: number;
};
