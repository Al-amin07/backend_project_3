import mongoose from 'mongoose';
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../interface/error.interface';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSourses: TErrorSources = Object.values(err?.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    },
  );
  console.log({ errorSourses });
  return {
    statusCode: 400,
    message: 'Validation Error',
    errorSourses,
  };
};

export default handleValidationError;