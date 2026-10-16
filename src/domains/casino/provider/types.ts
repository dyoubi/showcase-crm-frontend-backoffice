export type GetProvidersResponse = ReadonlyArray<{
  id: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  key: string;
  name: string;
  operatorId: string;
  aggregatorName: string;
  description: string;
  activate: boolean;
  position: number;
  image: {
    desktop: {
      url?: string;
    };
  };
  casinoId: string;
}>;

export interface PatchProviderPayload {
  name?: string;
  position?: number;
  activate?: boolean;
  image?: string;
}
