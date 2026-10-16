import { Input } from '@/shared/Input';

import * as t from '../types';

export const NumberEditor = ({ value, setValue, color }: t.ValueEditorProps) => (
  <Input
    type="number"
    color={color}
    value={Number(value) || undefined}
    onChange={({ target }) => setValue(Number(target.value))}
  />
);
