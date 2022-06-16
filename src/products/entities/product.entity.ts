import { Column, Entity } from 'typeorm';

import { Base } from '@shared/entities/base.entity';

@Entity('products')
export class ProductEntity extends Base {
  @Column({ type: 'varchar', unique: true, length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', length: 1000, nullable: true })
  description: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  stock: number;

  @Column({ type: 'varchar', nullable: true, length: 500 })
  image: string;
}
