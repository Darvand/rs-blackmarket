import { faker } from '@faker-js/faker';

import { ProductEntity } from '@main/products/entities/product.entity';

export const createFakeProductEntity = (): ProductEntity => {
  return new ProductEntity(
    faker.name.firstName(),
    faker.random.words(10),
    faker.datatype.number(1000000),
    faker.datatype.number(100),
    faker.internet.url(),
  );
};

export const createFakeProductEntityArray = (size = 5): ProductEntity[] => {
  const products: ProductEntity[] = [];
  for (let index = 0; index < size; index++) {
    products.push(createFakeProductEntity());
  }
  return products;
};
