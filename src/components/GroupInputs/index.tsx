import { ReactNode } from 'react';

import * as S from './styles';

export const GroupInputs = ({ children }: { children?: ReactNode }) => {

  return (
    <S.Container>
      {children}
    </S.Container>
  );
};
