import { IsNumber, IsOptional } from 'class-validator';

export class PaginationQueryDTO {
  @IsOptional()
  @IsNumber()
  readonly limit: number = 10;

  @IsNumber()
  @IsOptional()
  readonly page: number = 1;
}
