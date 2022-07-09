import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from '@products/services/products.service';
import { Product } from '@products/entities/product.entity';
import { Pagination } from '@shared/serializers/pagination.serializer';
import {
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiPagination } from '@shared/decorators/api-pagination.decorator';
import { ProductQueryDTO } from '@products/dtos/product-query.dto';

@ApiTags('Products')
@ApiExtraModels(Pagination, Product)
@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @ApiOperation({ summary: 'List all products' })
  @ApiPagination(Product)
  @ApiInternalServerErrorResponse({ description: 'Unexpected error' })
  @Get()
  async getAll(@Query() query: ProductQueryDTO): Promise<Pagination<Product>> {
    return this.service.getAll(query);
  }
}
