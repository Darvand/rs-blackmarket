import { PaginationQueryDTO } from '@main/shared/dtos/pagination-query.dto';
import { Pagination } from '@main/shared/serializers/pagination.serializer';

export const createFakePaginationQueryDTO = (
  limit = 10,
  page = 1,
): PaginationQueryDTO => {
  return {
    limit,
    page,
  };
};

export const createFakePagination = <T>(
  results: T,
  query?: PaginationQueryDTO,
  totalPages = 1,
): Pagination<T> => {
  return {
    results,
    totalAmount: query.limit,
    actualPage: query.page,
    totalPages,
  };
};
