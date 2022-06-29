import { Product } from '@main/products/entities/product.entity';
import { Pagination } from '@main/shared/serializers/pagination.serializer';
import { createFakePagination } from '@main/shared/tests/fakes/pagination.fake';
import { createFakeProductEntityArray } from '@products/tests/fakes/products.fake';

export const mockProductsService = {
  getAll: jest
    .fn()
    .mockImplementation(async (): Promise<Pagination<Product[]>> => {
      const products = createFakeProductEntityArray();
      return createFakePagination(products, {
        limit: products.length,
        page: 1,
      });
    }),
};
