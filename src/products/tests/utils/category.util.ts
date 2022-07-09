import { Repository } from 'typeorm';

import { Product } from '@products/entities/product.entity';
import { Category } from '@products/entities/category.entity';

export const insertCategoriesWithRepository =
  (repository: Repository<Product>) =>
  (categories: Category[]): Promise<any>[] =>
    categories.map((category) =>
      repository.query(
        `INSERT INTO categories (id, name) VALUES ('${category.id}', '${category.name}')`,
      ),
    );
