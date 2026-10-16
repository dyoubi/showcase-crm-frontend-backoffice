import { encodeFilter } from '@/utils';
import { casinoApiRequest } from '../../api';

import * as t from './types';
import { ContentVariationType } from './types';

export const getContent = async (casinoId: string, contentId: string) => {
  const filter = {
    include: ['variants'],
  } as const;

  const { data } = await casinoApiRequest.get<t.GetContentResponse>(
    `/casinos/${casinoId}/contents/${contentId}?filter=${encodeFilter(filter)}`,
  );

  return data;
};

export const patchContentVariant = async (
  casinoId: string,
  contentId: string,
  variantId: string,
  payload: Partial<t.ContentVariationType>,
) => {
  const { data } = await casinoApiRequest.patch(
    `/casinos/${casinoId}/contents/${contentId}/variants/${variantId}`,
    payload,
  );
  return data;
};

export const patchContent = async (
  casinoId: string,
  contentId: string,
  payload: t.PatchContentPayload,
) => {
  const { default: defaultContent, variants } = payload;
  const promiseList: Array<Promise<void>> = [];

  const updateContentVariant = async (contentVariant?: ContentVariationType) => {
    if (!contentVariant || !contentVariant?.id) {
      return;
    }

    await patchContentVariant(casinoId, contentId, contentVariant?.id, {
      devices: contentVariant?.devices,
      lang: contentVariant?.lang,
      langType: contentVariant?.langType,
      default: contentVariant?.default,
      data: contentVariant?.data,
    });
  };

  await updateContentVariant(defaultContent);

  variants?.forEach((variant) => promiseList.push(updateContentVariant(variant)));

  await Promise.all(promiseList);
};
