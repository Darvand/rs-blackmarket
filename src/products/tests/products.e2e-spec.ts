import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Product } from '@products/entities/product.entity';
import { ProductModule } from '@products/product.module';
import { createFakeProductEntityArray } from '@products/tests/fakes/products.fake';
import { sharedTestingConfig } from '@shared/tests/utils/shared-testing.config';
import { ProductsRepository } from '@products/repositories/products.repository';

describe('Products', () => {
  let app: INestApplication;
  let repository: ProductsRepository;
  let httpServer: any;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ProductModule, ...sharedTestingConfig],
    }).compile();
    app = module.createNestApplication();
    repository = module.get<ProductsRepository>(ProductsRepository);
    await app.init();
    httpServer = app.getHttpServer();
  });

  const requestProducts = () => request(httpServer).get('/products');

  describe('GET /products', () => {
    it('should return empty array because there are no products', async () => {
      const response = await requestProducts();
      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body).toEqual([]);
    });

    it('should return five products', async () => {
      const expectedProducts = createFakeProductEntityArray();
      await repository.insert(expectedProducts);
      const response = await requestProducts();
      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body.length).toBe(expectedProducts.length);
      response.body.forEach((product: Product) => {
        expect(product.name).toBeDefined();
        expect(product.description).toBeDefined();
        expect(product.price).toBeDefined();
        expect(product.stock).toBeDefined();
        expect(product.image).toBeDefined();
        expect(product.createdAt).toBeDefined();
        expect(product.updatedAt).toBeDefined();
      });
    });
  });

  afterAll(async () => {
    const connection = repository.manager.connection;
    await connection.dropDatabase();
    await app.close();
  });
});
