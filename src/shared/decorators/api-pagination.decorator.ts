import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { Pagination } from '../serializers/pagination.serializer';

export const ApiPagination = <T extends Type<any>>(model: T) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          {
            $ref: getSchemaPath(Pagination),
          },
          {
            properties: {
              results: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
                description: 'List of object requested',
              },
            },
          },
        ],
      },
    }),
  );
};
