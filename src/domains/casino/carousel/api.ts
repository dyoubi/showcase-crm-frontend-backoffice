import { encodeFilter } from '@/utils';
import { casinoApiRequest } from '../../api';
import * as t from './types';

export const getCarousels = async (searchTerm = '') => {
  const filter = {
    order: 'createdAt DESC',
    where: {
      or: [{ key: { ilike: `%${searchTerm}%` } }],
    },
  } as const;
  const { data } = await casinoApiRequest.get<t.GetCarrouselsResponse>(
    `/carousels?filter=${encodeFilter(filter)}`,
  );

  return data;
};

export const getCarousel = async (carrouselId: string) => {
  const filter = {
    where: {
      id: carrouselId,
    },
  } as const;

  const { data } = await casinoApiRequest.get<t.GetCarrouselsResponse>(
    `/carousels?filter=${encodeFilter(filter)}`,
  );

  return data?.[0];
};

export const postCarousel = async (payload: t.PostCarrouselPayload) => {
  const { data } = await casinoApiRequest.post<t.PostCarrouselResponse>(`/carousels`, payload);
  return data;
};

export const patchCarousel = async ({ id, ...payload }: t.PatchCarrouselPayload) => {
  const { data } = await casinoApiRequest.patch(`/carousels/${id}`, payload);
  return data;
};

export const deleteCarousel = (carrouselId: string) =>
  casinoApiRequest.delete(`/carousels/${carrouselId}`);
