import { Column, Entity } from 'typeorm';

import { Base } from '@shared/entities/base.entity';
import { IProductProps } from '@products/interfaces/product.interface';

@Entity('products')
export class Product extends Base {
  @Column({ type: 'varchar', unique: true, nullable: false })
  readonly name: string;

  @Column({ type: 'text', nullable: true })
  readonly description: string;

  @Column({ type: 'int', nullable: false })
  readonly price: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  readonly stock: number;

  @Column({ type: 'varchar', nullable: true })
  readonly image: string;

  constructor(productProps: IProductProps) {
    const { name, description, price, stock, image } = productProps;
    super();
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.image = image;
  }
}
