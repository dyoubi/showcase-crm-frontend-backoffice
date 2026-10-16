import { ValueOf } from '@/utils/typescript.helpers';

export const ERRORS_NAMES = {
  UNAUTHORIZED_ERROR: 'UnauthorizedError',
} as const;

export type ErrorNames = ValueOf<typeof ERRORS_NAMES>;

export interface ApiErrorType {
  error: {
    statusCode: number;
    name: ErrorNames;
    message: string;
  };
}
