import { memo, forwardRef } from 'react';

import * as S from './styles';
import * as t from './types';

export const Badge = memo(
  forwardRef<HTMLButtonElement, t.BadgePropsType>(
    ({ color = 'primary', children, ...restProps }, ref) => (
      <S.Container color={color} {...restProps} ref={ref}>
        {children}
      </S.Container>
    ),
  ),
);

Badge.displayName = 'Badge';
