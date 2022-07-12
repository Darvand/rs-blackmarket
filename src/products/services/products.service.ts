import { PaginationQueryDTO } from '@main/shared/dtos/pagination-query.dto';
import { Pagination } from '@main/shared/serializers/pagination.serializer';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from '@products/entities/product.entity';
import { GetAllProductsException } from '@products/exceptions/get-all-products.exception';
import { ProductsRepository } from '@products/repositories/products.repository';

@Injectable()
export class ProductsService {
  private readonly logger: Logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(ProductsRepository)
    private readonly productRepository: ProductsRepository,
  ) {}

  async getAll(query: PaginationQueryDTO): Promise<Pagination<Product>> {
    try {
      this.logger.log(`Attempting to find all products`);
      const products = await this.productRepository.findAll(query);
      this.logger.log(`Founded ${products.results.length} products`);
      return products;
    } catch (error) {
      throw new GetAllProductsException(error);
    }
  }
}
