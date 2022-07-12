import { Column, Entity } from 'typeorm';

import { Base } from '@shared/entities/base.entity';
import { IProductProps } from '@products/interfaces/product.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('products')
export class Product extends Base {
  @ApiProperty({
    description: 'Name associated with the product',
    example: 'Bottle',
    type: String,
  })
  @Column({ type: 'varchar', unique: true, nullable: false })
  readonly name: string;

  @ApiPropertyOptional({
    description: 'A brief description about the product',
    example: 'Made of a fine and transparent glass',
    type: String,
  })
  @Column({ type: 'text', nullable: true })
  readonly description: string;

  @ApiProperty({
    description: 'The price in colombian pesos about the product',
    example: 6000,
    type: Number,
  })
  @Column({ type: 'int', nullable: false })
  readonly price: number;

  @ApiProperty({
    description: 'The quantity available about the product',
    example: 10,
    type: Number,
  })
  @Column({ type: 'int', nullable: false, default: 0 })
  readonly stock: number;

  @ApiPropertyOptional({
    description: 'An URL that contains the image related to the product',
    example: 'https://image.com/glass',
    type: String,
  })
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
