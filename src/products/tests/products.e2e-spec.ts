import * as request from 'supertest';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Product } from '@products/entities/product.entity';
import { ProductModule } from '@products/product.module';
import { createFakeProductEntityArray } from '@products/tests/fakes/products.fake';
import { sharedTestingConfig } from '@shared/tests/utils/shared-testing.config';
import { ProductsRepository } from '@products/repositories/products.repository';
import { insertCategoriesWithRepository } from '@products/tests/utils/category.util';
import { Category } from '@products/entities/category.entity';
import { Pagination } from '@shared/serializers/pagination.serializer';

describe('Products', () => {
  let app: INestApplication;
  let repository: ProductsRepository;
  let httpServer: any;
  let insertCategories: (categories: Category[]) => Promise<any>[];

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ProductModule, ...sharedTestingConfig],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    repository = module.get<ProductsRepository>(ProductsRepository);
    insertCategories = insertCategoriesWithRepository(repository);
    await app.init();
    httpServer = app.getHttpServer();
  });

  const requestProducts = () => request(httpServer).get('/products');

  describe('GET /products', () => {
    it('should return empty array because there are no products', async () => {
      const response = await requestProducts();
      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body.results).toEqual([]);
    });

    it('should return five products', async () => {
      const expectedProducts = createFakeProductEntityArray();
      await Promise.all(
        insertCategories(expectedProducts.map((product) => product.category)),
      );
      await repository.insert(expectedProducts);
      const response = await requestProducts();
      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body.results.length).toBe(expectedProducts.length);
      response.body.results.forEach((product: Product) => {
        expect(product.name).toBeDefined();
        expect(product.description).toBeDefined();
        expect(product.price).toBeDefined();
        expect(product.stock).toBeDefined();
        expect(product.image).toBeDefined();
        expect(product.createdAt).toBeDefined();
        expect(product.updatedAt).toBeDefined();
      });
    });

    it('should return expected limit products on expected page', async () => {
      const expectedAmount = 20;
      const expectedProducts = createFakeProductEntityArray(expectedAmount);
      await Promise.all(
        insertCategories(expectedProducts.map((product) => product.category)),
      );
      await repository.insert(expectedProducts);
      const expectedLimit = 5;
      const expectedPage = 3;
      const response = await request(httpServer).get(
        `/products?page=${expectedPage}&limit=${expectedLimit}`,
      );
      expect(response.statusCode).toEqual(HttpStatus.OK);
      const body: Pagination<Product> = response.body;
      expect(body.results.length).toBe(expectedLimit);
      expect(body.actualPage).toBe(expectedPage);
      expect(body.totalPages).toBe(Math.ceil(expectedAmount / expectedLimit));
      expect(body.totalAmount).toBe(expectedAmount);
      body.results.forEach((product: Product) => {
        expect(product.name).toBeDefined();
        expect(product.description).toBeDefined();
        expect(product.price).toBeDefined();
        expect(product.stock).toBeDefined();
        expect(product.image).toBeDefined();
        expect(product.createdAt).toBeDefined();
        expect(product.updatedAt).toBeDefined();
      });
    });

    it('should filter by category on products', async () => {
      const productsToInsert = createFakeProductEntityArray();
      const categories = productsToInsert.map((product) => product.category);
      const [firstCategory, secondCategory] = categories;
      await Promise.all(insertCategories(categories));
      await repository.insert(productsToInsert);
      const response = await request(httpServer).get(
        `/products?byCategories=${firstCategory.name},${secondCategory.name}`,
      );
      expect(response.statusCode).toEqual(HttpStatus.OK);

      const responseFirstCategoryLength = response.body.results.filter(
        (product: Product) => product.category.name === firstCategory.name,
      ).length;
      expect(responseFirstCategoryLength).toBe(1);

      const responseSecondCategoryLength = response.body.results.filter(
        (product: Product) => product.category.name === secondCategory.name,
      ).length;
      expect(responseSecondCategoryLength).toBe(1);
      expect(response.body.results.length).toBe(2);
    });
  });

  afterEach(async () => {
    const connection = repository.manager.connection;
    await connection.dropDatabase();
    await app.close();
  });
});
