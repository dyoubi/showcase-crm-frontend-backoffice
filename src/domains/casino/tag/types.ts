import { ValueOf } from '@/utils/typescript.helpers';

export const TagTypeEnums = {
  PLAYER: 'player',
  MACHINE: 'machine',
} as const;

export type TagType = ValueOf<typeof TagTypeEnums>;

export interface Tag {
  id: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  key: string;
  name: string;
  color: string;
  type: TagType;
  internal: boolean;
  casinoId: string;
}

export type GetCasinoTagsResponse = Array<Tag>;

export interface PostCasinoTagPayload {
  id?: string;
  key: string;
  name?: string;
  color: string;
  type: TagType;
  // TODO: check with backend team the purpose of this field
  // internal: boolean;
}

export type PostCasinoTagResponse = Tag;

export interface DeleteCasinoTagResponse {
  count: number;
}

export interface DeleteTagAssociationPayload {
  associationId: string;
  entityType: AssociationType;
}
export interface DeleteAllTagsAssociatedPayload {
  entityType: AssociationType;
  entityId: string;
}

export interface GetAssociatedTagsToEntityParams {
  entityType: AssociationType;
  entityId?: string;
}

export type AssociationType = 'machine' | 'category' | 'player';

export interface PostAssociateTagToEntityPayload {
  entityType: AssociationType;
  tagId: string;
  entityId?: string;
}

export type GetAssociationsReponse = ReadonlyArray<{
  id: string;
  tagId: string;
  playerId?: string;
  categoryId?: string;
  machineId?: string;
}>;
