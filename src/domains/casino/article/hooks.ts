import { useMutation, useQuery, UseQueryOptions } from 'react-query';

import { QUERY_KEYS } from '@/libs/react-query';
import {
  deleteArticle,
  getArticle,
  getArticles,
  postArticle,
  patchArticle,
  getArticleFromSlug,
} from './api';

import { useCurrentCasino } from '../hooks';
import * as t from './types';

export const useGetArticles = (
  searchTerm?: string,
  options?: UseQueryOptions<t.GetArticlesResponse | undefined>,
) => {
  const { id: casinoId } = useCurrentCasino();

  return useQuery<t.GetArticlesResponse | undefined>(
    [QUERY_KEYS.GET_ARTICLES, casinoId, searchTerm],
    () => getArticles(casinoId, searchTerm),
    options,
  );
};

export const useGetArticle = (
  promotionId: string,
  options?: UseQueryOptions<t.GetArticleResponse | undefined>,
) => {
  const { id: casinoId } = useCurrentCasino();

  return useQuery<t.GetArticleResponse | undefined>(
    [QUERY_KEYS.GET_ARTICLE, casinoId, promotionId],
    () => getArticle(casinoId, promotionId),
    options,
  );
};
export const useGetArticleFromSlug = (
  slug: string,
  options?: UseQueryOptions<t.GetArticleResponse | undefined>,
) => {
  const { id: casinoId } = useCurrentCasino();

  return useQuery<t.GetArticleResponse | undefined>(
    [QUERY_KEYS.GET_ARTICLE_FROM_SLUG, casinoId, slug],
    () => getArticleFromSlug(casinoId, slug),
    options,
  );
};

export const usePostArticle = () => {
  const { id: casinoId } = useCurrentCasino();

  return useMutation(async (payload: t.PostArticlePayload) =>
    postArticle(casinoId, payload),
  );
};

export const usePatchArticle = () => {
  const { id: casinoId } = useCurrentCasino();

  return useMutation(
    async ({
      id,
      ...payload
    }: t.PatchArticlePayload & {
      id: string;
    }) => patchArticle(casinoId, id, payload),
  );
};

export const useDeleteArticle = () => {
  const { id: casinoId } = useCurrentCasino();

  return useMutation(async (articleId: string) => deleteArticle(casinoId, articleId));
};
