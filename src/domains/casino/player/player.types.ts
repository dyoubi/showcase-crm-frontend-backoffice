import { ValueOf } from '@/utils/typescript.helpers';
import { Tag } from '../tag';

// this interface is isolated in another file for prevent circular dependency

export interface PrivacySettings {
  rain: boolean;
  statistics: boolean;
  ghost: boolean;
}

export interface Address {
  country: string;
  city: string;
  street: string;
  streetNumber: string;
  streetType?: string;
  postalCode?: string;
  officeBoxNumber?: string | number;
  state?: string;
  locality?: string;
  region?: string;
}

export interface PlayerStatistics {
  rankLevel: number;
  rankPoint: number;
}

interface PlayerPrivacySettings {
  rain: boolean;
  statistics: boolean;
  ghost?: boolean;
}

export const PlayerStatusEnum = {
  PENDING: 'pending',
  VALIDATED: 'validated',
  ACTIVATED: 'activated',
  BANNED: 'banned',
  FROZEN: 'frozen',
  SELF_EXCLUDE: 'self-exclude',
} as const;

export type PlayerStatus = ValueOf<typeof PlayerStatusEnum>;

export type PlayerMetadata = {
  affiliateToken?: string;
  [key: string]: unknown;
};

export interface Player {
  id: string;
  email?: string;
  tags?: ReadonlyArray<Tag>;
  nickname?: string;
  firstname?: string;
  lastname?: string;
  address?: Address;
  gender?: 'm' | 'f';
  birthdate?: string | number;
  stats?: PlayerStatistics;
  privacy?: PlayerPrivacySettings;
  status?: PlayerStatus;
  frozenAt?: Date;
  frozenUntil?: Date;
  accountId: string;
  createdAt: string;
  updatedAt: string;
  marketingAcceptation?: boolean;
  metadata: PlayerMetadata;
}
