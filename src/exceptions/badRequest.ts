import { HttpException, HttpStatus } from '@nestjs/common';

export const badRequest = (errorMessage: string) => {
  throw new HttpException(
    {
      status: HttpStatus.BAD_REQUEST,
      error: errorMessage,
    },
    HttpStatus.BAD_REQUEST,
    {
      description: errorMessage,
    },
  );
};
