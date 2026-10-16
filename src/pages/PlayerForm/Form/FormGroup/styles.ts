import { Flex } from '@/shared/Flex';
import styled from '@emotion/styled';

type FormGroupContainerProps = {
  gridArea?: string;
};

export const FormGroupContainer = styled(Flex)<FormGroupContainerProps>(({ gridArea, theme }) => ({
  minHeight: 222,
  width: '100%',

  flex: 1,
  borderRadius: 8,
  border: `1px solid ${theme.components.formGroup.border.disabled}`,
  gridArea,
}));

export const FormGroupHeader = styled.div(({ theme }) => ({
  padding: '10px 23px',
  background: theme.components.formGroup.header,
  color: theme.components.formGroup.title,
  borderRadius: 8,
  fontSize: 18,
  fontWeight: 'bold',
}));

export const InputContainer = styled(Flex)({
  padding: 15,
});
