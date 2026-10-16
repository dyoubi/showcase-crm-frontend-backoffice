import axios from 'axios';

import { encodeFilter } from '@/utils';
import { configuration } from '../../../configuration';
import * as t from './types';

export const getContentStores = async () => {
  const { data } = await axios.get<t.GetStoresResponse>(`${configuration.CONTENT_API_URL}/stores`);
  return data;
};

export const getContentStoreFiles = async (filter: t.GetStoreFilesResponseFilter) => {
  const {
    storeId,
    sortBy = 'created_at',
    sortDirection = 'DESC',

    limit = 10,
    offset = 0,
  } = filter;

  const { data } = await axios.get<t.GetStoreFilesResponse>(
    `${
      configuration.CONTENT_API_URL
    }/stores/${storeId}/files?limit=${limit}&offset=${offset}&sort=${encodeFilter({
      [sortBy as string]: sortDirection,
    })}`,
  );
  return data;
};

export const getContentStoreFilesSearch = async (filter: t.GetStoreFilesSearchFilter) => {
  if (!filter.match) {
    return { results: [], count: 0 };
  }

  if (filter.match.length < 3) {
    return { results: [], count: 0 };
  }

  const {
    storeId,
    match: matchStr,
    sortBy = 'created_at',
    sortDirection = 'DESC',

    limit = 10,
    offset = 0,
  } = filter;

  const [{ data: results }, { data: count }] = await Promise.all([
    axios.get<t.GetStoreFilesResponse>(
      `${configuration.CONTENT_API_URL}/stores/${storeId}/search?match=${encodeURIComponent(
        matchStr,
      )}&limit=${limit}&offset=${offset}&sort=${encodeFilter({
        [sortBy as string]: sortDirection,
      })}`,
    ),
    axios.get(
      `${configuration.CONTENT_API_URL}/stores/${storeId}/search/count?match=${encodeURIComponent(
        matchStr,
      )}`,
    ),
  ]);

  return { results, count };
};

export const postFileInStore = async (
  media: File,
  storeId: string,
  update = true,
  folderpath = '/',
) => {
  const payload = new FormData();
  payload.append(folderpath, media);

  const { data } = await axios.post<t.PostStoreFileResponse>(
    `${configuration.CONTENT_API_URL}/stores/${storeId}/files/upload?update=${update}`,
    payload,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};

export const patchFileInStore = async (
  storeId: string,
  fileId: string,
  payload: { name: string; description: string },
) => {
  const { data } = await axios.patch<t.PostStoreFileResponse>(
    `${configuration.CONTENT_API_URL}/stores/${storeId}/files/${fileId}`,
    payload,
  );

  return data;
};

export const deleteFileInStore = async (storeId: string, fileId: string) => {
  const { data } = await axios.delete(
    `${configuration.CONTENT_API_URL}/stores/${storeId}/files?id=${fileId}`,
  );

  return data;
};
