import { BuiltInCategoriesSlugsEnum, BuiltInCategoriesSlugs } from './types';

export const isBuiltInCategory = (slug?: string): slug is BuiltInCategoriesSlugs => {
  const builtInSlugList: string[] = Object.values(BuiltInCategoriesSlugsEnum);

  return builtInSlugList.includes(slug || '');
};
