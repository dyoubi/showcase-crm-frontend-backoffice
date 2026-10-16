import ms from 'ms';
import { UseFormReturn } from 'react-hook-form';

import { GetBonusResponse } from '@/domains/casino/bonus';
import * as t from '../types';

type SetValue = UseFormReturn<t.BonusForm>['setValue'];

// this helper is used for initialise bonusReloadInterval & reloadIntervalUnity inputs
export const initialisePeriod = (period: number, setValue: SetValue) => {
  const oneDayInMs = ms('1d');
  const oneHourInMs = ms('1h');
  const oneMinuteInMs = ms('1m');

  if (period % oneDayInMs === 0) {
    setValue('bonusReloadInterval', (period / oneDayInMs).toString());
    setValue('reloadIntervalUnity', 'd');
    return;
  }

  if (period % oneHourInMs === 0) {
    setValue('bonusReloadInterval', (period / oneHourInMs).toString());
    setValue('reloadIntervalUnity', 'h');
    return;
  }

  setValue('bonusReloadInterval', (period / oneMinuteInMs).toString());
  setValue('reloadIntervalUnity', 'm');
};

// this helper is used for initialise bonusReloadInterval & reloadIntervalUnity inputs
export const initialiseRankOverrides = (
  rankOverrides: GetBonusResponse['parameters']['rankOverrides'],
  setValue: SetValue,
) => {
  if (!rankOverrides) {
    return;
  }

  const newOverrides: Array<t.RankOverrideItem> = [];

  const rankOverridesKeys = Object.keys(rankOverrides || {});

  rankOverridesKeys.forEach((key) => {
    const currentOveride = rankOverrides?.[key];

    newOverrides[parseInt(key, 10)] = {
      amount: currentOveride?.amount?.toString(),
      hiddenBalancePercentage: currentOveride?.loosePercent?.toString(),
      hiddenBalanceMinimum: currentOveride?.minimum?.toString(),
      hiddenBalanceMaximum: currentOveride?.maximum?.toString(),
    };
  });

  setValue('rankOverrides', newOverrides);
};
