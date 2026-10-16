import { encodeFilter } from '@/utils';
import { casinoApiRequest } from '../../api';
import * as t from './types';

export const getCasinoMachinesViews = async (searchTerm = '') => {
  const filter = {
    order: 'createdAt DESC',
    include: ['tags', 'providerView'],
    where: {
      or: [
        {
          title: { ilike: `%${searchTerm}%` },
        },
        { description: { ilike: `%${searchTerm}%` } },
      ],
    },
  } as const;

  const { data } = await casinoApiRequest.get<t.GetCasinoMachinesViewsResponse>(
    // TODO check with backend's team for remove filter param
    `machine-views?filter=${encodeFilter(filter)}`,
  );

  return data;
};
export const getMachineView = async (machineViewId: string) => {
  const filter = {
    include: ['tags'],
  } as const;

  const { data } = await casinoApiRequest.get<t.GetMachineViewResponse>(
    // TODO check with backend's team for remove filter param
    `machine-views/${machineViewId}?filter=${encodeFilter(filter)}`,
  );

  return data;
};

export const postMachineView = async (payload: t.PostMachineViewPayload) => {
  const { data } = await casinoApiRequest.post<t.PostMachineViewReponse>('machine-views', payload);

  return data;
};

export const patchMachineView = async (
  machineViewId: string,
  payload: t.PatchMachineViewPayload,
) => {
  const { data } = await casinoApiRequest.patch<t.PatchMachineViewReponse>(
    `machine-views/${machineViewId}`,
    payload,
  );

  return data;
};

export const getIsMachineViewSlugIsAvailable = async (
  casinoId: string,
  slug: string,
  idToExclude?: string,
) => {
  const filter = {
    where: {
      casinoId,
      key: slug,
      id: idToExclude ? { neq: idToExclude } : undefined,
    },
  };

  const { data } = await casinoApiRequest.get<t.GetCasinoMachinesViewsResponse>(
    // TODO: check with backend's team for create an route for check if an slug is avalaible
    `machine-views?filter=${encodeFilter(filter)}`,
  );

  return !data?.length;
};

export const deleteMachineView = async (machineViewId: string) => {
  const { data } = await casinoApiRequest.delete(`machine-views/${machineViewId}`);

  return data;
};
