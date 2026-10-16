import { UseQueryOptions, useMutation, useQuery, useQueryClient } from 'react-query';

import { QUERY_KEYS } from '@/libs/react-query';

import { useCurrentCasino } from '../hooks';

import * as api from './api';
import * as t from './types';

export const useGetPlayersList = (
  filters?: t.GetPlayersListFilter,
  includeFilters?: t.IncludeFilters,
  options?: UseQueryOptions<t.GetPlayersResponse | undefined>,
) => {
  const {
    id: casinoId,
    key: casinoKey,
  } = useCurrentCasino();

  return useQuery<t.GetPlayersResponse | undefined>(
    [QUERY_KEYS.GET_PLAYERS, casinoKey, filters, includeFilters],
    () => api.getPlayersList(casinoId, filters || {}, includeFilters),
    options,
  );
};

export const useGetPlayersWithCustomFields = (
  includeFields?: t.IncludeFilters,
  searchTerm?: string,
  options?: UseQueryOptions<t.GetPlayersWithBonusesResponse | undefined>,
) => {
    const {
    id: casinoId,
    key: casinoKey,
  } = useCurrentCasino();

  const cleanedSearchTerm = (searchTerm || '').trim();

  const filter = {
    searchTerm: (searchTerm || '').trim(),
    sortBy: t.EPlayersSortByType.CREATED_AT,
    sortDirection: t.EPlayersSortDirectionType.DESC,
  };

  return useQuery<t.GetPlayersWithBonusesResponse | undefined>(
    [QUERY_KEYS.GET_PLAYERS, casinoKey, cleanedSearchTerm, includeFields],
    () => api.getPlayersList(casinoId, filter, includeFields) as Promise<t.GetPlayersWithBonusesResponse>,
    options,
  );
};

export const useGetPlayer = (
  playerId?: string,
  options?: UseQueryOptions<t.PlayerWithBonuses | undefined>,
) => {
  const { key: casinoKey } = useCurrentCasino();

  // TODO: Validate invalidate queries instead of manual refetching and prop drilling the refetch function
  return useQuery<t.PlayerWithBonuses | undefined>(
    [QUERY_KEYS.GET_PLAYER, casinoKey, playerId],
    () => api.getPlayer(playerId),
    options,
  );
};

export const usePatchActivatePlayer = (playerId: string) => {
  const { key: casinoKey } = useCurrentCasino();
  const queryClient = useQueryClient();

  return useMutation(() => api.activatePlayer(playerId), {
    onSettled: async () => queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.GET_PLAYER, casinoKey, playerId],
    }),
  });
};

export const usePatchBanPlayer = (playerId: string) => {
  const { key: casinoKey } = useCurrentCasino();
  const queryClient = useQueryClient();

  return useMutation(() => api.banPlayer(playerId), {
    onSettled: async () => queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.GET_PLAYER, casinoKey, playerId],
    }),
  });
};

export const usePatchFreezePlayer = (playerId: string) => {
  const { key: casinoKey } = useCurrentCasino();
  const queryClient = useQueryClient();

  return useMutation((frozenUntil?: Date) => api.freezePlayer(playerId, frozenUntil), {
    onSettled: async () => queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.GET_PLAYER, casinoKey, playerId],
    }),
  });
};


export const usePatchPlayer = () => {
  return useMutation((payload: t.PatchPlayerPayload) => api.patchPlayer(payload));
};

export const useSendPlayerVerificationEmail = () => {
  return useMutation((email: string) => api.sendPlayerVerificationEmail(email));
};

export const useSendPlayerPasswordResetEmail = () => {
  return useMutation((email: string) => api.sendPlayerPasswordResetEmail(email));
};
