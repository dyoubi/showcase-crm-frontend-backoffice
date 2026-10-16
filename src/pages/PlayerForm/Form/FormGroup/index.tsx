import React from 'react';

import { FormGroupContainer, FormGroupHeader, InputContainer } from './styles';

export interface FormGroupProps {
  title?: string;
  children?: React.ReactNode;
  gridArea?: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({ title, children, gridArea }) => {
  return (
    <FormGroupContainer flexDirection="column" justifyContent="flex-start" gridArea={gridArea}>
      <FormGroupHeader>{title}</FormGroupHeader>
      <InputContainer flexWrap="wrap" gap={18} justifyContent="flex-start" flex={1}>
        {children}
      </InputContainer>
    </FormGroupContainer>
  );
};
