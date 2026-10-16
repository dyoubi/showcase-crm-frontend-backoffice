import { useMutation, useQuery, UseQueryOptions } from 'react-query';

import { QUERY_KEYS } from '@/libs/react-query';

import { useCurrentCasino } from '../hooks';
import { deleteCarousel, getCarousel, getCarousels, patchCarousel, postCarousel } from './api';
import * as t from './types';

export const useGetCarrousels = (
  searchTerm?: string,
  options?: UseQueryOptions<t.GetCarrouselsResponse | undefined>,
) => {
  const { id: casinoId } = useCurrentCasino();

  return useQuery<t.GetCarrouselsResponse | undefined>(
    [QUERY_KEYS.GET_CAROUSELS, casinoId, searchTerm],
    () => getCarousels(searchTerm),
    options,
  );
};

export const useGetCarrousel = (
  carrouselId?: string,
  options?: UseQueryOptions<t.GetCarrouselResponse | undefined>,
) => {
  return useQuery<t.GetCarrouselResponse | undefined>(
    [QUERY_KEYS.GET_CAROUSEL, carrouselId],
    () => getCarousel(carrouselId || ''),
    options,
  );
};

export const usePostCarousel = () => {
  return useMutation((payload: t.PostCarrouselPayload) => postCarousel(payload));
};

export const usePatchCarousel = () => {
  return useMutation((payload: t.PatchCarrouselPayload) => patchCarousel(payload));
};

export const useDeleteCarousel = () => {
  return useMutation((carouselId: string) => deleteCarousel(carouselId));
};
