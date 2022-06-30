import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from '@products/services/products.service';
import { Pagination } from '@main/shared/serializers/pagination.serializer';
import { PaginationQueryDTO } from '@main/shared/dtos/pagination-query.dto';
import { Product } from '@products/entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Get()
  async getAll(
    @Query() query: PaginationQueryDTO,
  ): Promise<Pagination<Product[]>> {
    return this.service.getAll(query);
  }
}
