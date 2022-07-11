import { Test } from '@nestjs/testing';

import { GetAllProductsException } from '@products/exceptions/get-all-products.exception';
import { ProductsService } from '@products/services/products.service';
import { InternalServerErrorException } from '@nestjs/common';
import { mockProductsRepository } from '@products/tests/mocks/products.repository.mock';
import { ProductsRepository } from '@products/repositories/products.repository';

describe('ProductsService Unit Test', () => {
  let productsService: ProductsService;
  let productsRepository: ProductsRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductsRepository,
          useValue: mockProductsRepository,
        },
      ],
    }).compile();
    productsService = module.get<ProductsService>(ProductsService);
    productsRepository = module.get<ProductsRepository>(ProductsRepository);
  });

  it('should be defined', () => {
    expect(productsService).toBeDefined();
    expect(productsRepository).toBeDefined();
  });

  describe('getAll', () => {
    it('should return five product entities', async () => {
      const response = await productsService.getAll();

      expect(response).toBeDefined();
      expect(response.length).toBe(5);

      response.forEach((product) => {
        expect(product.name).toBeDefined();
        expect(product.description).toBeDefined();
        expect(product.price).toBeDefined();
        expect(product.stock).toBeDefined();
        expect(product.image).toBeDefined();
      });

      expect(productsRepository.findAll).toHaveBeenCalled();
    });

    it('should return empty array if no products were found', async () => {
      jest.spyOn(productsRepository, 'findAll').mockResolvedValueOnce([]);

      const response = await productsService.getAll();

      expect(response).toBeDefined();
      expect(response.length).toBe(0);

      expect(productsRepository.findAll).toHaveBeenCalled();
    });

    it('should throw a GetAllProductsException if repository fails', async () => {
      jest.spyOn(productsRepository, 'findAll').mockImplementationOnce(() => {
        throw new InternalServerErrorException();
      });

      await expect(productsService.getAll()).rejects.toThrowError(
        GetAllProductsException,
      );

      expect(productsRepository.findAll).toHaveBeenCalled();
    });
  });
});
