import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDTO } from '@shared/dtos/pagination-query.dto';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class ProductQueryDTO extends PaginationQueryDTO {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  @ApiProperty({
    description: 'Specify the name of the category',
    example: ['Technology', 'Finance'],
  })
  readonly byCategories?: string[];
}
