import { faker } from '@faker-js/faker';

import { Product } from '@main/products/entities/product.entity';

export const createFakeProductEntity = (): Product => {
  return new Product(
    faker.name.firstName(),
    faker.random.words(10),
    faker.datatype.number(1000000),
    faker.datatype.number(100),
    faker.internet.url(),
  );
};

export const createFakeProductEntityArray = (size = 5): Product[] => {
  const products: Product[] = [];
  for (let index = 0; index < size; index++) {
    products.push(createFakeProductEntity());
  }
  return products;
};
