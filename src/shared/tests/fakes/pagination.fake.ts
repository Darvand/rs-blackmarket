import { ProductQueryDTO } from '@products/dtos/product-query.dto';
import { PaginationQueryDTO } from '@shared/dtos/pagination-query.dto';
import { Pagination } from '@shared/serializers/pagination.serializer';

export const createFakeProductQueryDTO = (
  limit = 10,
  page = 1,
  byCategories?: string[],
): ProductQueryDTO => {
  return {
    limit,
    page,
    byCategories,
  };
};

export const createFakePagination = <T>(
  results: T[],
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
