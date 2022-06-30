import { ProductsController } from '@main/products/controllers/products.controller';
import { GetAllProductsException } from '@main/products/exceptions/get-all-products.exception';
import { ProductsService } from '@main/products/services/products.service';
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
      const response = await productsController.getAll();

      expect(response).toBeDefined();
      expect(response.length).toBe(5);

      response.forEach((product) => {
        expect(product.name).toBeDefined();
        expect(product.description).toBeDefined();
        expect(product.price).toBeDefined();
        expect(product.stock).toBeDefined();
        expect(product.image).toBeDefined();
      });

      expect(productService.getAll).toHaveBeenCalled();
    });

    it('should return empty array if no product were found', async () => {
      jest.spyOn(productService, 'getAll').mockResolvedValueOnce([]);

      const response = await productsController.getAll();

      expect(response).toBeDefined();
      expect(response.length).toBe(0);

      expect(productService.getAll).toHaveBeenCalled();
    });

    it('should throw a GetAllProductsException if service fails', async () => {
      jest.spyOn(productService, 'getAll').mockImplementationOnce(() => {
        throw new GetAllProductsException('');
      });

      await expect(productsController.getAll()).rejects.toThrowError(
        GetAllProductsException,
      );

      expect(productService.getAll).toHaveBeenCalled();
    });
  });
});
