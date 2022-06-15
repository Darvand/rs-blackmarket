import { datatype, internet, name, random } from 'faker';

import { ProductDTO } from '@main/products/dtos/product.dto';
import { ProductEntity } from '@main/products/entities/product.entity';

export const createFakeProductDTO = (): ProductDTO => {
  return new ProductDTO(
    name.title(),
    random.words(10),
    datatype.number(1000000),
    datatype.number(100),
    internet.url(),
  );
};

export const createFakeProductDTOArray = (size = 5): ProductDTO[] => {
  const products: ProductDTO[] = [];
  for (let index = 0; index < size; index++) {
    products.push(createFakeProductDTO());
  }
  return products;
};

export const createFakeProductEntity = (): ProductEntity => {
  return new ProductEntity(
    name.title(),
    random.words(10),
    datatype.number(1000000),
    datatype.number(100),
    internet.url(),
  );
};

export const createFakeProductEntityArray = (size = 5): ProductEntity[] => {
  const products: ProductEntity[] = [];
  for (let index = 0; index < size; index++) {
    products.push(createFakeProductEntity());
  }
  return products;
};
