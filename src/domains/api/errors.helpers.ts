import axios, { AxiosError } from 'axios';

import * as t from './types';

export const isApiError = (ex: unknown): ex is AxiosError<t.ApiErrorType> => {
  if (!axios.isAxiosError(ex)) {
    return false;
  }
  const { response } = ex as AxiosError<t.ApiErrorType>;

  return !!(response?.data?.error?.name && response?.data?.error?.statusCode);
};

export const formatApiError = (error: AxiosError<t.ApiErrorType>) => ({
  ...(error?.response?.data?.error || {}),
});
