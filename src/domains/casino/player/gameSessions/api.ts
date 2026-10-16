import { operatorApiRequest } from '@/domains/api';
import { encodeFilter } from '@/utils';

import { getPlayer } from '../api';
import { Session } from '../balance';

import * as t from './types';

export const getGameSessions = async (playerId?: string, filter?: t.GetSessionsFilter) => {
  if (!playerId) {
    return null;
  }

  const player = await getPlayer(playerId);

  if (!player || !player.accountId) {
    return null;
  }

  const query: t.GetSessionsFilter = {
    details: true,

    ...(filter || {}),
  } as const;

  const { data } = await operatorApiRequest.get<Session[]>(
    `/accounts/${player.accountId}/game-sessions?query=${encodeFilter(query)}`,
  );

  return data
}

export const getGroupedGameSessions = async (playerId?: string, filter?: t.GetSessionsFilter) => {
  if (!playerId) {
    return null;
  }

  const player = await getPlayer(playerId);

  if (!player || !player.accountId) {
    return null;
  }

  const query: t.GetSessionsFilter = {
    details: true,
    grouped: true,

    ...(filter || {}),
  } as const;

  const { data } = await operatorApiRequest.get<{ [date: string]: Session[]; }>(
    `/accounts/${player.accountId}/game-sessions?query=${encodeFilter(query)}`,
  );

  return data
}
