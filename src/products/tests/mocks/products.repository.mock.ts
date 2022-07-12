import { createFakePagination } from '@shared/tests/fakes/pagination.fake';
import { createFakeProductEntityArray } from '@products/tests/fakes/products.fake';

export const mockProductsRepository = {
  findAll: jest.fn().mockImplementation(async () => {
    const products = createFakeProductEntityArray();
    return createFakePagination(products, {
      limit: products.length,
      page: 1,
    });
  }),
};
