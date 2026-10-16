import { AxiosResponse } from 'axios';

import { Withdrawal } from '@/domains/finance/withdrawals';
import { encodeFilter } from '@/utils';

import { casinoApiRequest, financeApiRequest, operatorApiRequest } from '../../../api';

import { getPlayer } from '../api';

import * as t from './types';
import { Operation, OperationCategoryEnum } from '../balance';
import { Bonus } from '../../bonus';

export const getPlayerDailyActivity = async (
  playerId: string,
  casinoKey: string,
  filter?: t.GetDailyActivityFilter,
): Promise<t.GetDailyActivityResponse | undefined>  => {
  const player = await getPlayer(playerId);

  if (!player) {
    return undefined;
  }

  const { data: dailyActivities } = await operatorApiRequest.get<t.GetDailyActivityResponse>(
    `/accounts/${player.accountId}/activity?query=${encodeFilter(filter)}`,
  );

  const bonusIds: string[] = [];
  const withdrawalIds: string[] = [];
  const operationByExternalId: Record<NonNullable<Operation['externalId']>, Operation> = {};

  dailyActivities.data.map(operation => {
    if (!operation.externalId) {
      return null;
    }

    if (operation.category === OperationCategoryEnum.BONUS) {
      bonusIds.push(operation.externalId);
    }

    if (operation.category.includes(OperationCategoryEnum.WITHDRAWAL)) {
      withdrawalIds.push(operation.externalId);
    }

    operationByExternalId[operation.externalId] = operation;
    return null;
  });

  const dataPromises = [];
  if (bonusIds.length) {
    const bonusFilter = {
      where: {
        id: { inq: bonusIds },
      },
    };

    dataPromises.push(casinoApiRequest.get<Bonus[]>(`/bonuses?filter=${encodeFilter(bonusFilter)}`));
  } else {
    dataPromises.push(Promise.resolve({ data: [] }));
  }

  if (withdrawalIds.length) {
    const withdrawalFilter = {
      where: {
        id: { inq: withdrawalIds },
      }
    };

    dataPromises.push(financeApiRequest.get<Withdrawal[]>(
      `/cashier/${casinoKey}/withdrawals?query=${encodeFilter(withdrawalFilter)}`
    ));
  } else {
    dataPromises.push(Promise.resolve({ data: [] }));
  }

  const [{ data: bonusData }, { data: withdrawalData }] = await Promise.all(dataPromises as [
    Promise<AxiosResponse<Bonus[]>>,
    Promise<AxiosResponse<Withdrawal[]>>,
  ]);

  const bonusById: Record<Bonus['id'], Bonus> = {};
  const withdrawalById: Record<Withdrawal['id'], Withdrawal> = {};

  bonusData.forEach(bonus => {
    if (!bonusById[bonus.id]) {
      bonusById[bonus.id] = bonus;
    }
  });

  withdrawalData.forEach(withdrawal => {
    if (!withdrawalById[withdrawal.id]) {
      withdrawalById[withdrawal.id] = withdrawal;
    }
  });

  const aggregatedDailyActivities = dailyActivities.data.map(operation => {
    if (bonusById[operation.externalId]) {
      return {
        ...operation,
        bonus: bonusById[operation.externalId],
      };
    }

    if (withdrawalById[operation.externalId]) {
      return {
        ...operation,
        withdrawal: withdrawalById[operation.externalId],
      };
    }

    return operation;
  });

  return {
    data: aggregatedDailyActivities,
    count: dailyActivities.count,
  };
};
