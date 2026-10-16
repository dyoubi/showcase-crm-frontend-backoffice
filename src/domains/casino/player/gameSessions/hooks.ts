import { useQuery } from 'react-query';

import { QUERY_KEYS } from '@/libs/react-query';

import { getGameSessions, getGroupedGameSessions } from './api';

import * as t from './types';

export const useGetGameSessions = (playerId?: string, filter?: t.GetSessionsFilter) => {
  return useQuery([QUERY_KEYS.GET_LOGIN_SESSIONS, playerId, filter],
    () => getGameSessions(playerId || '', filter),
  );
};

export const useGetGroupedGameSessions = (playerId?: string, filter?: t.GetSessionsFilter) => {
  const newFilter = { ...filter, grouped: true };
  return useQuery([QUERY_KEYS.GET_LOGIN_SESSIONS, playerId, newFilter],
    () => getGroupedGameSessions(playerId || '', newFilter ),
  );
};
