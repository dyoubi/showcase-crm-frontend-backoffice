import { Address as PlayerAddress, Player, PlayerStatistics } from '@/domains/casino/player';
import { MethodType, OwnerType } from '@/domains/casino/player/deposits';
import { CryptoCodes } from '@/domains/currency';

// In sync with «finance-backend» service — packages/core/src/common/types/withdrawal.ts
export enum EWithdrawalStatus {
  APPROVED        = 'approved',        // approved by Fraud team
  CANCELLED       = 'cancelled',       // User facing 'CANCELLED' status
  DENIED_REFUND   = 'denied-refund',   // cancellation states
  DENIED_VOID_ALL = 'denied-void-all', // cancellation states
  FAILURE         = 'failure',
  PAID            = 'paid',
  PENDING         = 'pending',
  RETRACTED       = 'retracted',       // cancellation states
  SCHEDULED       = 'scheduled',       // validation stages
}
export type WithdrawalStatus = `${EWithdrawalStatus}`;

export enum EWithdrawalDemandStatus {
  OPEN        = 'open',
  IN_PROGRESS = 'in-progress',
  BLOCKED     = 'blocked',
  APPROVED    = 'approved',
  DENIED      = 'denied',
  RETRACTED   = 'retracted',
};

export enum EWithdrawalSortByType {
  AMOUNT = 'amount',
  CREATED_AT = 'createdAt',
  OWNER_USERNAME = 'ownerUsername',
}

export enum EWithdrawalSortDirectionType {
  ASC = 'ASC',
  DESC = 'DESC',
};

export enum ReportType {
  ACCOUNT_DUPLICATE = 'account-duplicate',
  BONUS_ABUSE = 'bonus-abuse',
  DNBO = 'dnbo',
  STRATEGIC_BETTING = 'strategic-betting',
  SUSPICIOUS_OPERATION = 'suspicous-operation',
  SUSPICIOUS_INCOME = 'suspicous-income',
}


export interface Report {
  id: string;
  blocking: boolean;
  reportType: ReportType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
  demandId: string;
  automatic: boolean;
};

export type Withdrawal = {
  id: string;
  amount: string;
  currency: string;
  fees: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info: Record<string, any>;
  methodId: string;
  methodType: MethodType;
  ownerId: string;
  ownerType: OwnerType;
  status: WithdrawalStatus;

  createdAt: Date;
  updatedAt: Date;
};

export interface WithdrawalDemand {
  id: string;
  amount: string;
  currency: CryptoCodes;
  merchantId: string;
  fees: string;
  feesRefunded: boolean;
  ownerId: string;
  ownerName: string;
  ownerUsername: string;
  refundedAmount?: string;
  status: EWithdrawalDemandStatus;
  withdrawalId: string;
  createdAt: string;
  updatedAt: string;
}

export interface WithdrawalDemandDetailResponse {
  demand: {
    id: WithdrawalDemand['id'];
    amount: WithdrawalDemand['amount'];
    // TODO: This will be implemented in a different ticket
    // comments: Comment[];
    currency: WithdrawalDemand['currency'];
    date: WithdrawalDemand['createdAt'];
    fees: WithdrawalDemand['fees'];
    feesRefunded: WithdrawalDemand['feesRefunded'],
    reports: Report[];
    refundedAmount: WithdrawalDemand['refundedAmount'];
    status: WithdrawalDemand['status'];
    walletAddress: Withdrawal['info']['address'];
  };

  player: {
    id: Player['id'];
    accountId: Player['accountId'];
    address: Player['address'];
    email: Player['email'];
    name: Player['firstname'] & Player['lastname'];
    // TODO: This implementation needs to be updated once the types are extracted from the projects
    points: NonNullable<Player['stats']>['rankPoint'];

    registrationDate: Player['createdAt'];
    status: NonNullable<Player['status']>;
    tags: Player['tags'];
    username: Player['nickname'];
    // TODO: This implementation needs to be updated once the types are extracted from the projects
  vipLevel: NonNullable<Player['stats']>['rankLevel'];
  };
}

type OmittedWithdrawalDemandListResponseTypes = 'amount'
  | 'createdAt'
  | 'merchantId'
  | 'ownerId'
  | 'ownerName'
  | 'ownerUsername'
  | 'updatedAt'
  | 'withdrawalId';

type OmittedPlayerWithdrawalDemandListResponseTypes = 'accountId'
  | 'address'
  | 'birthdate'
  | 'createdAt'
  | 'firstname'
  | 'gender'
  | 'id'
  | 'lastname'
  | 'privacy'
  | 'stats'
  | 'status';

export interface WithdrawalDemandListResponse extends Omit<WithdrawalDemand, OmittedWithdrawalDemandListResponseTypes> {
  amount: number;
  date: WithdrawalDemand['createdAt'];
  player: Omit<Player, OmittedPlayerWithdrawalDemandListResponseTypes> & {
    country?: PlayerAddress['country'];
    name: Player['firstname'] & Player['lastname'];
    registrationDate: Player['createdAt'];
    vipLevel: PlayerStatistics['rankLevel'];
  };
}

export interface GetWithdrawalFilter {
  currency?: WithdrawalDemandListResponse['currency'] | '';
  status?: WithdrawalDemandListResponse['status'] | '';
  username?: WithdrawalDemandListResponse['player']['nickname'];

  sortBy?: EWithdrawalSortByType;
  sortDirection?: EWithdrawalSortDirectionType;

  begin?: string;
  end?: string;
  limit?: number;
  offset?: number;
};

export interface GetWithdrawalsResponse {
  count: number;
  data: ReadonlyArray<WithdrawalDemandListResponse>;
};

export type GetWithdrawalDetailResponse = WithdrawalDemandDetailResponse;

export interface PostWithdrawalOperationsPayload {
  demandId?: string;
  feesRefunded?: boolean;
  refundedAmount?: number;
};
