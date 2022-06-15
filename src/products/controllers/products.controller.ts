import { Controller, Get } from '@nestjs/common';
import { ProductDTO } from '@products/dtos/product.dto';
import { ProductsService } from '@products/services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Get()
  async getAll(): Promise<ProductDTO[]> {
    return this.service.getAll();
  }
}
