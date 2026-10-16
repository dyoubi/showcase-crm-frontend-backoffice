import React, { memo } from 'react';

import * as S from './styles';
import { IconLoader } from '../Icons';

interface LoadingOverlayProps {
  dataTestId?: string;
}

export const LoadingOverlay = memo(({ dataTestId }: LoadingOverlayProps) => (
  <S.LoadingOverlay justifyContent="center" alignItems="center" data-testid={dataTestId}>
    <IconLoader size="xxl" />
  </S.LoadingOverlay>
));
