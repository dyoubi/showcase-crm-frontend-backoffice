import React, { HTMLAttributes } from 'react';
import { Colors } from '@emotion/react';

import { Spacer } from '../Spacer';
import { useId } from '../../hooks';

import * as S from './styles';
import { FeedbackMessage } from '../FeedbackMessage';

export interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  name?: string;
  disabled?: boolean;
  checked?: boolean;
  label?: React.ReactNode;
  caption?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultChecked?: boolean;
  // TODO Check if name corresponds to the decision we made (color vs variant)
  color?: Colors;
  id?: string;
}

// Strongly inspired from https://www.w3schools.com/howto/howto_css_custom_checkbox.asp
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      name,
      disabled,
      checked,
      onChange,
      defaultChecked,
      color = 'primary',
      id,
      label,
      className,
      caption,
      ...rest
    },
    ref,
  ) => {
    const defaultId = useId();

    return (
      <div className={className}>
        <S.Container>
          <S.HiddenCheckbox
            type="checkbox"
            name={name}
            disabled={disabled}
            checked={checked}
            onChange={onChange}
            defaultChecked={defaultChecked}
            ref={ref}
            id={id || defaultId}
            {...rest}
          />
          <S.Tick disabled={disabled} color={color} />
          <S.EmptyCheckbox disabled={disabled} color={color} />
          {label && (
            <>
              <Spacer size="xxs" />
              <S.CheckLabel htmlFor={id || defaultId}>{label}</S.CheckLabel>
            </>
          )}
        </S.Container>
        {caption && <FeedbackMessage color={color}>{caption}</FeedbackMessage>}
      </div>
    );
  },
);
