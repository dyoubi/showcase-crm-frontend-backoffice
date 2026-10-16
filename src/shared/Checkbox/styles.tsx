import styled from '@emotion/styled';
import { Colors } from '@emotion/react';

import { EmptyBox } from './visuals/EmptyBox';
import { Check } from './visuals/Check';

import { Label } from '../Label';

const CHECKBOX_SIZE = 16;

/** We leverage the fact that clicking on a label is like clicking on the checkbox to make the custom checkbox work */
export const Container = styled.div({
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',

  /* Visually check if the hidden input is checked. This only works because the Check component is right after the hidden input */
  'input:checked + svg': {
    display: 'inherit',
  },

  /* Visually uncheck if the hidden input is checked. This only works because the UnCheck component is right after the CheckComponent */
  'input:checked + svg + svg': {
    display: 'none',
  },
});

/** The hidden checkbox */
export const HiddenCheckbox = styled.input({
  position: 'absolute',
  opacity: 0,
  zIndex: 1,
});

/** The visual fake checkbox */
export const EmptyCheckbox = styled(EmptyBox)<{
  disabled?: boolean;
  color: Colors;
}>(({ theme, color }) => ({
  width: CHECKBOX_SIZE,
  height: CHECKBOX_SIZE,
  transition: 'fill 150ms ease-in-out',
  color: theme.colors[color].main,
  '&:hover': {
    fill: theme.colors[color].main,
  },
}));

/** The visual tick inside the checkbox */
export const Tick = styled(Check)<{
  disabled?: boolean;
  color: Colors;
}>(({ theme, color }) => ({
  width: CHECKBOX_SIZE,
  height: CHECKBOX_SIZE,

  transition: 'opacity 150ms ease-in-out',
  color: theme.colors[color].main,
  '&:hover': {
    fill: theme.colors[color].main,
  },
  /* Hide the Check by default */
  display: 'none',
}));

export const CheckLabel = styled(Label)({ margin: 0 });
