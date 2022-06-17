import { ProductEntity } from '@main/products/entities/product.entity';
import { createFakeProductEntityArray } from '@products/tests/fakes/products.fake';

export const mockProductsService = {
  getAll: jest.fn().mockImplementation(async (): Promise<ProductEntity[]> => {
    return createFakeProductEntityArray();
  }),
};
