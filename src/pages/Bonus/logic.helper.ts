import { FieldPath, RegisterOptions, UseFormReturn, ValidationRule } from 'react-hook-form';
import { getInputProps } from '@/libs/react-hook-form/utils';

import * as t from './types';

export const getInput = (formData: UseFormReturn<t.BonusForm>) => {
  const getInputPropsRequired = (name: FieldPath<t.BonusForm>, rules?: RegisterOptions<t.BonusForm>) =>
    getInputProps(formData, name, {
      rules: {
        required: 'Required',
        shouldUnregister: true,
        ...(rules || {}),
      },
    });

  const getNumberProps = (
    name: FieldPath<t.BonusForm>,
    // @TS-BLAME
    // The definition of the key “pattern” is already included in the “RegisterOptions”
    // but somehow when defining a new value, TS read it as “undefined”
    rules?: RegisterOptions<t.BonusForm> & { pattern: ValidationRule<RegExp>}
  ) =>
    getInputPropsRequired(name, {
      pattern: {
        message: 'Please enters an positive number',
        value: /^(0|[1-9]\d*)(\.\d+)?$/,
      },
      ...(rules || {}),
    });

  return { getInputPropsRequired, getNumberProps };
};

export const getBonusCode = (codeLength = 8) => {
  const AVAILABLE_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let result = '';

  for (let index = 0; index < codeLength; index += 1) {
      result += AVAILABLE_CHARACTERS.charAt(Math.floor(Math.random() * AVAILABLE_CHARACTERS.length));
    }

  return result;
};
