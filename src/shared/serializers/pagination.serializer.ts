export interface Pagination<T> {
  results: T;
  totalPages: number;
  actualPage: number;
  totalAmount: number;
}
