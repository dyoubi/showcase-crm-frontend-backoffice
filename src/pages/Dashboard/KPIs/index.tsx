import { memo } from 'react';

import { CardKPI } from '@/shared/CardKPI';
import * as Icons from '@/shared/Icons';

import * as S from './styles';

export const KPIs = memo(() => {
  return (
    <S.KPIsContainer>
      <CardKPI kpiName="New Users" icon={Icons.IconAddPlus} value="+2092" />
      <CardKPI color="warning" kpiName="New Users" icon={Icons.IconDiscount} value={189} />
      <CardKPI kpiName="Chats handled" icon={Icons.IconChat} value="+189" />
      <CardKPI color="warning" kpiName="Live" icon={Icons.IconLive} value={189} />
      <CardKPI color="danger" kpiName="Wining rate" icon={Icons.IconDice} value="-0.27%" />
    </S.KPIsContainer>
  );
});
