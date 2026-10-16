import styled from '@emotion/styled';
import { Theme } from '@emotion/react';


type SpacerProps = {
  size?: keyof Theme['spaces']['margin'];
};

export const Spacer = styled.div<SpacerProps>`
  width: ${({ theme, size = 'l' }) => theme.spaces.margin[size]};
  height: ${({ theme, size = 'l' }) => theme.spaces.margin[size]};
`;