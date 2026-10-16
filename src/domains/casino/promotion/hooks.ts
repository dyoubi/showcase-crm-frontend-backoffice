import { useMutation, useQuery, UseQueryOptions } from 'react-query';

import { QUERY_KEYS } from '@/libs/react-query';

import { useCurrentCasino } from '../hooks';

import { getPromotion, getPromotions, postPromotion, deletePromotion, patchPromotion } from './api';
import * as t from './types';

export const useGetPromotions = (
  searchTerm?: string,
  options?: UseQueryOptions<t.GetPromotionsResponse | undefined>,
) => {
  const { id: casinoId } = useCurrentCasino();

  return useQuery<t.GetPromotionsResponse | undefined>(
    [QUERY_KEYS.PROMOTIONS, casinoId, searchTerm],
    () => getPromotions(casinoId, searchTerm),
    options,
  );
};

export const useGetPromotion = (
  promotionId: string,
  options?: UseQueryOptions<t.GetPromotionResponse | undefined>,
) => {
  const { id: casinoId } = useCurrentCasino();

  return useQuery<t.GetPromotionResponse | undefined>(
    [QUERY_KEYS.PROMOTION, casinoId, promotionId],
    () => getPromotion(casinoId, promotionId),
    options,
  );
};

export const usePostPromotion = () => {
  const { id: casinoId } = useCurrentCasino();

  return useMutation((payload: t.PostPromotionPayload) => postPromotion(casinoId, payload));
};

export const usePatchPromotion = () => {
  const { id: casinoId } = useCurrentCasino();

  return useMutation(({ id, ...payload }: t.PatchPromotionPayload & { id: string }) => patchPromotion(casinoId, id, payload));
};

export const useDeletePromotion = () => {
  const { id: casinoId } = useCurrentCasino();

  return useMutation((promotionId: string) => deletePromotion(casinoId, promotionId));
};
