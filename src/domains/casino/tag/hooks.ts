import { useMutation, useQuery, UseQueryOptions } from 'react-query';

import { QUERY_KEYS } from '@/libs/react-query';
import { useCurrentCasino } from '../hooks';

import {
  getCasinoTags,
  postCasinoTag,
  deleteCasinoTag,
  postAssociateTagToEntity,
  deleteAllTagsAssociated,
} from './api';
import * as t from './types';

interface GetTagsParams {
  searchTerm?: string;
  tagType?: t.Tag['type'];
  options?: UseQueryOptions<t.GetCasinoTagsResponse | undefined>;
}
export const useGetCasinoTags = ({ searchTerm, tagType, options }: GetTagsParams = {}) => {
  const { id: casinoId } = useCurrentCasino();
  const cleanedSearchTerm = (searchTerm || '').trim();

  return useQuery<t.GetCasinoTagsResponse | undefined>(
    [QUERY_KEYS.GET_CASINO_TAGS, casinoId, cleanedSearchTerm],
    () => getCasinoTags(casinoId, tagType, cleanedSearchTerm),
    options,
  );
};

export const usePostCasinoTag = () => {
  const { id: casinoId } = useCurrentCasino();

  return useMutation((payload: t.PostCasinoTagPayload) => postCasinoTag(casinoId, payload));
};

export const useDeleteCasinoTag = () => {
  const { id: casinoId } = useCurrentCasino();

  return useMutation((tagId: string) => deleteCasinoTag(casinoId, tagId));
};

export const usePostAssociateTagToEntity = () => {
  return useMutation((payload: t.PostAssociateTagToEntityPayload) =>
    postAssociateTagToEntity(payload),
  );
};

export const useDeleteAllTagsAssociated = () => {
  return useMutation((payload: t.DeleteAllTagsAssociatedPayload) =>
    deleteAllTagsAssociated(payload),
  );
};
