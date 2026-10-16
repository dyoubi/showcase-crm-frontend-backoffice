import { Select, getOptionFromValue } from '@/shared/Select';
import * as t from '../types';

const BooleanOptions = [true, false].map((v) => ({ label: v.toString(), value: v }));

export const BooleanEditor = ({ value, setValue, color }: t.ValueEditorProps) => (
  <Select
    color={color}
    value={getOptionFromValue(value, BooleanOptions)}
    onChange={(option) => setValue(option?.value)}
    options={BooleanOptions}
  />
);
