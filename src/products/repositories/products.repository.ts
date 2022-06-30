import { EntityRepository, Repository } from 'typeorm';
import { Product } from '@products/entities/product.entity';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  findAll(): Promise<Product[]> {
    return this.find();
  }
}
