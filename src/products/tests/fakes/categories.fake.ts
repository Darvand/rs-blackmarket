import { faker } from '@faker-js/faker';

import { Category } from '@products/entities/category.entity';

export const createFakeCategory = (): Category => {
  const category = new Category(faker.name.firstName());
  category.id = faker.datatype.uuid();
  return category;
};
