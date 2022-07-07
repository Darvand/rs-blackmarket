import { ApiProperty } from '@nestjs/swagger';
import { PaginationProps } from '../interfaces/pagination.interface';

export class Pagination<T> {
  @ApiProperty({
    description: 'Total number of pages available',
    example: 5,
    type: Number,
  })
  readonly totalPages: number;

  @ApiProperty({
    description: 'Specify which page is the retrieved response',
    example: 2,
    type: Number,
  })
  readonly actualPage: number;

  @ApiProperty({
    description: 'Total number of records available in total',
    example: 21,
    type: Number,
  })
  readonly totalAmount: number;

  readonly results: T[];

  constructor(props: PaginationProps<T>) {
    this.results = props.results;
    this.totalAmount = props.totalAmount;
    this.actualPage = props.actualPage;
    this.totalPages = props.totalPages;
  }
}
