import { memo } from 'react';

import { cryptosIcons } from '@/components/CryptoIcon';
import { ToolTipPriceFiat } from '@/components/ToolTipPriceFiat';
import { useGetPlayerBalances } from '@/domains/casino/player/balance';
import { Flex } from '@/shared/Flex';

import * as Icons from '@/shared/Icons';

import * as S from './styles';

interface KPIProps {
  playerId?: string;
}
export const KPIs = memo(({ playerId }: KPIProps) => {
  const { data } = useGetPlayerBalances(playerId);

  return (
    <S.KPIsContainer>
      <Flex flexDirection="row" alignItems="center" justifyContent="center">
        {data?.map((balance) => (
          <S.CardKPI
            key={balance.id}
            kpiName={`${balance?.coin} balance`}
            color="primary"
            icon={cryptosIcons[balance?.coin]}
            value={
              <ToolTipPriceFiat displayCurrencyIcon={false} currency={balance?.coin}>
                {balance?.value}
              </ToolTipPriceFiat>
            }
          />
        ))}
      </Flex>
      <Flex flexDirection="row" justifyContent="center">
        <S.CardKPI kpiName="Deposited" color="primary" icon={Icons.IconDeposit} value="4367$" />
        <S.CardKPI kpiName="Withdraw" color="primary" icon={Icons.IconWithdraw} value="4367$" />
        <S.CardKPI kpiName="Net loss" color="success" icon={Icons.IconDiscount} value="300$" />
        <S.CardKPI kpiName="Wagered" color="danger" icon={Icons.IconBet} value="9$" />
      </Flex>
    </S.KPIsContainer>
  );
});
