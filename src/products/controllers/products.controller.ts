import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from '@products/services/products.service';
import { ProductEntity } from '@products/entities/product.entity';
import { Pagination } from '@main/shared/serializers/pagination.serializer';
import { PaginationQueryDTO } from '@main/shared/dtos/pagination-query.dto';

@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Get()
  async getAll(
    @Query() query: PaginationQueryDTO,
  ): Promise<Pagination<ProductEntity[]>> {
    return this.service.getAll(query);
  }
}
