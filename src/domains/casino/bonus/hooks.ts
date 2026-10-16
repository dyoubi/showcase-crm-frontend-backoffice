import { useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query';

import { QUERY_KEYS } from '@/libs/react-query';

import {
  getBonus,
  getBonuses,
  postBonus,
  deleteBonus,
  assignBonus,
  getBonusAssignations,
  deleteBonusAssignation,
  assignBonusByPlayerId,
  getAssignedPlayerBonus,
} from './api';
import { useCurrentCasino } from '../hooks';
import * as t from './types';

export const useGetBonuses = (filters?: t.GetBonusesFilters) => {
  const { id: casinoId } = useCurrentCasino();

  return useQuery<t.GetBonusesResponse | undefined>(
    [QUERY_KEYS.GET_BONUSES, casinoId],
    () => getBonuses(filters || {}),
  );
};

// TODO @GET-BONUSES: We should request paginated and filtered bonuses data by sending the request
//                    to the BE instead of handling everything on the FE.
export const useGetBonus = (
  bonusId: string,
  options?: UseQueryOptions<t.GetBonusResponse | undefined>,
) => {
  const { id: casinoId } = useCurrentCasino();

  return useQuery<t.GetBonusResponse | undefined>(
    [QUERY_KEYS.GET_BONUS, casinoId, bonusId],
    () => getBonus(bonusId),
    options,
  );
};

export const useGetAssignedPlayerBonus = (
  props: t.GetAssignedBonusProps,
  options?: UseQueryOptions<t.GetAssignedBonusResponse | undefined>,
) => {
  const {
    playerId,
    filter,
  } = props;

  const { id: casinoId } = useCurrentCasino();

  return useQuery<t.GetAssignedBonusResponse | undefined>(
    [QUERY_KEYS.GET_ASSIGNED_PLAYER_BONUS, casinoId, playerId],
    () => getAssignedPlayerBonus({ filter, playerId }),
    options,
  );
};

export const usePostBonus = () => {
  const { id: casinoId } = useCurrentCasino();

  return useMutation((payload: Omit<t.PostBonusPayload, 'casinoId'>) =>
    postBonus(payload, casinoId),
  );
};

export const useDeleteBonus = () => {
  const { id: casinoId } = useCurrentCasino();

  const queryClient = useQueryClient();

  return useMutation((bonusId: string) => deleteBonus(bonusId), {
    onSettled: async () => queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.GET_BONUSES, casinoId],
    }),
  });
};

export const useAssignBonus = () => {
  const { id: casinoId } = useCurrentCasino();

  const queryClient = useQueryClient();

  return useMutation(({ bonusId, tagIds }: t.AssignBonusProps) => assignBonus({ bonusId, tagIds }), {
    onSettled: async () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_ASSIGNED_PLAYER_BONUS, casinoId] }),
  });
};

export const useAssignBonusByPlayerId = ({ playerId }: { playerId: t.AssignBonusByPlayerId['playerId'] }) => {
  const { key: casinoKey } = useCurrentCasino();

  const queryClient = useQueryClient();

  return useMutation(({ bonusId }: { bonusId: t.Bonus['id'] }) => assignBonusByPlayerId({ bonusId, playerId }), {
    onSettled: async () => queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.GET_PLAYER, casinoKey, playerId],
    }),
  });
};

export const useGetBonusAssignations = (
  bonusId: string,
  options?: UseQueryOptions<t.GetBonusAssignationsResponse | undefined>,
) => {
  return useQuery<t.GetBonusAssignationsResponse | undefined>(
    [QUERY_KEYS.GET_BONUS_ASSIGNATIONS, bonusId],
    () => getBonusAssignations(bonusId || ''),
    options,
  );
};

export const useDeleteBonusAssignation = () => {
  return useMutation(({ bonusId, assignationId }: t.DeleteAssignationPayload) =>
    deleteBonusAssignation({ bonusId, assignationId }),
  );
};
