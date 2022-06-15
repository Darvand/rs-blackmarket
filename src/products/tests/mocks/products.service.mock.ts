import { ProductDTO } from '@main/products/dtos/product.dto';
import { createFakeProductDTOArray } from '@products/tests/fakes/products.fake';

export const mockProductsService = {
  getAll: jest.fn().mockImplementation(async (): Promise<ProductDTO[]> => {
    return createFakeProductDTOArray();
  }),
};
