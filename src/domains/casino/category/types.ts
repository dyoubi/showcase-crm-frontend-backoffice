import { ValueOf } from '@/utils/typescript.helpers';
import { MachineView } from '../machineView';
import { Tag } from '../tag';

interface Category {
  id: string;
  name: string;
  key: string;
  description: string;
  tags: ReadonlyArray<Tag>;
  image?: { url?: string };
}
export type GetCategoriesResponse = ReadonlyArray<Category>;

export interface PostCategoryPayload {
  name: string;
  slug: string;
  description?: string;
  image?: { url?: string };
}

export interface PatchCategoryPayload {
  name?: string;
  slug?: string;
  description?: string;
  image?: { url?: string };
}

export type GetCategoryResponse = Category;

export type PostCategoryMachinesViewsPayload = {
  slug: string;
  position: number;
};

export type GetCategoryMachinesView = ReadonlyArray<MachineView>;

export interface AddOrRemoveCategoryTags {
  tagsIdsToAdd: readonly string[];
  tagsIdsToRemove: readonly string[];
}

export const BuiltInCategoriesSlugsEnum = {
  RECOMMANDED: 'recommanded',
  SLOTS: 'slots',
  LIVE_CASINO: 'livecasino',
  NEW: 'new',
  BUY_IN_FEATURE: 'buyinfeature',
} as const;

export type BuiltInCategoriesSlugs = ValueOf<typeof BuiltInCategoriesSlugsEnum>;
