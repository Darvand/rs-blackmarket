import { FindManyOptions } from 'typeorm';
import { PaginationQueryDTO } from '../dtos/pagination-query.dto';
import { Pagination } from '../serializers/pagination.serializer';

export class PaginationUtils {
  static createFindOptions(query: PaginationQueryDTO): FindManyOptions {
    const take = query.limit;
    const page = query.page;
    const skip = (page - 1) * take;
    return { take, skip };
  }

  static createPagination<T>(
    results: T[],
    totalAmount: number,
    actualPage: number,
    limit: number,
  ): Pagination<T> {
    return new Pagination<T>({
      results,
      totalAmount,
      actualPage,
      totalPages: Math.ceil(totalAmount / limit),
    });
  }
}
