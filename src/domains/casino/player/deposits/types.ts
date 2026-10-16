export enum EDepositMethodStatus {
	ACTIVE = 'active',
	INTERNAL = 'internal',
	BLOCKED = 'blocked'
}
export type DepositMethodStatus = `${EDepositMethodStatus}`;

export enum EMethodType {
	CREDIT_CARD = 'credit-card',
	CRYPTO = 'crypto',
}
export type MethodType = `${EMethodType}`;

export enum EOwnerType {
  BRAND = 'brand',
  PLAYER = 'player',
  ACCOUNT = 'account',
  /* ... */
};
export type OwnerType = `${EOwnerType}`;

export interface WalletAddress {
  id: string,
  address: string;
  currency: string;
  info: Record<string, string>;
  merchantId: string,
  methodType: MethodType,
  ownerId: string;
  ownerType: string;
  provider: string;
  status: DepositMethodStatus;
  createdAt: string,
  updatedAt: string,
}

export type GetPlayerAddresses = WalletAddress[];
