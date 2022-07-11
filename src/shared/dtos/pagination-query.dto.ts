import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { SORTED_BY } from '../enums/pagination.enum';

export class PaginationQueryDTO {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional({
    type: Number,
    description: 'Set how many items should be returned',
    default: 10,
  })
  readonly limit?: number = 10;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({
    type: Number,
    description: 'Specify which page should be returned',
    default: 1,
  })
  readonly page?: number = 1;

  @IsOptional()
  @IsEnum(SORTED_BY)
  @ApiPropertyOptional({
    type: SORTED_BY,
    description: `Specify how to sort the results by the creation date using ${SORTED_BY.ASC} or ${SORTED_BY.ASC}`,
    enum: SORTED_BY,
  })
  readonly sortedBy?: SORTED_BY = SORTED_BY.ASC;
}
