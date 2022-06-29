import { createFakeProductEntityArray } from '@main/products/tests/fakes/products.fake';
import { PaginationUtils } from '../utils/pagination.util';

describe('PaginationUtils Unit Test', () => {
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
