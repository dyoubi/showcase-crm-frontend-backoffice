import { encodeFilter } from '@/utils';
import { casinoApiRequest } from '../../api';
import * as t from './types';

export const getSegments = async (searchTerm = '') => {
  const filter = {
    order: 'created DESC',
    where: {
      or: [
        {
          name: { ilike: `%${searchTerm}%` },
        },
      ],
    },
  } as const;

  const { data } = await casinoApiRequest.get<t.GetSegmentsResponse>(
    `segments?filter=${encodeFilter(filter)}`,
  );

  return data;
};

export const postSegment = async ({ id, ...restPayload }: t.PostSegmentPayload) => {
  const { data } = await casinoApiRequest[id ? 'put' : 'post']<t.Segment>(
    `segments/${id || ''}`,
    restPayload,
  );

  return data;
};

export const deleteSegment = async (segmentId: string) => {
  const { data } = await casinoApiRequest.delete<void>(`../segments/${segmentId}`);
  return data;
};

export const getSegment = async (segmentId: string) => {
  // const { data } = await casinoApiRequest.get<t.GetSegmentResponse>(`segments/${segmentId}`);

  return { name: 'Fixture', id: segmentId } as t.GetSegmentResponse;
};
