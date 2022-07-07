import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from '@products/services/products.service';
import { Pagination } from '@main/shared/serializers/pagination.serializer';
import { PaginationQueryDTO } from '@main/shared/dtos/pagination-query.dto';
import { Product } from '@products/entities/product.entity';
import {
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiPagination } from '@main/shared/decorators/api-pagination.decorator';

@ApiTags('Products')
@ApiExtraModels(Pagination, Product)
@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @ApiOperation({ summary: 'List all products' })
  @ApiPagination(Product)
  @ApiInternalServerErrorResponse({ description: 'Unexpected error' })
  @Get()
  async getAll(
    @Query() query: PaginationQueryDTO,
  ): Promise<Pagination<Product>> {
    return this.service.getAll(query);
  }
}
