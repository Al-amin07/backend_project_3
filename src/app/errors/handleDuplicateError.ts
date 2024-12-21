/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  TErrorSources,
  TGenericErrorResponse,
} from '../interface/error.interface';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const duplicateText = err?.message.match(/"([^"]+)"/);
  const text = duplicateText && duplicateText[1];
  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${text} is already exist`,
    },
  ];
  return {
    statusCode: 400,
    message: `Duplicate ${text}`,
    errorSources,
  };
};

export default handleDuplicateError;
