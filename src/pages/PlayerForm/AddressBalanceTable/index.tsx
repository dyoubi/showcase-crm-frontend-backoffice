/* eslint-disable jsx-a11y/control-has-associated-label */
import { memo } from 'react';

import { useGetPlayerAddresses } from '@/domains/casino/player/deposits';
import { useGetPlayerBalances } from '@/domains/casino/player/balance';

import { CryptoIcon } from '@/components/CryptoIcon';
import { ToolTipPriceFiat } from '@/components/ToolTipPriceFiat';

import { Card } from '@/shared/Card';
import { CopyToClipboard } from '@/shared/CopyToClipBoard';
import { Flex } from '@/shared/Flex';
import * as Icons from '@/shared/Icons';
import { Table } from '@/shared/Table';

import { CURRENCY_NAMES_BY_SYMBOLS } from './constants';
import * as S from './styles';
import * as t from './types';


interface AddressBalanceProps {
  playerId?: string;
}

export const AddressBalanceTable = memo(({ playerId }: AddressBalanceProps) => {
  const {
    data: dataAddresses,
    isLoading: isLoadingAddresses,
    isError: isErrorAddresses,
  } = useGetPlayerAddresses(playerId);

  const {
    data: dataBalances,
    isLoading: isLoadingBalances,
    isError: isErrorBalances,
  } = useGetPlayerBalances(playerId);

  const getPlayerBalancesData = (props: t.GetAddressBalanceData): t.AddressBalanceData => {
    const { addresses: playerAddresses, balances: playerBalances } = props;

    const result: t.AddressBalanceData = {
      address: [],
      currencyCodes: [],
      currentBalance: [],
      hiddenBalance: [],
      totalDeposited: [],
      totalWithdrawn: [],
    };

    playerBalances.forEach(balance => {
      result.currencyCodes.push(
        <th key={balance.id}>
          <S.DataContainer>
            <CryptoIcon code={balance.coin} />

            <span>
              {CURRENCY_NAMES_BY_SYMBOLS[balance.coin]}
            </span>
          </S.DataContainer>
        </th>
      );

      const currentAddress = playerAddresses.find(item => item.currency === balance.coin);
      result.address.push((currentAddress) ? (
        <td key={balance.id}>
            <S.DataContainer>
              <S.PlayerAddress>{currentAddress.info.address}</S.PlayerAddress>

              <CopyToClipboard text={currentAddress.info.address} />
            </S.DataContainer>
          </td>
      ) : (
        <td key="emptyData"></td>
      ));

      result.currentBalance.push(
        <td key={balance.id}>
          <S.DataContainer justifyContent="flex-end">
            <ToolTipPriceFiat currency={balance.coin} displayCurrencyIcon={false}>
              {balance.value}
            </ToolTipPriceFiat>
          </S.DataContainer>
        </td>
      );

      result.hiddenBalance.push(
        <td key={balance.id}>
          <S.DataContainer justifyContent="flex-end">
            <ToolTipPriceFiat currency={balance.coin} displayCurrencyIcon={false}>
              {balance.hiddenBalance}
            </ToolTipPriceFiat>
          </S.DataContainer>
        </td>
      );

      result.totalDeposited.push(
        <td key={balance.id}>
          <S.DataContainer justifyContent="flex-end">
            <ToolTipPriceFiat currency={balance.coin} displayCurrencyIcon={false}>
              {balance.totalDeposited}
            </ToolTipPriceFiat>
          </S.DataContainer>
        </td>
      );

      result.totalWithdrawn.push(
        <td key={balance.id}>
          <S.DataContainer justifyContent="flex-end">
            <ToolTipPriceFiat currency={balance.coin} displayCurrencyIcon={false}>
              {balance.totalWithdrawn}
            </ToolTipPriceFiat>
          </S.DataContainer>
        </td>
      );

    });

    return result;
  };

  const render = () => {
    if (!playerId) {
      return null;
    }

    if (
      isLoadingAddresses
      || isLoadingBalances
    ) {
      return (
        <Flex justifyContent="center">
          <Icons.IconLoader color="currentColor" size="xl" />
        </Flex>
      );
    }

    if (
      isErrorAddresses
      || isErrorBalances
    ) {
      return <p>Error loading user balances data. Please try refreshing the page.</p>;
    }

    if (
      !dataAddresses
      || !dataBalances?.length
    ) {
      return <p>No user balances data available.</p>;
    }

    const data = getPlayerBalancesData({
      addresses: dataAddresses,
      balances: dataBalances
    });

    return (
      <Table innerBorder overflow zebra>
        <thead>
          <tr>
            <th key="emptyData"></th>

            {data.currencyCodes}
          </tr>
        </thead>

        <tbody>
          <tr key="depositAddress">
            <th>
              <S.DataContainer>
                <Icons.IconWallet />

                Deposit Address
              </S.DataContainer>
            </th>

            {data.address}
          </tr>

          <tr key="balanceAmount">
            <th>
              <S.DataContainer>
                <Icons.IconCash />

                Current Balance
              </S.DataContainer>
            </th>

            {data.currentBalance}
          </tr>

          <tr key="hiddenBalance">
            <th>
              <S.DataContainer>
                <Icons.IconEyeClosed />

                Hidden Balance
              </S.DataContainer>
            </th>

            {data.hiddenBalance}
          </tr>

          <tr key="totalDeposited">
            <th>
              <S.DataContainer>
                <Icons.IconDeposit />
                Total Deposited
              </S.DataContainer>
            </th>

            {data.totalDeposited}
          </tr>

          <tr key="totalWithdrawn">
            <th>
              <S.DataContainer>
                <Icons.IconWithdraw />

                Total Withdrawn
              </S.DataContainer>
            </th>

            {data.totalWithdrawn}
          </tr>

        </tbody>
      </Table>
    );
  };

  return (
    <S.Container>
      <Card title="Player Balances">
        {render()}
      </Card>
    </S.Container>
  );
});
