import { Tag } from '../tag';

export type GetCasinoMachinesViewsResponse = Array<MachineView>;
export type GetMachineViewResponse = MachineView;

export interface MachineView {
  id: string;
  key: string;
  activate: boolean;
  title: string;
  description: string;
  casinoId: string;
  provider?: string;
  operatorId: string;
  tags?: ReadonlyArray<Tag>;
  image?: {
    desktop?: {
      url?: string;
    };
    mobile?: {
      url?: string;
    };
  };
}

export interface PostMachineViewPayload {
  id?: string;
  key: string;
  activate?: boolean;
  title: string;
  description: string;
  casinoId: string;
  operatorId?: string;
  image?: {
    desktop?: {
      url?: string;
    };
    mobile?: {
      url?: string;
    };
  };
}

export interface PatchMachineViewPayload {
  key: string;
  activate?: boolean;
  title: string;
  description: string;
  casinoId: string;
  operatorId?: string;
  image?: {
    desktop?: {
      url?: string;
    };
    mobile?: {
      url?: string;
    };
  };
}

export type PostMachineViewReponse = MachineView;
export type PatchMachineViewReponse = MachineView;
