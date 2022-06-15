import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductDTO } from '@products/dtos/product.dto';
import { ProductEntity } from '@products/entities/product.entity';
import { GetAllProductsException } from '@products/exceptions/get-all-products.exception';
import { ProductsMapper } from '@products/mappers/products.mapper';

@Injectable()
export class ProductsService {
  private readonly logger: Logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  async getAll(): Promise<ProductDTO[]> {
    try {
      this.logger.log(`Attempting to find all products`);
      const products = await this.repository.find();
      this.logger.log(`Founded ${products.length} products`);
      return products.map(ProductsMapper.entityToDTO);
    } catch (error) {
      throw new GetAllProductsException(error);
    }
  }
}
