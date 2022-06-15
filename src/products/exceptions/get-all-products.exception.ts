import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class GetAllProductsException extends HttpException {
  private readonly logger = new Logger(GetAllProductsException.name);

  constructor(error: string) {
    super(`Can't get all products`, HttpStatus.INTERNAL_SERVER_ERROR);
    this.logger.error(
      `Unexpected error when trying to get all products. Stacktrace: `,
      error,
    );
  }
}
