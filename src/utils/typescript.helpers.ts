import React from 'react';
import * as yup from 'yup';

// We need to add a `readonly any[]` else the helper doesn't detect arrays as const
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValueOf<T> = T extends readonly any[] | any[] ? T[number] : T[keyof T];

// taken from
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type NativeDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type ConditionalSchema<T> = T extends string
  ? yup.StringSchema
  : T extends number
  ? yup.NumberSchema
  : T extends boolean
  ? yup.BooleanSchema
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  : T extends Record<any, any>
  ? yup.AnyObjectSchema
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  : T extends Array<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ? yup.ArraySchema<any, any>
  : yup.AnySchema;

export type YupShape<Fields> = {
  [Key in keyof Fields]: ConditionalSchema<Fields[Key]>;
};
