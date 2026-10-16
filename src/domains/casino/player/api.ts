import { AxiosResponse } from 'axios';

import { casinoApiRequest } from '@/domains/api';

import { encodeFilter } from '@/utils';

import { Player } from './player.types';
import * as t from './types';

// -----------------------------------------------
// GET
// -----------------------------------------------

export const getPlayersList = async (
  casinoId: string,
  filters: t.GetPlayersListFilter,
  includeFilters?: t.IncludeFilters,
) => {
  const {
    searchTerm,
    tags,

    sortBy,
    sortDirection,

    limit,
    offset,
  } = filters;

  const parsedFilter = {
    where: {
      ...((searchTerm) ? {
        or: [
          { firstname: { ilike: `%${searchTerm}%` }},
          { lastname: { ilike: `%${searchTerm}%` }},
          { email: { ilike: `%${searchTerm}%` }},
          { nickname: { ilike: `%${searchTerm}%` }},
        ],
      } : {}),
    },
    include: [{
      relation: 'tags',
      scope: {
        where: {
          ...((tags?.length) ? { id: { inq: tags } } : {}),
        },
      },
      type: 'union',
    }, ...(Array.isArray(includeFilters) ? includeFilters : [includeFilters || ''])],


    // Compatibility with Loopback
    order: `${sortBy} ${sortDirection}`,

    limit,
    offset,
  };

  const promisesArr: [
    Promise<AxiosResponse<ReadonlyArray<Player> | ReadonlyArray<t.PlayerWithBonuses>>>,
    Promise<AxiosResponse<[t.CountPlayers]>>,
  ] = [
    casinoApiRequest.get<ReadonlyArray<Player> | ReadonlyArray<t.PlayerWithBonuses>>(`/casinos/${casinoId}/players?filter=${encodeFilter(parsedFilter)}`),
    casinoApiRequest.get<[t.CountPlayers]>(`/casinos/${casinoId}/players/count?filter=${encodeFilter(parsedFilter)}`),
  ];

  const [resultsResponse, countResponse] = await Promise.all(promisesArr);

  return {
    count: countResponse.data[0].count,
    data: resultsResponse.data,
  };
};

export const getPlayer = async (playerId?: string) => {
  const filter = {
    include: ['tags', 'bonuses'],
  } as const;
  if (!playerId) {
    return undefined;
  }

  const { data } = await casinoApiRequest.get<t.GetPlayerResponse>(
    // TODO Check with backend's team for have a route for get player info by ID & remove where filter
    `/players/${playerId}/?filter=${encodeFilter(filter)}`,
  );

  return data;
};


// -----------------------------------------------
// PATCH
// -----------------------------------------------

export const activatePlayer = async (playerId: string) => {
  const { data } = await casinoApiRequest.patch<t.PatchPlayerResponse>(`/players/${playerId}/administration/activate`);

  return data;
};

export const banPlayer = async (playerId: string) => {
  const { data } = await casinoApiRequest.patch<t.PatchPlayerResponse>(`/players/${playerId}/administration/ban`);

  return data;
};

export const freezePlayer = async (playerId: string, frozenUntil?: Date) => {
  if (!frozenUntil) {
    throw Error('Please select a date');
  }

  const { data } = await casinoApiRequest.patch<t.PatchPlayerResponse>(`/players/${playerId}/administration/freeze`, {
    frozenUntil,
  });

  return data;
};


export const patchPlayer = async ({ id, ...payload }: t.PatchPlayerPayload) => {
  const { data } = await casinoApiRequest.patch<t.PatchPlayerResponse>(`/players/${id}`, payload);

  return data;
};


// -----------------------------------------------
// POST
// -----------------------------------------------

export const sendPlayerVerificationEmail = async (email: string) => {
  const { data } = await casinoApiRequest.post(`/public/email-verification`, {
    email,
  });

  return data;
};

export const sendPlayerPasswordResetEmail = async (email: string) => {
  const { data } = await casinoApiRequest.post(`/public/password-change`, {
    email,
  });

  return data;
};
