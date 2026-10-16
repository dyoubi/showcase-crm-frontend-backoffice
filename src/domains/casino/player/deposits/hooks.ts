import { useQuery, UseQueryOptions } from 'react-query';
import { QUERY_KEYS } from '@/libs/react-query';

import { useCurrentCasino } from '../../hooks';
import { getPlayerAddresses } from './api';
import * as t from './types';

export const useGetPlayerAddresses = (
  playerId?: string,
  options?: UseQueryOptions<t.GetPlayerAddresses| null | undefined>,
) => {
  const { key: casinoKey } = useCurrentCasino();

  return useQuery<t.GetPlayerAddresses | null | undefined>(
    [QUERY_KEYS.GET_PLAYER_ADDRESSES, casinoKey, playerId],
    () => getPlayerAddresses(casinoKey, playerId),
    options,
  );
};
