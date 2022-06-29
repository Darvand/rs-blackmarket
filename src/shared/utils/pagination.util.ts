import { Pagination } from '../serializers/pagination.serializer';

export class PaginationUtils {
  static createPagination<T>(
    results: T[],
    totalAmount: number,
    actualPage: number,
    limit: number,
  ): Pagination<T[]> {
    return {
      results,
      totalAmount,
      actualPage,
      totalPages: Math.ceil(totalAmount / limit),
    };
  }
}
