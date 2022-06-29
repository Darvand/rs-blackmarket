import { createFakeProductEntityArray } from '@main/products/tests/fakes/products.fake';
import { PaginationUtils } from '../utils/pagination.util';
import { createFakePaginationQueryDTO } from './fakes/pagination.fake';

describe('PaginationUtils Unit Test', () => {
  describe('describePagination', () => {
    it('should wrap the products on a pagination interface', () => {
      const products = createFakeProductEntityArray(10);
      const response = PaginationUtils.createPagination(products, 100, 2, 10);

      expect(response).toBeDefined();
      expect(response.actualPage).toEqual(2);
      expect(response.results.length).toEqual(products.length);
      expect(response.totalAmount).toEqual(100);
      expect(response.totalPages).toEqual(10);
    });
  });

  describe('createFindOptions', () => {
    it('should calculate take and skip values', () => {
      const query = createFakePaginationQueryDTO(10, 4);
      const response = PaginationUtils.createFindOptions(query);

      expect(response).toBeDefined();
      expect(response.take).toEqual(query.limit);
      expect(response.skip).toEqual(30);
    });
  });
});
