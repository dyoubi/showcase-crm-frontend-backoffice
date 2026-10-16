import React, { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

import { InputWrapperProps } from '../InputWrapper';
import * as S from './styles';
import * as c from './constants';

export interface InputMaskProps extends InputWrapperProps {
  mask: string | RegExp | DateConstructor;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string;
  pattern?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  inputstyle?: React.CSSProperties;
  onAccept?: (value: string) => void;
  onComplete?: (value: string) => void;
  parse?: (str: string) => Date;
  format?: (str: Date) => string;
}

export const InputMask = forwardRef<HTMLInputElement, InputMaskProps>(
  (
    {
      mask,
      value,
      pattern,
      disabled,
      readOnly,
      onAccept,
      onComplete,
      placeholder,
      parse,
      format,
      style,
      inputstyle,
      ...restProps
    },
    ref,
  ) => {
    const commonProps = {
      inputRef: ref,
      value,
      onAccept,
      onComplete,
      placeholder,
      className: c.MaskInputClassName,
    } as const;
    return (
      <S.Container
        {...restProps}
        disabled={disabled}
        className="container"
        style={style}
        inputstyle={inputstyle}
      >
        {typeof mask === 'string' && (
          <IMaskInput mask={mask} {...commonProps} inputstyle={inputstyle} />
        )}
        {mask instanceof RegExp && (
          <IMaskInput mask={mask} {...commonProps} inputstyle={inputstyle} />
        )}
        {mask === Date && (
          <IMaskInput
            mask={mask}
            pattern={pattern}
            disabled={disabled}
            readOnly={readOnly}
            {...commonProps}
            parse={parse}
            format={format}
            blocks={c.DateBlocks}
            inputstyle={inputstyle}
          />
        )}
      </S.Container>
    );
  },
);

InputMask.displayName = 'InputMask';
