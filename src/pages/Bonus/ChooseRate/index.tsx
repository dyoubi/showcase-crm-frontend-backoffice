import { Control } from 'react-hook-form';

import { CryptoIcon } from '@/components/CryptoIcon';
import { GroupInputs } from '@/components/GroupInputs';
import { SelectRHF } from '@/components/RHF/Select';
import { GetCryptosFiatRatesHistoryResponse } from '@/domains/currency';
import { Card } from '@/shared/Card';

import { getControlledInputProps } from '@/libs/react-hook-form/utils';

import { Flex } from '@/shared/Flex';
import { Spacer } from '@/shared/Spacer';

import { BonusForm } from '../types';
import { useFormatRatesToOptions } from './hooks';

interface ChooseRateProps {
  control: Control<BonusForm>;
  ratesHistory: GetCryptosFiatRatesHistoryResponse;
}

const rateSelectRules = {
  rules: { required: 'Required' },
} as const;

export const ChooseRate = ({ control, ratesHistory }: ChooseRateProps) => {
  const btcRatesOptions = useFormatRatesToOptions(ratesHistory?.BTC ?? []);
  const ethRatesOptions = useFormatRatesToOptions(ratesHistory?.ETH ?? []);
  const trxRatesOptions = useFormatRatesToOptions(ratesHistory?.TRX ?? []);

  return (
    <Card title="Rates :">
      <GroupInputs>
        <SelectRHF
          {...getControlledInputProps({ control }, 'btcRating', rateSelectRules)}
          label={
            <Flex flexDirection="row" alignItems="center">
              <CryptoIcon code="BTC" size="m" />
              <Spacer size="xxs" />
              <span>Bitcoin rates</span>
            </Flex>
          }
          options={btcRatesOptions}
        />
        <SelectRHF
          {...getControlledInputProps({ control }, 'ethRating', rateSelectRules)}
          label={
            <Flex flexDirection="row" alignItems="center">
              <CryptoIcon code="ETH" size="m" />
              <Spacer size="xxs" />
              <span>Ethereum rates</span>
            </Flex>
          }
          options={ethRatesOptions}
        />

        <SelectRHF
          {...getControlledInputProps({ control }, 'trxRating', rateSelectRules)}
          label={
            <Flex flexDirection="row" alignItems="center">
              <CryptoIcon code="TRX" size="m" />
              <Spacer size="xxs" />
              <span>Tron rate</span>
            </Flex>
          }
          options={trxRatesOptions}
        />
      </GroupInputs>
    </Card>
  );
};
