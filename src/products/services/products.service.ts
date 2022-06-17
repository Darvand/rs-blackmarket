import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductEntity } from '@products/entities/product.entity';
import { GetAllProductsException } from '@products/exceptions/get-all-products.exception';

@Injectable()
export class ProductsService {
  private readonly logger: Logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async getAll(): Promise<ProductEntity[]> {
    try {
      this.logger.log(`Attempting to find all products`);
      const products = await this.productRepository.find();
      this.logger.log(`Founded ${products.length} products`);
      return products;
    } catch (error) {
      throw new GetAllProductsException(error);
    }
  }
}
