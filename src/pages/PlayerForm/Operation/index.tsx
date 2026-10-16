import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useGetPlayerBalances } from '@/domains/casino/player/balance';
import { useConvertCurrencyInFiat } from '@/domains/currency';

import { InputPrice } from '@/components/InputPrice';
import { SelectRHF } from '@/components/RHF/Select';
import { Flex } from '@/shared/Flex';
import { Spacer } from '@/shared/Spacer';

import { IconAddPlus, IconWallet } from '@/shared/Icons';
import { Card } from '@/shared/Card';
import { Tabs } from '@/shared/Tabs';
import { Button } from '@/shared/Button';

import { getControlledInputProps, getInputProps } from '@/libs/react-hook-form/utils';
import { OperationsList } from './OperationsList';
import { useHandleForm } from './hooks';
import { validationSchema } from './validationSchema';
import * as t from './types';
import * as c from './constants';

interface OperationProps {
  playerId?: string;
}

export const Operation = ({ playerId }: OperationProps) => {
  const { data: balances } = useGetPlayerBalances(playerId);
  const [selectedTab, setSelectedTab] = useState('');
  const formData = useForm<t.AddOperationForm>({
    resolver: yupResolver(validationSchema),
  });
  const convertInFiat = useConvertCurrencyInFiat();

  const tabs = useMemo(
    () =>
      (balances || []).map((balance) => ({
        tabId: balance.id,
        icon: c.icons?.[balance.coin],
        title: `${balance.coin} (${convertInFiat(balance.value, balance.coin).amountInFiat})`,
        content: <OperationsList balanceId={balance.id} />,
      })),
    [balances, convertInFiat],
  );
  const optionsList = useMemo(
    () =>
      (balances || []).map((balance) => ({
        value: balance.id,
        label: balance.coin,
      })),
    [balances],
  );

  const { handleSubmit } = formData;
  return (
    <Flex>
      <Card icon={IconWallet} title="Wallets activities" style={{ flex: 1 }}>
        <Tabs
          selectedTabId={selectedTab || tabs?.[0]?.tabId}
          tabs={tabs}
          onSelect={setSelectedTab}
        />
      </Card>
      <Spacer size="xs" />
      <Card icon={IconAddPlus} title="Add operations" style={{ width: 420 }}>
        <form onSubmit={handleSubmit(useHandleForm())}>
          <SelectRHF
            label="Operation type"
            {...getControlledInputProps(formData, 'operationType')}
            options={c.OperationCategoryOptions}
          />
          <Spacer size="xs" />
          <InputPrice {...getInputProps(formData, 'amount')} label="Amount" />
          <Spacer size="xs" />
          <SelectRHF
            label="Balance"
            options={optionsList}
            {...getControlledInputProps(formData, 'balanceId')}
          />
          <Spacer size="m" />
          <Button color="success" type="submit">
            Submit
          </Button>
        </form>
      </Card>
    </Flex>
  );
};
