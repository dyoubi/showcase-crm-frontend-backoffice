import { useQuery, UseQueryOptions } from 'react-query';

import { QUERY_KEYS } from '@/libs/react-query';

import { useCurrentCasino } from '../hooks';

import { getContent } from './api';
import * as t from './types';

export const useGetContent = (
  contentId?: string,
  options?: UseQueryOptions<t.GetContentResponse | undefined>,
) => {
  const { id: casinoId } = useCurrentCasino();

  return useQuery<t.GetContentResponse | undefined>(
    [QUERY_KEYS.GET_CONTENT, casinoId, contentId],
    () => getContent(casinoId, contentId || ''),
    options,
  );
};
