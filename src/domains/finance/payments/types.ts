import { Player } from '@/domains/casino/player';
import { CryptoCodes } from '@/domains/currency';

import { Report, WithdrawalDemand } from '../withdrawals';

export enum EPaymentProviderKey {
  COINSPAID = 'coins-paid',
  HERO_PAYMENTS = 'hero-payments',
  RING = 'ring-payment'
}

export type PaymentProviderKey = `${EPaymentProviderKey}`;


export enum EPaymentMandateStatus {
  OPEN     = 'open',
  SENT     = 'sent',
  CANCELED = 'canceled',
  ERROR    = 'error',
};

export enum EPaymentMandateType {
  WITHDRAWAL = 'withdrawal',
  // REFUND = 'refund',
}

export type PaymentMandateStatus = `${EPaymentMandateStatus}`;
export type PaymentMandateType = `${EPaymentMandateType}`;

export enum PaymentMandateSortByType {
  AMOUNT = 'amount',
  CREATED_AT = 'createdAt',
  OWNER_USERNAME = 'ownerUsername',
}

export enum PaymentMandateSortDirectionType {
  ASC = 'ASC',
  DESC = 'DESC',
};


export interface Payment {
  id: string,
  error: string;
}

export interface PaymentMandate {
  id: string,
  address: string;
  amount: string;
  currency: CryptoCodes,
  entityId: string;
  ownerId: string;
  ownerUsername: string;
  provider: PaymentProviderKey;
  status: EPaymentMandateStatus;
  type: PaymentMandateType;
  sentAt?: Date;
  createdAt: string,
  updatedAt: string,
}

export interface PaymentMandateDetailResponse {
  demand: {
    id: WithdrawalDemand['id'],
    amount: WithdrawalDemand['amount'],
    currency: WithdrawalDemand['currency'],
    date: WithdrawalDemand['createdAt'],
    reports: Report[],
    status: WithdrawalDemand['status'],
  },

  mandate: {
    id: PaymentMandate['id'],
    address: PaymentMandate['address'],
    amount: PaymentMandate['amount'],
    currency: PaymentMandate['currency'],
    date: PaymentMandate['createdAt'],
    entityId: PaymentMandate['entityId'],
    error: Payment['error'];
    status: PaymentMandate['status'],
    type: PaymentMandate['type'],
  };

  player: {
    id: Player['id'],
    accountId: Player['accountId'],
    address: Player['address'],
    email: Player['email'],
    name: Player['firstname'] & Player['lastname'],
    // TODO: This implementation needs to be updated once the types are extracted from the projects
    points: NonNullable<Player['stats']>['rankPoint'],

    registrationDate: Player['createdAt'],
    status: NonNullable<Player['status']>,
    tags: Player['tags'],
    username: Player['nickname'],
    // TODO: This implementation needs to be updated once the types are extracted from the projects
  vipLevel: NonNullable<Player['stats']>['rankLevel'],
  };
}


export interface PaymentMandateListResponse {
  id: PaymentMandate['id'];
  amount: number;
  currency: PaymentMandate['currency'];
  date: PaymentMandate['createdAt'];
  status: PaymentMandate['status'];
  username: Player['nickname'];
}

export interface GetPaymentMandatesFilter {
  currency?: PaymentMandateListResponse['currency'] | '';
  status?: PaymentMandateListResponse['status'] | '';

  sortBy?: PaymentMandateSortByType;
  sortDirection?: PaymentMandateSortDirectionType;

  begin?: string;
  end?: string;
  limit?: number;
  offset?: number;
};

export type GetPaymentMandateDetailResponse = PaymentMandateDetailResponse;

export interface GetPaymentMandatesResponse {
  count: number,
  data: ReadonlyArray<PaymentMandateListResponse>,
};


export interface PostPaymentMandateOperationsPayload {
  mandateId?: string,
  feesRefunded?: boolean,
  refundedAmount?: number,
};
