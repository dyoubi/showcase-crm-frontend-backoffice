import { PostContentPayload, ContentRequestDTO } from '../content';

export interface PostPromotionPayload {
  key?: string;
  startDate?: Date;
  endDate?: Date;
  name?: string;
  active?: boolean;
  title?: PostContentPayload;
  body?: PostContentPayload;
  terms?: PostContentPayload;
  banner?: PostContentPayload;
  header?: PostContentPayload;
  thumbnail?: PostContentPayload;
}

export interface PatchPromotionPayload {
  key?: string;
  name?: string;
  startDate?:string;
  endDate?:string;
}
export type GetPromotionsResponse = ReadonlyArray<{
  id: string;
  banner: ContentRequestDTO;
  bannerId: string;
  bodyId: string;
  casinoId: string;
  headerId: string;
  key: string;
  name?: string;
  slug: string;
  termsId: string;
  thumbnail: ContentRequestDTO;
  thumbnailId: string;
  titleId: string;
}>;

export interface GetPromotionResponse {
  id: string;
  key: string;
  name: string;
  startDate: string;
  slug: string;
  endDate: string;
  bannerId: string;
  bodyId: string;
  casino: string;
  headerId: string;
  termsId: string;
  thumbnailId: string;
  titleId: string;
  banner: ContentRequestDTO;
  body: ContentRequestDTO;
  header: ContentRequestDTO;
  terms: ContentRequestDTO;
  thumbnail: ContentRequestDTO;
  title: ContentRequestDTO;
}

export type PostPromotionResponse = {
  id: string;
  key: string;
  startDate: string;
  slug: string;
  endDate: string;
  bannerId: ContentRequestDTO;
  bodyId: ContentRequestDTO;
  casino: ContentRequestDTO;
  headerId: ContentRequestDTO;
  termsId: ContentRequestDTO;
  thumbnailId: ContentRequestDTO;
  titleId: ContentRequestDTO;
};
