import { useMutation, useQuery, UseQueryOptions } from 'react-query';

import { QUERY_KEYS } from '@/libs/react-query';

import { useCurrentCasino } from '../hooks';

import { getProviders, patchProvider } from './api';
import * as t from './types';

export const useProviders = (
  searchTerm?: string,
  options?: UseQueryOptions<t.GetProvidersResponse | undefined>,
) => {
  const { id: casinoId } = useCurrentCasino();

  return useQuery<t.GetProvidersResponse | undefined>(
    [QUERY_KEYS.GET_PROVIDERS, casinoId, searchTerm],
    () => getProviders(searchTerm),
    options,
  );
};

export const usePatchProvider = () => {
  interface Params {
    providerId: string;
    name?: string;
    position?: number;
    activate?: boolean;
    image?: string;
  }

  return useMutation(({ providerId, ...rest }: Params) => patchProvider(providerId, rest));
};
