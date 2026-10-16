import { DeepPartial } from '@/utils/typescript.helpers';

import { Bonus } from '../bonus';
import { Tag } from '../tag';

import { Player } from './player.types';

export interface CountPlayers {
  count: number;
}

export enum EPlayersSortByType {
  CREATED_AT = 'createdAt',
}
export type PlayersSortByType = `${EPlayersSortByType}`;

export enum EPlayersSortDirectionType {
  ASC = 'ASC',
  DESC = 'DESC',
};
export type PlayersSortDirectionType = `${EPlayersSortDirectionType}`;

export interface PlayerWithBonuses extends Player {
  bonuses?: ReadonlyArray<Bonus>;
}

export type PatchPlayerPayload = DeepPartial<
  Omit<Player, 'createdAt' | 'createdBy' | 'updated' | 'updatedBy' | 'userId' | 'casinoId'>
> & { id: string };

export type GetPlayersList = ReadonlyArray<Player>;
export type GetPlayerResponse = PlayerWithBonuses;
export type PatchPlayerResponse = void;

export interface GetPlayersListFilter {
  searchTerm?: string;
  tags?: readonly Tag['id'][];

  sortBy?: PlayersSortByType;
  sortDirection?: PlayersSortDirectionType;

  begin?: string;
  end?: string;
  limit?: number;
  offset?: number;
};

export type IncludeFilters = (string | object)[];

export interface GetPlayersWithBonusesResponse extends CountPlayers{
  data: ReadonlyArray<PlayerWithBonuses>;
};
export interface GetPlayersResponse extends CountPlayers{
  data: ReadonlyArray<Player>;
};
