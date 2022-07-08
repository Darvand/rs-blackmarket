import { Category } from '@products/entities/category.entity';

export interface IProductProps {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: Category;
}
