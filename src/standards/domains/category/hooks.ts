import { useMutation, useQuery, UseQueryOptions } from 'react-query';

import { QUERY_KEYS } from '@/libs/react-query';

import { useCurrentCasino } from '@/domains/casino/hooks';

import { getCategory, postCategory, isSlugAvailable } from './api';
import * as t from './types';

export const useGetCategory = (
  slug: string,
  options?: UseQueryOptions<t.GetCategoryResponse | undefined>,
) => {
  const { id: casinoId } = useCurrentCasino();

  return useQuery<t.GetCategoryResponse | undefined>(
    [QUERY_KEYS.GET_CASINO_CATEGORY, slug, casinoId],
    () => getCategory(slug),
    options,
  );
};

export const usePostCategory = () => {
  return useMutation((payload: t.PostCategoryPayload) => postCategory(payload));
};

export const useCheckSlugAvailable = () => {
  return useMutation((slug: string) => isSlugAvailable(slug));
};
