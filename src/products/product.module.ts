import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from '@products/controllers/products.controller';
import { ProductsService } from '@products/services/products.service';
import { ProductsRepository } from '@products/repositories/products.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsRepository])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductModule {}
