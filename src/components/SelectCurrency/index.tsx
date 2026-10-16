import { useEffect, useState } from 'react';

import { Select } from '@/shared/Select';
// import * as c from './constants';
import { useGetCurrencyFromFinance } from '@/domains/casino/currency';
import { GetCurrencyFromFinanceResponse } from '@/pages/CurrencySettings/AddNewCurrencyForm/types';
import WarningMessage from '@/pages/CurrencySettings/WarningMessage';
import { Flex } from '@/shared/Flex';
import { IconBitcoin, IconEthereum, IconTron } from '@/shared/Icons';
import { Spacer } from '@/shared/Spacer';

interface SelectCurrencyProps {
  currency: string;
  onChange: (newCurrency: string) => void;
  width?: string | number;
  className?: string;
}

export const SelectCurrencyToAdd = ({
  currency,
  onChange,
  width,
  className,
}: SelectCurrencyProps) => {
  const { data: currencyDataFromFinance } = useGetCurrencyFromFinance();
  const [updatedCurrencyDataFromFinance, setUpdatedCurrencyDataFromFinance] =
    useState<GetCurrencyFromFinanceResponse>();

  useEffect(() => {
    setUpdatedCurrencyDataFromFinance(currencyDataFromFinance);
  }, [currencyDataFromFinance]);

  const mappedData = updatedCurrencyDataFromFinance?.map((Coin) => ({
    value: Coin.iso,
    label: (
      <Flex alignItems="center">
        {Coin.iso === 'BTC' && <IconBitcoin />}
        {Coin.iso === 'ETH' && <IconEthereum />}
        {Coin.iso === 'TRX' && <IconTron />}
        <Spacer size="xs" />
        <span>{Coin.name}</span>
        <span style={{ paddingLeft: 70, paddingBottom: 2 }}>
          {Coin.psp === '' ? <WarningMessage message="NA" /> : null}
        </span>
      </Flex>
    ),
  }));
  const value = mappedData?.find((option) => option.value === currency);
  const isSearchable = false;
  return (
    <Select
      className={className}
      label="Add new currency"
      value={value}
      isSearchable={isSearchable}
      onChange={(newValue) =>
        newValue && onChange(newValue.value.toString() as SelectCurrencyProps['currency'])
      }
      options={mappedData}
      width={width || 240}
    />
  );
};

export const useCurrencyState = () => {
  const [currency, onChange] = useState<string>('');
  return { currency, onChange };
};
