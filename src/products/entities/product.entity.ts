import { Column, Entity } from 'typeorm';

import { Base } from '@shared/entities/base.entity';

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

  constructor(
    name: Product['name'],
    description: Product['description'],
    price: Product['price'],
    stock: Product['stock'],
    image: Product['image'],
  ) {
    super();
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.image = image;
  }
}
