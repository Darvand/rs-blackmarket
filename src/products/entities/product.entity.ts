import { Base } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('products')
export class ProductEntity extends Base {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  image: string;
}
