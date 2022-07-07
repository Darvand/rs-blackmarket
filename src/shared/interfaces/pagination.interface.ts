export interface PaginationProps<T> {
  results: T[];
  totalPages: number;
  actualPage: number;
  totalAmount: number;
}
