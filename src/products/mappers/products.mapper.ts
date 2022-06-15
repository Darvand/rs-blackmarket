import { ProductDTO } from '@products/dtos/product.dto';
import { ProductEntity } from '@products/entities/product.entity';

export class ProductsMapper {
  static entityToDTO(entity: ProductEntity) {
    return new ProductDTO(
      entity.name,
      entity.description,
      entity.price,
      entity.stock,
      entity.image,
    );
  }
}
