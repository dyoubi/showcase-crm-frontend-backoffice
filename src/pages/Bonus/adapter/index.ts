import mapValues from 'lodash/mapValues';
import ms from 'ms';
import { UseFormReturn } from 'react-hook-form';

import {
  AutoBonusParameters,
  EBonusType,
  GetBonusResponse,
  PostBonusPayload,
  RetributionBonusParameters,
} from '@/domains/casino/bonus';

import * as t from '../types';

import { initialisePeriod, initialiseRankOverrides } from './helpers';

import { getBonusCode } from '../logic.helper';

const convertInt = (v?: string) => (v ? parseInt(v, 10) : undefined);

type SetValue = UseFormReturn<t.BonusForm>['setValue'];

interface GetPostBonusParams {
  values: t.BonusForm;
  bonusId?: string;
  isSameAmountForAllRanks: boolean;
}

export const getPostBonusPayload = ({
  values,
  bonusId,
  isSameAmountForAllRanks,
}: GetPostBonusParams): PostBonusPayload => {
  const isReloadType = values.bonusType === 'reload';
  const isRetributionType = values.bonusType === 'retribution';
  const isAutoType = values.bonusType === 'auto';
  let payloadRetributionParameters: Partial<RetributionBonusParameters> = {};
  let payloadAutoParameters: Partial<AutoBonusParameters> = {};
  let amount: number | undefined;

  const rankOverrides = mapValues(
    (values?.rankOverrides || []).map((rO) => ({
      loosePercent: convertInt(rO?.hiddenBalancePercentage),
      amount: convertInt(rO?.amount),
      minimum: convertInt(rO?.hiddenBalanceMaximum),
      maximum: convertInt(rO?.hiddenBalanceMinimum),
    })),
  );

  if (isRetributionType) {
    payloadRetributionParameters = {
      ...payloadRetributionParameters,
      loosePercent: convertInt(values.hiddenBalancePercentage) || rankOverrides?.[0]?.loosePercent,
      minimum: convertInt(values.hiddenBalanceMinimum) || rankOverrides?.[0]?.minimum,
      maximum: convertInt(values.hiddenBalanceMaximum) || rankOverrides?.[0]?.maximum,
    };
  }

  if (!isRetributionType) {
    amount = convertInt(values.amount) || rankOverrides?.[0]?.amount;
  }

  if (isAutoType) {
    payloadAutoParameters = {
      amount: convertInt(values.amount),
      action: 'deposit',
      onetime: values.onetime,
      lifetime: ms(`${values.lifetimeValue}${values.lifetimeUnit}`),
      filters: Object.fromEntries((values.filtersArray || []).map((f) => [f.key, f.value])),
      computeMode: values.computeMode,
      useActionCurrency: values.useActionCurrency,
      limitations: (values.limitations?.[0] !== "") ? values.limitations : undefined,
      minimum: convertInt(values.hiddenBalanceMinimum),
      maximum: convertInt(values.hiddenBalanceMaximum),
    };
  }

  const finalParameters = isAutoType
    ? { ...payloadAutoParameters }
    : {
        ...payloadRetributionParameters,
        rankOverrides: isSameAmountForAllRanks ? undefined : rankOverrides,
        amount,
        period: isReloadType
          ? ms(`${values.bonusReloadInterval}${values.reloadIntervalUnity}`)
          : undefined,
      };

  return {
    id: (bonusId === EBonusType.NEW || !bonusId) ? undefined : bonusId,
    type: values.bonusType || 'retribution',
    // rating,
    endAt: values.endDate || '',
    startAt: values.startDate || '',
    code: values.code || getBonusCode(),
    name: values.name || '',
    description: values.description || '',
    parameters: finalParameters,
  };
};

export const initialFormDataFromBonus = (
  { setValue }: UseFormReturn<t.BonusForm>,
  bonus?: GetBonusResponse,
) => {
  if (!bonus) {
    return;
  }

  const period = bonus?.parameters?.period;
  const parameters = bonus?.parameters;

  setValue('amount', parameters?.amount?.toString());
  setValue('bonusType', bonus?.type);
  setValue('code', bonus.code || getBonusCode());
  setValue('description', bonus?.description);
  setValue('endDate', bonus?.endAt);
  setValue('name', bonus?.name);
  setValue('startDate', bonus?.startAt);

  if (bonus?.type === 'auto') {
    initialiseAutoBonus(bonus?.parameters, setValue);
  } else {
    initialiseRetributionBonus(bonus?.parameters, setValue);
    initialiseRankOverrides(bonus?.parameters?.rankOverrides, setValue);
  }
  if (period) {
    initialisePeriod(period, setValue);
  }
};

const initialiseRetributionBonus = (
  parameters: GetBonusResponse['parameters'],
  setValue: SetValue,
) => {
  if (parameters && 'loosePercent' in parameters) {
    setValue('hiddenBalancePercentage', parameters?.loosePercent?.toString());
  }

  if (parameters && 'minimum' in parameters) {
    setValue('hiddenBalanceMinimum', parameters?.minimum?.toString());
  }

  if (parameters && 'maximum' in parameters) {
    setValue('hiddenBalanceMaximum', parameters?.maximum?.toString());
  }
};

const initialiseAutoBonus = (parameters: GetBonusResponse['parameters'], setValue: SetValue) => {
  if (parameters && 'action' in parameters) {
    setValue('action', parameters?.action);
  }

  if (parameters && 'onetime' in parameters) {
    setValue('onetime', parameters?.onetime);
  }

  if (parameters && 'lifetime' in parameters) {
    const lifetime = parameters?.lifetime;
    setValue('lifetimeValue', lifetime ? Math.floor(lifetime / 1000 / 60) : undefined);
    setValue('lifetimeUnit', lifetime ? 'm' : undefined);
  }

  if (parameters && 'computeMode' in parameters) {
    setValue('computeMode', parameters?.computeMode);
  }

  if (parameters && 'useActionCurrency' in parameters) {
    setValue('useActionCurrency', parameters?.useActionCurrency);
  }

  if (parameters && 'limitations' in parameters) {
    setValue('limitations', parameters?.limitations || []);
  }

  if (parameters && 'minimum' in parameters) {
    setValue('hiddenBalanceMinimum', parameters?.minimum?.toString());
  }

  if (parameters && 'maximum' in parameters) {
    setValue('hiddenBalanceMaximum', parameters?.maximum?.toString());
  }

  if (parameters && 'filters' in parameters) {
    setValue(
      'filtersArray',
      Object.entries(parameters?.filters || {}).map(([key, value]) => ({
        key,
        value: value.toString(),
        id: Date.now().toString(),
      })),
    );
  }
};
