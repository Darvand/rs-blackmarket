import { Controller, Get } from '@nestjs/common';
import { ProductsService } from '@products/services/products.service';
import { ProductEntity } from '@products/entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Get()
  async getAll(): Promise<ProductEntity[]> {
    return this.service.getAll();
  }
}
