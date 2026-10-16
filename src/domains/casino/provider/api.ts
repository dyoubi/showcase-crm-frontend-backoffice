import { encodeFilter } from '@/utils';

import { casinoApiRequest } from '../../api';
import * as t from './types';

export const getProviders = async (searchTerm = '') => {
  const filter = {
    order: 'position ASC',
    where: {
      or: [
        {
          name: { ilike: `%${searchTerm}%` },
        },
        { description: { ilike: `%${searchTerm}%` } },
      ],
    },
  } as const;

  const { data } = await casinoApiRequest.get<t.GetProvidersResponse>(
    `/providers?filter=${encodeFilter(filter)}`,
  );
  return data;
};

export const patchProvider = async (providerId: string, payload: t.PatchProviderPayload) => {
  await casinoApiRequest.patch<void>(`/providers/${providerId}`, {
    name: payload.name,
    position: payload.position,
    activate: payload.activate,
    image: {
      desktop: {
        url: payload?.image,
      },
    },
  });
};
