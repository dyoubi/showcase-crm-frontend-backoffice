import styled from '@emotion/styled';

import { Button as ButtonRaw } from '../Button';
import * as c from './constants';
import * as t from './types';

export const Root = styled.div<t.InputPropsType>(({ width, flex, disabled }) => ({
  width,
  flex,
  '*': {
    cursor: disabled ? 'not-allowed' : undefined,
  },
}));

export const Container = styled.div<t.InputPropsType>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  height: theme.sizes.input.height,
}));

export const InputContainer = styled.div<{
  color: t.InputPropsType['color'];
  withButton: boolean;
  style?: React.CSSProperties;
}>(({ theme, color = 'primary', withButton, style }) => ({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  flexDirection: 'row',
  height: '100%',
  width: '100%',
  border: `1px solid ${theme.colors[color].main}`,
  overflow: 'visible',
  boxSizing: 'border-box',
  // when the button is on the right we must display the right border
  borderRight: withButton ? 'none' : undefined,
  borderRadius: withButton ? '6px 0px 0px 6px' : 6,
  [`.${c.CLASSNAMES.ICON_LEFT}`]: {
    marginLeft: theme.spaces.margin.s,
    marginRight: theme.spaces.margin.xxs,
  },
  [`.${c.CLASSNAMES.ICON_RIGHT}`]: {
    marginRight: theme.spaces.margin.s,
    marginLeft: theme.spaces.margin.xxs,
  },
  ...style,
}));

export const Input = styled.input(({ theme }) => ({
  height: '100%',
  flex: 1,
  backgroundColor: 'transparent',
  color: theme.typography.colors.primary,
  fontSize: 14,
  paddingLeft: 8,
  paddingRight: 8,
  border: 'none',
  '&:focus': {
    outline: 'none',
  },
}));

export const Button = styled(ButtonRaw)({
  borderRadius: '0 6px 6px 0',
  height: '100%',
});
