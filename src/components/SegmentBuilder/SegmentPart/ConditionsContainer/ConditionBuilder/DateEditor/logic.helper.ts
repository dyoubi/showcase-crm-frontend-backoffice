import { ValueType } from '../types';

export const getDateValue = (value: ValueType) => {
  if (typeof value === 'boolean' || typeof value === 'undefined') {
    return undefined;
  }

  try {
    const date = new Date(value);
    if (date.toString() === 'Invalid Date' || !date) {
      return undefined;
    }

    return date;
  } catch (ex) {
    return undefined;
  }
};
