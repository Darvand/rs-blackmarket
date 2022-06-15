import { createFakeProductEntityArray } from '@products/tests/fakes/products.fake';

export const mockProductsRepository = {
  find: jest.fn().mockImplementation(async () => {
    return createFakeProductEntityArray();
  }),
};
