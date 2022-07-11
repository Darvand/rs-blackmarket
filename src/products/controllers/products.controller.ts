import { Controller, Get } from '@nestjs/common';
import { ProductsService } from '@products/services/products.service';
import { Product } from '@products/entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.service.getAll();
  }
}
