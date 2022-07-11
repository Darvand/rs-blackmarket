import { Test } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';

import { GetAllProductsException } from '@products/exceptions/get-all-products.exception';
import { ProductsService } from '@products/services/products.service';
import { mockProductsRepository } from '@products/tests/mocks/products.repository.mock';
import { ProductsRepository } from '@products/repositories/products.repository';
import {
  createFakePagination,
  createFakePaginationQueryDTO,
} from '@shared/tests/fakes/pagination.fake';

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
      const fakeQuery = createFakePaginationQueryDTO(5);
      const response = await productsService.getAll(fakeQuery);

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

      expect(productsRepository.findAll).toHaveBeenCalledWith(fakeQuery);
    });

    it('should return empty array if no products were found', async () => {
      const fakeQuery = createFakePaginationQueryDTO();
      const fakePagination = createFakePagination([], fakeQuery);
      jest
        .spyOn(productsRepository, 'findAll')
        .mockResolvedValueOnce(fakePagination);

      const response = await productsService.getAll(fakeQuery);

      expect(response).toBeDefined();
      expect(response.actualPage).toBe(fakePagination.actualPage);
      expect(response.totalAmount).toBe(fakePagination.totalAmount);
      expect(response.totalPages).toBe(fakePagination.totalPages);
      expect(response.results.length).toBe(fakePagination.results.length);

      expect(productsRepository.findAll).toHaveBeenCalledWith(fakeQuery);
    });

    it('should throw a GetAllProductsException if repository fails', async () => {
      const fakeQuery = createFakePaginationQueryDTO();
      jest.spyOn(productsRepository, 'findAll').mockImplementationOnce(() => {
        throw new InternalServerErrorException();
      });

      await expect(productsService.getAll(fakeQuery)).rejects.toThrowError(
        GetAllProductsException,
      );

      expect(productsRepository.findAll).toHaveBeenCalledWith(fakeQuery);
    });
  });
});
