import { createFakeProductEntityArray } from '@products/tests/fakes/products.fake';

export const mockProductsRepository = {
  findAll: jest.fn().mockImplementation(async () => {
    return createFakeProductEntityArray();
  }),
};
