import { casinoApiRequest } from '../../api';
import { patchContent } from '../content';

import * as t from './types';

export const getArticles = async (casinoId: string, searchTerm?: string) => {
  const filter = {
    include: [
      {
        relation: 'title',
        scope: {
          include: ['variants'],
        },
      },
      {
        relation: 'body',
        scope: {
          include: ['variants'],
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

  const { data } = await casinoApiRequest.get<t.GetArticlesResponse>(
    `/casinos/${casinoId}/articles?filter=${encodeURIComponent(JSON.stringify(filter))}`,
  );
  return data;
};

export const getArticle = async (casinoId: string, articleId: string) => {
  const filter = {
    include: [
      {
        relation: 'title',
        scope: {
          include: ['variants'],
        },
      },
      {
        relation: 'body',
        scope: {
          include: ['variants'],
        },
      },
    ],
  } as const;

  const { data } = await casinoApiRequest.get<t.GetArticleResponse>(
    `/casinos/${casinoId}/articles/${articleId}?filter=${encodeURIComponent(
      JSON.stringify(filter),
    )}`,
  );
  return data;
};

export const getArticleFromSlug = async (casinoId: string, slug: string) => {
  const filter = {
    include: [
      {
        relation: 'title',
        scope: {
          include: ['variants'],
        },
      },
      {
        relation: 'body',
        scope: {
          include: ['variants'],
        },
      },
    ],
    where: { key: slug },
  } as const;

  const { data } = await casinoApiRequest.get<t.GetArticlesResponse>(
    `/casinos/${casinoId}/articles/?filter=${encodeURIComponent(JSON.stringify(filter))}`,
  );
  return data?.[0];
};

export const postArticle = async (casinoId: string, payload: t.PostArticlePayload) => {
  const { data } = await casinoApiRequest.post<t.PostArticleResponse>(
    `/casinos/${casinoId}/articles/`,
    payload,
  );
  return data;
};

export const patchArticle = async (
  casinoId: string,
  articleId: string,
  payload: t.PatchArticlePayload,
) => {
  const where = {
    id: articleId,
    casinoId,
  } as const;

  const { name, key, title, body } = payload;

  if (name || key) {
    await casinoApiRequest.patch(
      `/articles/${articleId}?where=${encodeURIComponent(JSON.stringify(where))}`,
      { name, key },
    );
  }

  if (title && title?.id) {
    await patchContent(casinoId, title?.id, {
      default: title?.default,
      variants: title?.variants,
    });
  }

  if (body && body?.id) {
    await patchContent(casinoId, body?.id, {
      default: body?.default,
      variants: body?.variants,
    });
  }
};

export const deleteArticle = async (casinoId: string, articleId: string) => {
  const { data } = await casinoApiRequest.delete(`/casinos/${casinoId}/articles/${articleId}`);
  return data;
};
