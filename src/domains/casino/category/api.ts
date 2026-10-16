import { encodeFilter, findItemFromId } from '@/utils';
import { casinoApiRequest } from '../../api';
import * as t from './types';
import { getCasinoMachinesViews } from '../machineView/api';

export const getCategories = async (casinoId: string, searchTerm?: string) => {
  const filter = {
    order: 'createdAt DESC',
    include: ['tags'],
    where: {
      or: [
        {
          name: { ilike: `%${searchTerm}%` },
        },
        { description: { ilike: `%${searchTerm}%` } },
      ],
    },
  } as const;

  const { data } = await casinoApiRequest.get<t.GetCategoriesResponse>(
    // TODO check with backend's team for remove filter param
    `/categories?filter=${encodeFilter(filter)}`,
  );

  return data;
};

export const postCategory = async (payload: t.PostCategoryPayload) => {
  const { data } = await casinoApiRequest.post<t.GetCategoryResponse>(`/categories`, {
    name: payload.name,
    key: payload.slug,
    image: { url: payload?.image?.url },
  });

  return data;
};

export const patchCategory = async (categoryId: string, payload: t.PatchCategoryPayload) => {
  const { data } = await casinoApiRequest.patch(`categories/${categoryId}`, {
    name: payload.name,
    key: payload.slug,
    image: { url: payload?.image?.url },
  });
  return data;
};

export const getCategory = async (categoryId: string) => {
  const filter = {
    include: ['tags'],
  } as const;

  const { data } = await casinoApiRequest.get<t.GetCategoryResponse>(
    // TODO check with backend's team for remove the filter param
    `categories/${categoryId}?filter=${encodeFilter(filter)}`,
  );

  return data;
};

export const deleteCategory = async (categoryId: string) => {
  await casinoApiRequest.delete(`categories/${categoryId}`);
};

export const addTagToCategory = async (categoryId: string, tagId: string) => {
  await casinoApiRequest.post(`/tag-categories`, {
    categoryId,
    tagId,
  });
};

export const removeTagToCategory = async (tagCategoryId: string) => {
  await casinoApiRequest.delete(`/tag-categories/${tagCategoryId}`);
};

export const getIsCategorySlugIsAvailable = async (slug: string, idToExclude: string) => {
  const filter = {
    where: {
      key: slug,
      id: idToExclude ? { neq: idToExclude } : undefined,
    },
  } as const;

  const { data } = await casinoApiRequest.get<t.GetCategoriesResponse>(
    // TODO check with backend's team for have a route for check if the slug is available
    `/categories?filter=${encodeFilter(filter)}`,
  );

  if (data?.length) {
    return false;
  }

  return true;
};

export const getCategoryMachineViews = async (categoryId: string) => {
  type Response = ReadonlyArray<{
    id: string;
    position: number;
    categoryId: string;
    machineId: string;
  }>;

  const filter = {
    where: {
      categoryId,
    },
    include: ['machine', 'category'],
    order: 'position ASC',
  } as const;

  const { data } = await casinoApiRequest.get<Response>(
    `category-machines?filter=${encodeFilter(filter)}`,
  );
  const machinesViews = await getCasinoMachinesViews();

  const categoryMachines = data.filter(
    (categoryMachine) => categoryMachine?.categoryId === categoryId,
  );

  return [...categoryMachines].map((item) => ({
    ...item,
    ...findItemFromId(item.machineId, machinesViews),
    categoryMachine: item.id,
  }));
};

export const postMachineViewToCategory = async (
  categoryId: string,
  machineViewId: string,
  position?: number,
) => {
  const { data } = await casinoApiRequest.post<void>(`category-machines`, {
    categoryId,
    machineId: machineViewId,
    position,
  });

  return data;
};

export const deleteMachineViewInCategory = async (categoryMachineId: string) => {
  await casinoApiRequest.delete(`category-machines/${categoryMachineId}`);
};

export const patchMachineViewCategoryPosition = async (
  categoryMachineId: string,
  position: number,
) => {
  const { data } = await casinoApiRequest.patch(`category-machines/${categoryMachineId}`, {
    position,
  });

  return data;
};
