import { useMutation, useQuery } from 'react-query';

import { QUERY_KEYS } from '@/libs/react-query';

import { configuration } from '@/configuration';
import {
  getContentStoreFiles,
  getContentStoreFilesSearch,
  getContentStores,
  postFileInStore,
  deleteFileInStore,
  patchFileInStore,
} from './api';

import { GetStoreFilesResponseFilter, GetStoreFilesSearchFilter } from './types';

export const useGetContentStores = () => {
  return useQuery([QUERY_KEYS.GET_CONTENT_STORES], getContentStores);
};

export const useGetContentStoreFiles = (filter: GetStoreFilesResponseFilter) => {
  return useQuery([QUERY_KEYS.GET_CONTENT_STORE_FILES], () => getContentStoreFiles(filter), {
    enabled: !!filter.storeId,
  });
};

export const useGetContentStoreFilesSearch = (searchFilter: GetStoreFilesSearchFilter) => {
  return useQuery(
    [QUERY_KEYS.GET_CONTENT_STORE_FILES_SEARCH + searchFilter.match],
    () => getContentStoreFilesSearch(searchFilter),
    {
      enabled: !!searchFilter.match,
    },
  );
};

export const useUploadFileInStore = () => {
  return useMutation((data: { media: File; storeId: string }) =>
    postFileInStore(data.media, data.storeId),
  );
};

export const usePatchFileInStore = () => {
  return useMutation(
    (data: { fileId: string; storeId: string; payload: { name: string; description: string } }) =>
      patchFileInStore(data.storeId, data.fileId, data.payload),
  );
};

export const useDeleteFileInStore = () => {
  return useMutation((data: { storeId: string; fileId: string }) =>
    deleteFileInStore(data.storeId, data.fileId),
  );
};

export const getMediaUrl = (mediaId: string, revision = 0): string => {
  return `${configuration.CONTENT_API_URL}/file/${mediaId}?revision=${revision}`;
};
