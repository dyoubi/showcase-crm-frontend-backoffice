import { ValueOf } from '@/utils/typescript.helpers';
import { PostContentPayload, ContentRequestDTO, PatchContentPayload } from '../content';
import * as c from './constants';

export interface PostArticlePayload {
  key?: string;
  name?: string;
  title: PostContentPayload;
  body: PostContentPayload;
}

export interface PostArticleResponse {
  id: string;
  key?: string;
  name?: string;
  title: ContentRequestDTO;
  body: ContentRequestDTO;
}

export type GetArticlesResponse = ReadonlyArray<{
  id: string;
  key: string;
  casinoId: string;
  name?: string;
  bodyId: string;
  body: ContentRequestDTO;
  titleId: string;
  title: ContentRequestDTO;
}>;

export interface GetArticleResponse {
  id: string;
  key: string;
  casinoId: string;
  name?: string;
  bodyId: string;
  body: ContentRequestDTO;
  titleId: string;
  title: ContentRequestDTO;
}

export interface PatchArticlePayload {
  key?: string;
  name?: string;
  body?: PatchContentPayload & { id: string };
  title?: PatchContentPayload & { id: string };
}

export type BuildInArticleSlugType = ValueOf<typeof c.BUILT_IN_ARTICLES_SLUGS>;
