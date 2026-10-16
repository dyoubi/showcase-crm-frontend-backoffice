import { FieldValues } from 'react-hook-form';

import { FeedbackMessage } from '../FeedbackMessage';
import { Flex } from '../Flex';
import { Label } from '../Label';

import * as S from './styles';
import * as t from './types';

export const { RadioInput } = S;

export function RadioGroup<T extends FieldValues>(props: t.RadioGroupProps<T>) {
  const {
    color = 'secondary',
    caption,
    formData,
    label,
    name,
    options,
    ...restProps
  } = props;

  return (
    <S.Fieldset data-testid="radio-input-root" {...restProps}>
      {(label) ? (
        <Label>
          {label}
        </Label>
      ) : null}

      <Flex flexWrap="wrap" alignItems="center" gap={16}>
        {options.map(({ label: radioInputLabel, value, ...restRadioInputProps }) => (
          <S.Label key={value}>
            <RadioInput
              {...restRadioInputProps}
              {...((formData) ? formData.register(name) : { name })}
              value={value}
              type="radio"
            />

            <span>{radioInputLabel}</span>
          </S.Label>
        ))}
      </Flex>

      {(caption) ? (
        <FeedbackMessage color={color}>
          {caption}
        </FeedbackMessage>
      ) : null}
    </S.Fieldset>
  );
};
