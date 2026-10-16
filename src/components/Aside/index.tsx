import { Flex } from '@/shared/Flex';

import * as S from './styles';
import * as t from './types';


export const Aside = (props: t.AsideProps) => {
  const { children, ...rest } = props;

  return (
    <S.Container {...rest}>
      <Flex flexDirection="column" gap={16}>
        {children}
      </Flex>
    </S.Container>
  );
};
