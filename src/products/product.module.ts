import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
})
export class ProductModule {}
