import { useQuery } from 'react-query';
import { QUERY_KEYS } from '@/libs/react-query';

import { useCurrentCasino } from '../../hooks';

import { getPlayerDailyActivity } from './api';

import * as t from './types';

export const useGetDailyActivity = (playerId?: string, filter?: t.GetDailyActivityFilter) => {
  const { key: casinoKey } = useCurrentCasino();

  return useQuery<t.GetDailyActivityResponse | undefined>(
    [QUERY_KEYS.GET_PLAYER_DAILY_ACTIVITY, playerId, filter],
    () => getPlayerDailyActivity(playerId || '', casinoKey, filter),
  );
};
