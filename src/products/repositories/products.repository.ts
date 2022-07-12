import { EntityRepository, Repository } from 'typeorm';
import { Product } from '@products/entities/product.entity';
import { PaginationQueryDTO } from '@main/shared/dtos/pagination-query.dto';
import { Pagination } from '@main/shared/serializers/pagination.serializer';
import { PaginationUtils } from '@main/shared/utils/pagination.util';
import { Logger } from '@nestjs/common';
import { inspect } from 'util';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  private readonly logger = new Logger(ProductsRepository.name);

  async findAll(query: PaginationQueryDTO): Promise<Pagination<Product[]>> {
    this.logger.log(
      `Attempting to find and count using query: ${inspect(query)}`,
    );
    const findOptions = PaginationUtils.createFindOptions(query);
    const [data, count] = await this.findAndCount(findOptions);
    return PaginationUtils.createPagination(
      data,
      count,
      query.page,
      findOptions.take,
    );
  }
}
