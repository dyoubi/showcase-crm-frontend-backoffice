import { memo, ReactNode } from 'react';

import * as S from './styles';

interface SectionTitleProps {
  children: ReactNode;
}

export const SectionTitle = memo(({ children }: SectionTitleProps) => (
  <S.Container>
    <h1>{children}</h1>
    <S.Divider />
  </S.Container>
));
