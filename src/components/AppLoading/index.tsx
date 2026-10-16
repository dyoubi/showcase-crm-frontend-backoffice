import { IconLoader } from '@/shared/Icons';
import { useAppTheme } from '@/hooks';

import * as S from './styles';

export const AppLoading = () => (
  <S.Container onClick={useAppTheme().toggle}>
    <IconLoader color="currentColor" size="xxl" />
  </S.Container>
);
