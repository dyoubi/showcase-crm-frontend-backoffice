import styled from '@emotion/styled';
import { RadioInputProps } from './types';

export const Fieldset = styled.fieldset(() => ({
  border: 0,
  padding: 0,
}));

export const Label = styled.label(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: 14,

  'input:checked ~ span': {
    borderColor: 'black',
    fontWeight: 'bold',
  },
}));

export const RadioInput = styled.input<Omit<RadioInputProps, 'label'>>(() => ({
  accentColor: '#3b82f6'
}));
