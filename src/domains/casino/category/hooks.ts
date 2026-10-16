import { useQuery, UseQueryOptions, useMutation } from 'react-query';

import { QUERY_KEYS } from '@/libs/react-query';

import {
  postCategory,
  getCategories,
  getIsCategorySlugIsAvailable,
  getCategoryMachineViews,
  getCategory,
  patchCategory,
  deleteCategory,
  postMachineViewToCategory,
  deleteMachineViewInCategory,
  patchMachineViewCategoryPosition,
} from './api';
import * as t from './types';
import { useCurrentCasino } from '../hooks';

export const useGetCategories = (
  searchTerm?: string,
  options?: UseQueryOptions<t.GetCategoriesResponse | undefined>,
) => {
  const { id: casinoId } = useCurrentCasino();

  return useQuery<t.GetCategoriesResponse | undefined>(
    [QUERY_KEYS.GET_CASINO_CATEGORIES, casinoId, searchTerm],
    () => getCategories(casinoId, searchTerm),
    options,
  );
};

export const useGetCategory = (
  categoryId?: string,
  options?: UseQueryOptions<t.GetCategoryResponse | undefined>,
) => {
  const { id: casinoId } = useCurrentCasino();

  return useQuery<t.GetCategoryResponse | undefined>(
    [QUERY_KEYS.GET_CASINO_CATEGORY, categoryId, casinoId],
    () => getCategory(categoryId || ''),
    options,
  );
};

export const useGetCategoryMachinesViews = (categoryId: string) => {
  return useQuery([QUERY_KEYS.GET_CATEGORY_MACHINES_VIEWS, categoryId], () =>
    getCategoryMachineViews(categoryId),
  );
};

export const usePostCategory = () => {
  return useMutation((payload: t.PostCategoryPayload) => postCategory(payload));
};

export const usePatchCategory = (categoryId: string) => {
  return useMutation((payload: t.PatchCategoryPayload) => patchCategory(categoryId, payload));
};

export const useDeleteCategory = () => {
  return useMutation((categoryId: string) => deleteCategory(categoryId));
};

export const useGetIsCategorySlugIsAvailable = (idToExclude?: string) => {
  return useMutation((slug: string) =>
    getIsCategorySlugIsAvailable(slug.trim(), idToExclude || ''),
  );
};

export const usePostMachineViewToCategory = () => {
  interface Params {
    categoryId: string;
    machineViewId: string;
    position?: number;
  }
  return useMutation(({ categoryId, machineViewId, position }: Params) =>
    postMachineViewToCategory(categoryId, machineViewId, position),
  );
};

export const useDeleteMachineViewInCategory = () => {
  return useMutation((categoryMachine: string) => deleteMachineViewInCategory(categoryMachine));
};

export const usePatchMachineViewCategoryPosition = () => {
  interface Params {
    categoryMachineId: string;
    position: number;
  }

  return useMutation(({ categoryMachineId, position }: Params) =>
    patchMachineViewCategoryPosition(categoryMachineId, position),
  );
};
