import { useQuery, UseQueryOptions, useMutation } from 'react-query';

import { QUERY_KEYS } from '@/libs/react-query';

import { useCurrentCasino } from '../hooks';

import { getSegments, postSegment, deleteSegment, getSegment } from './api';
import * as t from './types';

export const useGetSegments = (
  searchTerm?: string,
  options?: UseQueryOptions<t.GetSegmentsResponse | undefined>,
) => {
  const { id: casinoId } = useCurrentCasino();

  return useQuery<t.GetSegmentsResponse | undefined>(
    [QUERY_KEYS.GET_SEGMENTS, casinoId, searchTerm],
    () => getSegments(searchTerm),
    options,
  );
};

export const usePostSegment = () => {
  return useMutation(async (payload: t.PostSegmentPayload) => postSegment(payload));
};

export const useDeleteSegment = () => {
  return useMutation(async (segmentId: string) => deleteSegment(segmentId));
};

export const useGetSegment = (
  segmentId: string,
  options?: UseQueryOptions<t.GetSegmentResponse | undefined>,
) => {
  const { id: casinoId } = useCurrentCasino();

  return useQuery<t.GetSegmentResponse | undefined>(
    [QUERY_KEYS.GET_SEGMENT, casinoId],
    () => getSegment(segmentId),
    options,
  );
};
