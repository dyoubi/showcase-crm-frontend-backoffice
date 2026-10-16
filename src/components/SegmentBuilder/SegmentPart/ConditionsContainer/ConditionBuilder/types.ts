import { Colors } from '@emotion/react';

export type ValueType = string | number | boolean | undefined;

export interface ValueEditorProps {
  value?: ValueType;
  color: Colors;
  setValue: (val: ValueType) => void;
  enumValues?: string[];
}
