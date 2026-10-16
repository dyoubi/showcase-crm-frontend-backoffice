import { useQuery, UseQueryOptions } from 'react-query';

import { QUERY_KEYS } from '@/libs/react-query';

import { getEntities } from './api';
import * as t from './types';

export const useGetEntities = (options?: UseQueryOptions<t.GetEntitiesReformatted>) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ENTITIES],
    queryFn: getEntities,
    ...options,
  });
};
