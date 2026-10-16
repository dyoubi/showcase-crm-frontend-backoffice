import { useQuery, UseQueryOptions } from 'react-query';

import { QUERY_KEYS } from '@/libs/react-query';

import { useCurrentCasino } from '../hooks';

import { getCasinoMachine, getCasinoMachines, getOperatorMachine } from './api';
import * as t from './types';

export const useGetCasinoMachines = (
  params?: { searchTerm?: string },
  options?: UseQueryOptions<t.GetCasinoMachinesResponse | undefined>,
) => {
  const { id: casinoId } = useCurrentCasino();
  return useQuery<t.GetCasinoMachinesResponse | undefined>(
    [QUERY_KEYS.GET_CASINO_MACHINES, casinoId, params?.searchTerm],
    () => getCasinoMachines({ searchTerm: params?.searchTerm }),
    options,
  );
};

export const useGetMachine = (
  machineId?: string,
  options?: UseQueryOptions<t.GetCasinoMachineResponse | undefined>,
) => {
  return useQuery<t.GetCasinoMachineResponse | undefined>(
    [QUERY_KEYS.GET_CASINO_MACHINES, machineId],
    () => {
      if (!machineId) {
        return undefined;
      }

      return getCasinoMachine(machineId);
    },
    options,
  );
};

export const useGetOperatorMachine = (
  machineId?: string,
  options?: UseQueryOptions<t.GetOperatorMachineResponse | undefined>,
) => {
  return useQuery<t.GetOperatorMachineResponse | undefined>(
    [QUERY_KEYS.GET_OPERATOR_MACHINE, machineId],
    () => {
      if (!machineId) {
        return undefined;
      }

      return getOperatorMachine(machineId);
    },
    options,
  );
};
