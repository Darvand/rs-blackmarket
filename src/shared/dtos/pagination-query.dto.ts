import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationQueryDTO {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    description: 'Set how many items should be returned',
    default: 10,
  })
  readonly limit: number = 10;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    type: Number,
    description: 'Specify which page should be returned',
    default: 1,
  })
  readonly page: number = 1;
}
