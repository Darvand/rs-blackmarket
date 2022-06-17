import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductEntity } from '@products/entities/product.entity';
import { ProductModule } from '@products/product.module';
import { Repository } from 'typeorm';
import { createFakeProductEntityArray } from './fakes/products.fake';
import { sharedTestingConfig } from '@main/shared/tests/utils/shared-testing.config';

describe('Products', () => {
  let app: INestApplication;
  let repository: Repository<ProductEntity>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ProductModule, ...sharedTestingConfig],
    }).compile();
    app = module.createNestApplication();
    repository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
    await app.init();
  });

  describe('GET /products', () => {
    it('should return empty array because there are no products', async () => {
      const response = await request(app.getHttpServer()).get('/products');
      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body).toEqual([]);
    });

    it('should return five products', async () => {
      const expectedProducts = createFakeProductEntityArray();
      await repository.insert(expectedProducts);
      const response = await request(app.getHttpServer()).get('/products');
      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body.length).toBe(expectedProducts.length);
      response.body.forEach((product: ProductEntity) => {
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
