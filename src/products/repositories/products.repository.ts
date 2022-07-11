import { EntityRepository, Repository } from 'typeorm';
import { inspect } from 'util';
import { Logger } from '@nestjs/common';

import { Pagination } from '@shared/serializers/pagination.serializer';
import { Product } from '@products/entities/product.entity';
import { PaginationUtils } from '@shared/utils/pagination.util';
import { ProductQueryDTO } from '@products/dtos/product-query.dto';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  private readonly logger = new Logger(ProductsRepository.name);

  async findAll(query: ProductQueryDTO): Promise<Pagination<Product>> {
    this.logger.log(
      `Attempting to find and count using query: ${inspect(query)}`,
    );
    const findOptions = PaginationUtils.createFindOptions<Product>(query);
    const queryBuilder = this.createQueryBuilder('products').leftJoinAndSelect(
      'products.category',
      'category',
    );
    if (query.byCategories) {
      queryBuilder.where('category.name IN (:...names)', {
        names: query.byCategories,
      });
    }
    const [data, count] = await queryBuilder
      .skip(findOptions.skip)
      .take(findOptions.take)
      .orderBy('products.createdAt', query.sortedBy)
      .getManyAndCount();
    return PaginationUtils.createPagination(
      data,
      count,
      query.page,
      findOptions.take,
    );
  }
}
