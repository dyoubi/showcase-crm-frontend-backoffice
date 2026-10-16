import { ReactNode } from 'react';

import { Spacer } from '@/shared/Spacer';
import { Flex } from '@/shared/Flex';
import * as S from './styles';

interface GroupMenuProps {
  title?: string;
  hide?: boolean;
  children?: ReactNode;
}

export const GroupMenu = ({ title, hide, children }: GroupMenuProps) => {
  return (
    <>
      {!hide && (
        <Flex flexDirection="column">
          <Spacer size="m" />
          <S.Container>{title}</S.Container>
        </Flex>
      )}
      {children}
    </>
  );
};
