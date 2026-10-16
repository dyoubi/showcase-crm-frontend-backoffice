import styled from '@emotion/styled';

import { InputWrapper } from '../InputWrapper';
import * as c from './constants';

export const Container = styled(InputWrapper)<{
  style?: React.CSSProperties;
  inputstyle?: React.CSSProperties;
}>(({ theme, disabled, style, inputstyle }) => ({
  /** For prevent ts problems, we put styles on imask component
   *  by using the className
   */
  [`.${c.MaskInputClassName}`]: {
    width: '100%',

    background: 'transparent',
    cursor: disabled ? 'not-allowed' : undefined,
    pointerEvents: disabled ? 'none' : undefined,
    border: 'none',
    color: theme.typography.colors.primary,
    fontFamily: 'inherit',
    textAlign: 'left',
    appearance: 'none',

    boxShadow: 'none',
    outline: 'none',
    '&:focus': {
      boxShadow: 'none',
      outline: 'none',
    },

    '&:hover:not([read-only]), &:hover:not([disabled])': {
      cursor: 'text',
    },

    '&::placeholder': {
      color: theme.typography.colors.secondary,
    },

    '&:disabled, &:read-only': {
      opacity: 0.7,
    },

    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      margin: 0,
      appearance: 'none',
    },

    '&[type="number"]': {
      appearance: 'textfield',
    },
    ...style,
  },
  [`.input-container`]: {
    ...inputstyle,
  },
}));
