import { BUILT_IN_ARTICLES_SLUGS } from './constants';
import { BuildInArticleSlugType } from './types';

export const isBuiltInArticle = (slug?: string): slug is BuildInArticleSlugType => {
  const builtInSlugList: string[] = Object.values(BUILT_IN_ARTICLES_SLUGS);

  return builtInSlugList.includes(slug || '');
};
