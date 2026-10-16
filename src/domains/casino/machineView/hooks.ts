import { useMutation, useQuery, UseQueryOptions } from 'react-query';

import { QUERY_KEYS } from '@/libs/react-query';

import { useCurrentCasino } from '../hooks';

import {
  getCasinoMachinesViews,
  getIsMachineViewSlugIsAvailable,
  getMachineView,
  postMachineView,
  patchMachineView,
  deleteMachineView,
} from './api';
import * as t from './types';

export const useGetMachinesViews = (
  searchTerm?: string,
  options?: UseQueryOptions<t.GetCasinoMachinesViewsResponse | undefined>,
) => {
  const { id: casinoId } = useCurrentCasino();
  const cleanedSearchTerm = (searchTerm || '').trim();

  return useQuery<t.GetCasinoMachinesViewsResponse | undefined>(
    [QUERY_KEYS.GET_CASINO_MACHINES_VIEWS, casinoId, cleanedSearchTerm],
    () => getCasinoMachinesViews(cleanedSearchTerm),
    options,
  );
};

export const useGetMachineView = (
  machineViewId: string,
  options?: UseQueryOptions<t.GetMachineViewResponse | undefined>,
) => {
  const { id: casinoId } = useCurrentCasino();

  return useQuery<t.GetMachineViewResponse | undefined>(
    [QUERY_KEYS.GET_MACHINE_VIEW, casinoId, machineViewId],
    () => getMachineView(machineViewId),
    options,
  );
};

export const usePostMachineView = () => {
  const { id: casinoId } = useCurrentCasino();

  return useMutation((payload: Omit<t.PostMachineViewPayload, 'casinoId'>) =>
    postMachineView({ casinoId, ...payload }),
  );
};

export const usePatchMachineView = () => {
  const { id: casinoId } = useCurrentCasino();

  interface Params extends Omit<t.PatchMachineViewPayload, 'casinoId'> {
    id: string;
  }
  return useMutation(({ id, ...payload }: Params) =>
    patchMachineView(id, { casinoId, ...payload }),
  );
};

export const useGetIsMachineViewSlugIsAvailable = (idToExclude?: string) => {
  const { id: casinoId } = useCurrentCasino();

  return useMutation((slug: string) =>
    getIsMachineViewSlugIsAvailable(casinoId, slug.trim(), idToExclude),
  );
};

export const useDeleteMachineView = () => {
  return useMutation((machineId: string) => deleteMachineView(machineId));
};
