import { QUERY_KEYS } from '@/libs/react-query';

import { useQuery, UseQueryOptions } from 'react-query';
import { useAppSelector } from '../../hooks';

import { getCasinos } from './api';
import * as t from './types';

export const useGetCasinos = (options?: UseQueryOptions<t.GetCasinosResponse | undefined>) => {
  return useQuery<t.GetCasinosResponse | undefined>([QUERY_KEYS.GET_CASINOS], getCasinos, options);
};

export const useCurrentCasino = () => useAppSelector((app) => app.account.casino);
