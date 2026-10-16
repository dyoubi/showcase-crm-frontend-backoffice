import { Input } from '@/shared/Input';
import { getOptionFromValue, Select } from '@/shared/Select';

import * as t from '../types';

export const StringEditor = ({ value = '', setValue, enumValues, color }: t.ValueEditorProps) => {
  if (enumValues) {
    const enumsOptions = enumValues.map((v) => ({ label: v, value: v }));
    return (
      <Select
        color={color}
        value={getOptionFromValue(value, enumsOptions)}
        onChange={(option) => setValue(option?.value?.toString() || '')}
        options={enumsOptions}
      />
    );
  }
  return (
    <Input
      color={color}
      value={value.toString()}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};
