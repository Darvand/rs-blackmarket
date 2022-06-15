import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ProductEntity } from '@main/products/entities/product.entity';
import { GetAllProductsException } from '@main/products/exceptions/get-all-products.exception';
import { ProductsService } from '@main/products/services/products.service';
import { InternalServerErrorException } from '@nestjs/common';
import { mockProductsRepository } from '@products/tests/mocks/products.repository.mock';

describe('ProductsService Unit Test', () => {
  let productsService: ProductsService;
  let productsRepository: Repository<ProductEntity>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: mockProductsRepository,
        },
      ],
    }).compile();
    productsService = module.get<ProductsService>(ProductsService);
    productsRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
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

      expect(productsRepository.find).toHaveBeenCalledWith();
    });

    it('should return empty array if no products were found', async () => {
      jest.spyOn(productsRepository, 'find').mockResolvedValueOnce([]);

      const response = await productsService.getAll();

      expect(response).toBeDefined();
      expect(response.length).toBe(0);

      expect(productsRepository.find).toHaveBeenCalledWith();
    });

    it('should throw a GetAllProductsException if repository fails', async () => {
      jest.spyOn(productsRepository, 'find').mockImplementationOnce(() => {
        throw new InternalServerErrorException();
      });

      await expect(productsService.getAll()).rejects.toThrowError(
        GetAllProductsException,
      );

      expect(productsRepository.find).toHaveBeenCalledWith();
    });
  });
});
