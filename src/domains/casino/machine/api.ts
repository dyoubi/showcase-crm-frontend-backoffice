import { encodeFilter } from '@/utils';
import { casinoApiRequest, operatorApiRequest } from '../../api';
import * as t from './types';

interface Params {
  searchTerm?: string;
}

export const getCasinoMachines = async ({ searchTerm }: Params) => {
  const searchTermCleaned = (searchTerm || '').toLocaleLowerCase().trim();

  const filter = {
    limit: 850,
    where: searchTermCleaned
      ? {
          'info.title': {
            ilike: `%${searchTermCleaned}%`,
          },
        }
      : undefined,
  };
  const { data } = await casinoApiRequest.get<t.GetCasinoMachinesResponse>(
    `machines-catalog?filter=${encodeFilter(filter)}`,
  );

  return data;
};

export const getCasinoMachine = async (machineId: string) => {
  const { data } = await casinoApiRequest.get<t.GetCasinoMachineResponse>(`machines/${machineId}`);

  return data;
};

export const getOperatorMachine = async (machineId: string) => {
  const { data } = await operatorApiRequest.get<t.GetOperatorMachineResponse>(
    `/game-machines/${machineId}`,
  );

  return data;
};
