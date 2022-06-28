import { EntityRepository, Repository } from 'typeorm';
import { ProductEntity } from '@products/entities/product.entity';

@EntityRepository(ProductEntity)
export class ProductsRepository extends Repository<ProductEntity> {
  findAll(): Promise<ProductEntity[]> {
    return this.find();
  }
}
