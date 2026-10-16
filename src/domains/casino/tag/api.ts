import { encodeFilter } from '@/utils';
import { casinoApiRequest } from '../../api';
import { getApiRouteByEntityType, getPayloadKeyFromEntityType } from './logic.helper';
import * as t from './types';

export const getCasinoTags = async (
  casinoId: string,
  tagType?: t.Tag['type'],
  searchTerm?: string,
) => {
  const filter = {
    order: 'createdAt DESC',
    where: {
      name: { ilike: `%${searchTerm || ''}%` },
      type: tagType || undefined,
    },
  };

  const { data } = await casinoApiRequest.get<t.GetCasinoTagsResponse>(
    `/tags?filter=${encodeFilter(filter)}`,
  );

  return data;
};

export const postCasinoTag = async (
  casinoId: string,
  { id, ...payload }: t.PostCasinoTagPayload,
) => {
  const isPatch = !!id;

  if (isPatch) {
    const { data } = await casinoApiRequest.patch<void>(`/tags/${id}`, payload);

    return data;
  }

  const { data } = await casinoApiRequest.post<void>(`/tags`, payload);

  return data;
};

export const deleteCasinoTag = async (casinoId: string, tagId: string) => {
  const { data } = await casinoApiRequest.delete<t.DeleteCasinoTagResponse>(`/tags/${tagId}`);

  return data;
};

export const postAssociateTagToEntity = async ({
  entityType,
  tagId,
  entityId,
}: t.PostAssociateTagToEntityPayload) => {
  const apiEndPoint = getApiRouteByEntityType(entityType);
  await casinoApiRequest.post(apiEndPoint, {
    tagId,
    [getPayloadKeyFromEntityType(entityType)]: entityId,
  });
};

export const getTagsAssociatedToEntity = async ({
  entityType,
  entityId,
}: t.GetAssociatedTagsToEntityParams) => {
  const where = {
    [getPayloadKeyFromEntityType(entityType)]: entityId,
  } as const;
  const apiEndPoint = getApiRouteByEntityType(entityType);
  const { data } = await casinoApiRequest.get<t.GetAssociationsReponse>(
    `${apiEndPoint}?where=${encodeFilter(where)}`,
  );

  // TODO WHEN Backend fix the where bug remove this filter
  return data.filter(
    (association) => association[getPayloadKeyFromEntityType(entityType)] === entityId,
  );
};

export const deleteTagAssociation = async ({
  associationId,
  entityType,
}: t.DeleteTagAssociationPayload) => {
  const apiEndPoint = getApiRouteByEntityType(entityType);

  await casinoApiRequest.delete(`${apiEndPoint}/${associationId}`);
};

export const deleteAllTagsAssociated = async ({
  entityType,
  entityId,
}: t.DeleteAllTagsAssociatedPayload) => {
  const data = await getTagsAssociatedToEntity({
    entityType,
    entityId,
  });

  return Promise.all(
    data.map((association) =>
      deleteTagAssociation({
        associationId: association.id,
        entityType,
      }),
    ),
  );
};
