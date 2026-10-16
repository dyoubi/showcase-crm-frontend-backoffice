import { CryptoCodes } from '@/domains/currency';

import { Player } from '../player/player.types';
import { Tag } from '../tag';

export interface AssignBonusProps {
  bonusId: string;
  tagIds: readonly Tag['id'][];
}

export interface AssignBonusByPlayerId {
  bonusId: string;
  playerId: Player['id'];
}

export enum EBonusType {
  AUTO        = 'auto',
  FIXE        = 'fixe',
  NEW         = 'new', // Only implemented in Ring Office when creating a new bonus
  RETRIBUTION = 'retribution',
  RELOAD      = 'reload',
};
export type BonusType = `${EBonusType}`;

export enum EBonusSortOptions {
  NEW_TO_OLD = 'New → Old',
  OLD_TO_NEW = 'Old → New',
};
export type BonusSortOptions = `${EBonusSortOptions}`;

export interface RankOverride {
  [key: string]: {
    amount?: number;
    period?: number;
    loosePercent?: number;
    minimum?: number;
    maximum?: number;
  };
}

export interface RetributionBonusParameters {
  loosePercent?: number;
  minimum?: number;
  maximum?: number;
}

export interface BonusParameters {
  amount?: number;
  period?: number;
  rankOverrides?: RankOverride;
}

export interface Bonus {
  id: string;
  assignations?: Array<BonusAssignation>;
  casinoId: string;
  code: string;
  description: string;
  limitations: ReadonlyArray<CryptoCodes>;
  name: string;
  parameters: RetributionBonusParameters & BonusParameters & AutoBonusParameters;
  type: BonusType;
  endAt: string;
  startAt: string;
}

export interface BonusAssignation {
  id: string;
  bonus: Bonus;
  bonusId: string;
  createdBy: 'system';
  player: Player;
  playerId: string;
  received: boolean;
  createdAt: string;
  receivedAt: string;
  updatedAt: string;
  updatedBy: 'system';
}

export type AutoBonusAction = 'deposit';

export type BonusComputeMode = 'percent' | 'absolute';

export const BonusComputeModeEnums = {
  PERCENT: 'percent',
  ABSOLUTE: 'absolute',
} as const;

export interface AutoBonusParameters extends BonusParameters {
  action?: AutoBonusAction;
  onetime?: boolean;
  lifetime?: number;
  filters?: Record<string, string | number | boolean>;
  computeMode?: BonusComputeMode;
  useActionCurrency?: boolean;
  limitations?: string[];
  minimum?: number;
  maximum?: number;
  // value?: number;
}

export interface GetBonusesFilters {
  searchTerm?: string;
  sortByOption?: BonusSortOptions;
  filter?: {
    where?: any,
    include?: Array<string>,
  }
}

export interface GetAssignedBonusProps {
  playerId: Player['id'];
  filter?: {
    include?: Array<string>;
  }
}

export type GetAssignedBonusResponse = Array<BonusAssignation>;

// TODO @GET-BONUSES: We could implement two different API calls for active and expired.
//                    In this way, we can only request the expired bonuses only when the table is loaded on the page.
export type GetBonusesResponse = {
  activeBonuses: Bonus[],
  expiredBonuses: Bonus[],
};

export type GetBonusResponse = Bonus;

export type PostBonusPayload = {
  id?: string;
  type: BonusType;
  code: string;
  name: string;
  startAt: string;
  endAt: string;
  description: string;
  parameters: RetributionBonusParameters & BonusParameters;
};

export type PostBonusResponse = Bonus;

export type GetBonusAssignationsResponse = ReadonlyArray<BonusAssignation>;

export interface DeleteAssignationPayload {
  bonusId: string;
  assignationId: string;
}
