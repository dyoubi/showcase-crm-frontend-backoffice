import { CryptoCodes, FiatCodes } from '@/domains/currency';
import { ValueOf } from '@/utils/typescript.helpers';

export enum OperationCategoryEnum {
  DEPOSIT ='deposit',
  BET ='bet',
  WIN ='win',
  BONUS ='bonus',
  GIFT ='gift',
  INTERNAL ='internal',
  WITHDRAWAL ='withdrawal',
  REFUND ='refund',
  CANCEL ='cancel',
};

export enum OperationTypeEnum {
  DEBIT = -1,
  CREDIT = 1,
};

export type OperationType = typeof OperationTypeEnum[keyof typeof OperationTypeEnum];

export interface Balance {
  id: string;
  value: string;
  coin: CryptoCodes;
  unit: 'wei' | 'sun' | 'sat';
  accountId: string;
}

export interface BalanceWithHiddenBalance extends Balance {
  hiddenBalance: string;
  totalDeposited: string;
  totalWithdrawn: string;
}

export type GetPlayerBalances = readonly BalanceWithHiddenBalance[];

export interface Operation {
  balanceId: string;
  coin: CryptoCodes;
  createdBy: 'system';
  externalId: string;
  id: string;
  type: OperationType;
  updated: string;
  updatedBy: 'system';
  value: string;

  createdAt: string;
}

export type GetBalanceOperations = readonly Operation[];

export interface PostBalanceOperationPayload {
  /* created: string;
  createdBy: string;
  updated: string;
  updatedBy: string;
  deleted: true; */
  type: OperationType;
  // objectId: string;
  // externalId: string;
  amount: number;
  balanceId: string;
}

export type Session = Game & {
  coinBalance: CryptoCodes,
  coinInGame: FiatCodes,
  gameAccount: GameAccount;
  actions: Array<
    GameAction & {
      operation: Operation;
    }
  >;
};

export type PlayerAccount = {
  id: string;
  createdAt: string;
  externalId: string;
  cashierId: string;
  info: PlayerAccountInfo;
};

export type PlayerAccountInfo = {
  firstname: string;
  lastname: string;
  nickename: string;
  email: string;
  birthDate: string;
  registrationDate: string;
  city: string;
  country: string;
  gender: string;
  gameAccounts: GameAccount[];
};

export type GameAccount = {
  id: string;
  createdAt: string;
  inGameCurrency: string;
  balanceCurrency: string;
  externalId: string;
  balanceId: string;
  accountId: string;
  games: Game[];
};

export type Game = {
  id: string;
  createdAt: string;
  externalId: string;
  finished: boolean;
  gameAccountId: string;
  machineId: string;
  actions: GameAction[];
};

export type GameAction = {
  id: string;
  amount: number;
  balancePrecision: number;
  createdAt: string;
  data: GameActionData;
  externalId: string;
  gameId: string;
  state: string;
  type: ActionType;
  operation?: Operation;
};

export const ActionTypeEnum = {
  BET: 'bet',
  WIN: 'win',
} as const;

export type ActionType = ValueOf<typeof ActionTypeEnum>;

export type GameActionData = {
  action: string;
  amount: number;
  action_id: string;
  original_action_id: string;
};
