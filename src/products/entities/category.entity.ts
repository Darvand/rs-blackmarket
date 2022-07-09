import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';

import { Base } from '@shared/entities/base.entity';
import { Product } from '@products/entities/product.entity';

@Entity('categories')
export class Category extends Base {
  @ApiProperty({
    description: 'Name associated with the category',
    example: 'Technology',
    type: String,
  })
  @Column({ type: 'varchar', unique: true, nullable: false })
  readonly name: string;

  @OneToMany(() => Product, (product) => product.category)
  readonly products: Product[];

  constructor(name: Category['name']) {
    super();
    this.name = name;
  }
}
