export type ContentStore = {
  id: string;
  operator_id: string;
  org_id: string;
  name: string;
  root: string;
  created_at: string;
  updated_at: string;
};

export type GetStoresResponse = Array<ContentStore>;

export enum StoreMediaSortByOptions {
  CreatedAt = 'created_at',
  UpdatedAt = 'updated_at',
  Name = 'name',
}

export enum StoreMediaSortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type GetStoreFilesResponseFilter = {
  storeId: string;
  sortBy?: StoreMediaSortByOptions;
  sortDirection?: StoreMediaSortDirection;
  limit?: number;
  offset?: number;
};

export type StoreMedia = {
  id?: string;
  guid: string;
  name: string;
  file_id: string;
  file_name: string;
  file_extension: string;
  description?: string;
  mimetype: string;
  revision: number;
  store_id: string;
  store_path: string;
  size: number;
  created_at: string;
  updated_at: string;
};

export type GetStoreFilesResponse = Array<StoreMedia>;

export type PostStoreFileResponse = StoreMedia;

export type GetStoreFilesSearchFilter = GetStoreFilesResponseFilter & {
  match: string;
};
