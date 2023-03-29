import { HttpException, HttpStatus } from '@nestjs/common';

export const notFound = (err: string) => {
  throw new HttpException(
    {
      status: HttpStatus.NOT_FOUND,
      error: err,
    },
    HttpStatus.NOT_FOUND,
    {
      description: err,
    },
  );
};
