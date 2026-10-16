import { memo, useEffect, useState } from 'react';

import { Page } from '@/components/Page';
import {
  GetCurrencyFromCasinoResponse,
  useGetCurrencyFromCasino,
} from '@/domains/casino/currency';
import { Card } from '@/shared/Card';
import { CardKPI } from '@/shared/CardKPI';
import { Checkbox } from '@/shared/Checkbox';
import { Flex } from '@/shared/Flex';
import { IconTrash } from '@/shared/Icons';
import { IconFC } from '@/shared/Icons/types';
import { Spacer } from '@/shared/Spacer';

import { AddNewCurrencyForm } from './AddNewCurrencyForm';
import * as c from './constants';
import { useSaveCurrencySettings } from './hooks';
import WarningMessage from './WarningMessage';

export const CurrencySettings = memo(() => {
  const { data: currencyDataFromCasino, refetch: reFetchCurrencySettingsFromCasino } =
    useGetCurrencyFromCasino();
  const [updatedCurrencyDataFromCasino, setUpdatedCurrencyDataFromCasino] =
    useState<GetCurrencyFromCasinoResponse>();
  const { addNewCurrency, deleteCurrency, patchCurrencyData } = useSaveCurrencySettings(
    reFetchCurrencySettingsFromCasino,
  );

  useEffect(() => {
    setUpdatedCurrencyDataFromCasino(currencyDataFromCasino);
  }, [currencyDataFromCasino]);

  return (
    <Page breadcrumbs={[{ content: 'Currency page' }]} headTitle="Currency page">
      <Card title="Currency settings">
        <Flex flexDirection="column" alignItems="flex-start" justifyContent="center">
          {updatedCurrencyDataFromCasino?.map((currency) => (
            <Flex key={currency.id} flexDirection="row" alignItems="center" justifyContent="center">
              <Flex flexDirection="column" alignItems="baseline">
                <Flex flexDirection="row" alignItems="center">
                  <IconTrash
                    style={{ cursor: 'pointer' }}
                    onClick={() => deleteCurrency(currency.id)}
                  />
                  <Spacer size="s" />
                  <CardKPI
                    kpiName={currency.name}
                    color="primary"
                    icon={(c.icons as Record<string, IconFC>)[currency.iso]}
                  />
                  <Spacer size="s" />
                  <Checkbox
                    style={{ cursor: 'pointer' }}
                    checked={currency.activate}
                    onChange={() => patchCurrencyData(currency)}
                  />
                  <Spacer size="xxl" />
                </Flex>
                <Spacer size="s" />
              </Flex>
              <span style={{ paddingLeft: 70, paddingBottom: 20 }}>
                {currency.provider === '' ? (
                  <WarningMessage message="Provider not available" />
                ) : null}
              </span>
            </Flex>
          ))}
          <Spacer size="xl" />
          <AddNewCurrencyForm onFormSubmitted={addNewCurrency} />
        </Flex>
      </Card>
      <Spacer size="xl" />
    </Page>
  );
});
