import { ProductsController } from '@main/products/controllers/products.controller';
import { GetAllProductsException } from '@main/products/exceptions/get-all-products.exception';
import { ProductsService } from '@main/products/services/products.service';
import {
  createFakePagination,
  createFakePaginationQueryDTO,
} from '@main/shared/tests/fakes/pagination.fake';
import { Test } from '@nestjs/testing';
import { mockProductsService } from '@products/tests/mocks/products.service.mock';

describe('ProductsController Unit Tests', () => {
  let productsController: ProductsController;
  let productService: ProductsService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: mockProductsService }],
    }).compile();
    productsController = module.get<ProductsController>(ProductsController);
    productService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productsController).toBeDefined();
    expect(productService).toBeDefined();
  });

  describe('getAll', () => {
    it('should return five products', async () => {
      const fakeQuery = createFakePaginationQueryDTO(5);
      const response = await productsController.getAll(fakeQuery);

      expect(response).toBeDefined();
      expect(response.actualPage).toBe(fakeQuery.page);
      expect(response.totalAmount).toBe(fakeQuery.limit);
      expect(response.totalPages).toBe(1);
      expect(response.results.length).toBe(5);

      response.results.forEach((product) => {
        expect(product.name).toBeDefined();
        expect(product.description).toBeDefined();
        expect(product.price).toBeDefined();
        expect(product.stock).toBeDefined();
        expect(product.image).toBeDefined();
      });

      expect(productService.getAll).toHaveBeenCalledWith(fakeQuery);
    });

    it('should return empty array if no product were found', async () => {
      const fakeQuery = createFakePaginationQueryDTO();
      const fakePagination = createFakePagination([], fakeQuery);
      jest
        .spyOn(productService, 'getAll')
        .mockResolvedValueOnce(fakePagination);

      const response = await productsController.getAll(fakeQuery);

      expect(response).toBeDefined();
      expect(response.actualPage).toBe(fakePagination.actualPage);
      expect(response.totalAmount).toBe(fakePagination.totalAmount);
      expect(response.totalPages).toBe(fakePagination.totalPages);
      expect(response.results.length).toBe(fakePagination.results.length);

      expect(productService.getAll).toHaveBeenCalledWith(fakeQuery);
    });

    it('should throw a GetAllProductsException if service fails', async () => {
      const fakeQuery = createFakePaginationQueryDTO();
      jest.spyOn(productService, 'getAll').mockImplementationOnce(() => {
        throw new GetAllProductsException('');
      });

      await expect(productsController.getAll(fakeQuery)).rejects.toThrowError(
        GetAllProductsException,
      );

      expect(productService.getAll).toHaveBeenCalledWith(fakeQuery);
    });
  });
});
