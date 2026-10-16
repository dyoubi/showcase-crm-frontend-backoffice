export interface CarrouselItem {
  priority: number;
  duration: number;
  redirection: string;
  contentId: string;
  promotionId: string;
  promotionSlug: string;
}

/** API types * */
export interface GetCarrouselResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  key: string;
  items: ReadonlyArray<CarrouselItem>;
  casinoId: string;
}

export type GetCarrouselsResponse = ReadonlyArray<{
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  key: string;
  items: ReadonlyArray<CarrouselItem>;
  casinoId: string;
}>;

export interface PostCarrouselResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  key: string;
  items: ReadonlyArray<CarrouselItem>;
  casinoId: string;
}

export interface PostCarrouselPayload {
  key?: string;
  items: ReadonlyArray<CarrouselItem>;
}

export interface PatchCarrouselPayload {
  id: string;
  key?: string;
  items: ReadonlyArray<CarrouselItem>;
}

/** End API types * */
