import * as yup from 'yup';

declare module 'yup' {
  interface StringSchema<
    TType extends yup.Maybe<string> = string | undefined,
    TContext extends yup.AnyObject = AnyObject,
    TOut extends TType = TType,
  > extends yup.BaseSchema<TType, TContext, TOut> {
    slug(tester: (v: string) => Promise<boolean>): yup.StringSchema<string, TContext>;
  }
}
