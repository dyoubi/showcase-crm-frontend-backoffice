import { encodeFilter } from '@/utils';

import { casinoApiRequest } from '../../../api';
import { ECryptoCodes } from '../../../currency';

import * as t from './types';

export const getPlayerBalances = async (playerId: string) => {
  const { data = [] } = await casinoApiRequest.get<t.GetPlayerBalances>(
    `/players/${playerId}/balances`,
  );

  return data.filter((balance) => Object.values(ECryptoCodes).includes(balance?.coin as ECryptoCodes));
};

export const getBalanceOperations = async (
  balanceId: string,
  operationTypesToExclude?: t.OperationType[],
) => {
  const filter = {
    order: 'created DESC',
    where: {
      balanceId,
      type: operationTypesToExclude ? { nin: operationTypesToExclude } : undefined,
    },
  } as const;

  const { data } = await casinoApiRequest.get<t.GetBalanceOperations>(
    `/operations?filter=${encodeFilter(filter)}`,
  );

  return data;
};

export const postBalanceOperation = async (payload: t.PostBalanceOperationPayload) => {
  const { data } = await casinoApiRequest.post<t.PostBalanceOperationPayload>(
    '/operations',
    payload,
  );

  return data;
};
