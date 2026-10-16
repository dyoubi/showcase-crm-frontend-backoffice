import React, { memo, ReactNode } from 'react';

import { Colors } from '@emotion/react';

import { IconFC } from '../Icons/types';
import * as S from './styles';
import * as c from './constants';

type NativeDivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface CardKPIProps extends NativeDivProps {
  kpiName?: string | ReactNode;
  value?: number | string | ReactNode;
  icon?: IconFC;
  color?: Colors;
}

export const CardKPI = memo(
  ({ value, kpiName, icon: Icon, color = 'success', ...restProps }: CardKPIProps) => (
    <S.Card {...restProps} ref={undefined}>
      {Icon && <Icon size="xl" className={c.CLASSNAMES.KPI_ICON} />}
      <S.Content>
        {kpiName && <S.KPIName>{kpiName}</S.KPIName>}
        {value && <S.KPIValue color={color}>{value}</S.KPIValue>}
      </S.Content>
    </S.Card>
  ),
);

CardKPI.displayName = 'CardKPI';
