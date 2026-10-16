import { DatePicker } from '@/shared/DatePicker';

import { getDateValue } from './logic.helper';
import * as t from '../types';

export const DateEditor = ({ value, setValue, color }: t.ValueEditorProps) => (
  <DatePicker
    color={color}
    showTimeInput
    value={getDateValue(value)}
    setValue={(date) => setValue(date?.getTime())}
  />
);
