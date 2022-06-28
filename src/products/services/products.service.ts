import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductEntity } from '@products/entities/product.entity';
import { GetAllProductsException } from '@products/exceptions/get-all-products.exception';
import { ProductsRepository } from '@products/repositories/products.repository';

@Injectable()
export class ProductsService {
  private readonly logger: Logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(ProductsRepository)
    private readonly productRepository: ProductsRepository,
  ) {}

  async getAll(): Promise<ProductEntity[]> {
    try {
      this.logger.log(`Attempting to find all products`);
      const products = await this.productRepository.findAll();
      this.logger.log(`Founded ${products.length} products`);
      return products;
    } catch (error) {
      throw new GetAllProductsException(error);
    }
  }
}
