import { casinoApiRequest } from '../../api';
import * as t from './types';

export const getPromotions = async (casinoId: string, searchTerm?: string) => {
  const filter = {
    include: [
      {
        relation: 'banner',
        scope: {
          include: [{ relation: 'variants' }],
        },
      },
      {
        relation: 'thumbnail',
        scope: {
          include: [
            { relation: 'variants' }
          ],
        },
      },
    ],
    where: {
      or: [
        {
          key: { ilike: `%${searchTerm || ''}%` },
        },
      ],
    },
  } as const;

  try {
    const { data } = await casinoApiRequest.get<t.GetPromotionsResponse>(
      `/casinos/${casinoId}/promotions?filter=${encodeURIComponent(JSON.stringify(filter))}`,
    );
    return data;
  } catch (error) {
    console.error("Failed to get promotions:", error);
    // Handle the error appropriately
    throw error; // or return a default value
  }
};

export const getPromotion = async (casinoId: string, promotionId: string) => {
  const filter = {
    include: [
      {
        relation: 'title',
        scope: {
          include: [{ relation: 'variants' }],
        },
      },
      {
        relation: 'body',
        scope: {
          include: [{ relation: 'variants' }],
        },
      },
      {
        relation: 'terms',
        scope: {
          include: [{ relation: 'variants' }],
        },
      },
      {
        relation: 'banner',
        scope: {
          include: [{ relation: 'variants' }],
        },
      },
      {
        relation: 'header',
        scope: {
          include: [{ relation: 'variants' }],
        },
      },
      {
        relation: 'thumbnail',
        scope: {
          include: [{ relation: 'variants' }],
        },
      },
      {
        relation: 'title',
        scope: {
          include: [{ relation: 'variants' }],
        },
      },
    ],
  } as const;

  const { data } = await casinoApiRequest.get<t.GetPromotionResponse>(
    `/casinos/${casinoId}/promotions/${promotionId}?filter=${encodeURIComponent(
      JSON.stringify(filter),
    )}`,
  );
  return data;
};

export const postPromotion = async (casinoId: string, payload: t.PostPromotionPayload) => {
  const { data } = await casinoApiRequest.post<t.PostPromotionResponse>(
    `/casinos/${casinoId}/promotions`,
    payload,
  );
  return data;
};

export const patchPromotion = async (
  casinoId: string,
  promotionId: string,
  payload: t.PatchPromotionPayload,
) => {

  const { data } = await casinoApiRequest.patch(
    `/casinos/${casinoId}/promotions/${promotionId}`,
    payload,
  );
  
  return data;
};

export const deletePromotion = async (casinoId: string, promotionId: string) =>
  casinoApiRequest.delete(`/casinos/${casinoId}/promotions/${promotionId}`);
