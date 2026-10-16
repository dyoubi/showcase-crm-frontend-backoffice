import { FunctionComponent } from 'react';

import { Operators } from '@/domains/casino/segmentation';
import { EntityModelReformatted } from '@/domains/entity';

import { BooleanEditor } from './BooleanEditor';
import { DateEditor } from './DateEditor';
import { NumberEditor } from './NumberEditor';
import { StringEditor } from './StringEditor';
import { ValueEditorProps } from './types';

export const operatorOptions: Array<{ label: string; value: Operators }> = [
  { label: 'is equal', value: 'eq' },
  { label: 'is not equal', value: 'neq' },
  { label: 'is greater ', value: 'gt' },
  { label: 'is less ', value: 'lt' },
  { label: 'is greater or equal ', value: 'gte' },
  { label: 'is less or equal', value: 'lte' },
];

export const ERROR_MESSAGES = {
  MISSING_PROPERTY: 'Please select an property',
  MISSING_OPERATOR: 'Please select an operator',
  MISSING_VALUE: 'Please fill the value input',
} as const;

export const PropertyValueEditor: Record<
  EntityModelReformatted['properties'][string]['type'],
  FunctionComponent<ValueEditorProps>
> = {
  string: StringEditor,
  boolean: BooleanEditor,
  date: DateEditor,
  number: NumberEditor,
};
