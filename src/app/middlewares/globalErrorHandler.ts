/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import config from '../config';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import { TErrorSources } from '../interface/error.interface';
import handleValidationError from '../errors/handleValidationError';
import AppError from '../modules/errors/AppError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): any => {
  let message = 'Validation Erroreee';
  let status = 500;
  let details: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    status = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    details = simplifiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    status = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    details = simplifiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    status = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    details = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    status = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    details = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    status = err?.statusCode;
    message = err?.message;
    details = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    details = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }
  return res.status(status).json({
    success: false,
    message,
    statusCode: err?.statusCode || status,
    error: { details },
    stack: (config.NODE_ENV as string) === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
