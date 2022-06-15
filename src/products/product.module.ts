import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@products/entities/product.entity';
import { ProductsController } from '@products/controllers/products.controller';
import { ProductsService } from '@products/services/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductModule {}
