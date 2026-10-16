import styled from '@emotion/styled';

export type NativeInputProps = React.InputHTMLAttributes<HTMLLabelElement>;

export const Label = styled.label<NativeInputProps>(({ theme }) => ({
  marginBottom: theme.spaces.margin.xxs,
  display: 'block',
  fontSize: 12,
}));
