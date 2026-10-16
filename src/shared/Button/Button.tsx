import { memo, forwardRef } from 'react';

import { Spacer } from '../Spacer';

import * as S from './styles';
import * as t from './types';

export type ButtonPropsType = t.ButtonPropsType;

export const Button = memo(forwardRef<HTMLButtonElement, t.ButtonPropsType>((
  {
    color = 'primary',
    size = 'l',
    type = 'button',
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    children,
    ...restProps
  },
  ref,
) => (
  <S.StyledButton
    ref={ref}
    color={color}
    size={size}
    type={type}
    {...restProps}
  >
    {(LeftIcon) ? (
      <>
        <LeftIcon color="white" size="l" />
        <Spacer size="xxs" />
      </>
    ) : null}

    {children}

    {(RightIcon) ? (
      <>
        <Spacer size="xxs" />
        <RightIcon color="white" size="l" />
      </>
    ) : null}
  </S.StyledButton>
)));

Button.displayName = 'Button';
