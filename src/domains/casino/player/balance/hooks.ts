import { useMutation, useQuery, UseQueryOptions } from 'react-query';

import { QUERY_KEYS } from '@/libs/react-query';

import { getPlayerBalances, getBalanceOperations, postBalanceOperation } from './api';
import * as t from './types';

export const useGetPlayerBalances = (
  playerId?: string,
  options?: UseQueryOptions<t.GetPlayerBalances | undefined>,
) => {
  return useQuery<t.GetPlayerBalances | undefined>(
    [QUERY_KEYS.GET_PLAYER_BALANCES, playerId],
    () => getPlayerBalances(playerId || ''),
    options,
  );
};

interface Params {
  options?: UseQueryOptions<t.GetBalanceOperations | undefined>;
  operationTypesToExclude?: t.OperationType[];
}
export const useGetBalanceOperations = (
  balanceId: string,
  { options, operationTypesToExclude }: Params = {},
) => {
  return useQuery<t.GetBalanceOperations | undefined>(
    [QUERY_KEYS.GET_BALANCE_OPERATIONS, balanceId],
    () => getBalanceOperations(balanceId || '', operationTypesToExclude),
    options,
  );
};

export const usePostBalanceOperation = () => {
  return useMutation(async (payload: t.PostBalanceOperationPayload) =>
    postBalanceOperation(payload),
  );
};
