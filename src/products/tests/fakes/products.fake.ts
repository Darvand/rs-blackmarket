import { faker } from '@faker-js/faker';

import { Product } from '@products/entities/product.entity';
import { IProductProps } from '@products/interfaces/product.interface';
import { createFakeCategory } from '@products/tests/fakes/categories.fake';

export const createFakeProductEntity = (): Product => {
  const productProps: IProductProps = {
    name: faker.name.firstName(),
    description: faker.random.words(10),
    price: faker.datatype.number(1000000),
    stock: faker.datatype.number(100),
    image: faker.internet.url(),
    category: createFakeCategory(),
  };
  return new Product(productProps);
};

export const createFakeProductEntityArray: (size?: number) => Product[] = (
  size = 5,
): Product[] => {
  const products: Product[] = [];
  for (let index = 0; index < size; index++) {
    products.push(createFakeProductEntity());
  }
  return products;
};
