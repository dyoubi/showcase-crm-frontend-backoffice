import { OptionType } from '@/shared/Select';
import {
    WithdrawalDemandListResponse as WithdrawalBase,
    EWithdrawalSortByType,
    EWithdrawalSortDirectionType,
} from '@/domains/finance/withdrawals';

export interface FormType {
    username: string;
    currency: CurrencyType;
    status: StatusType;
}

export interface WithdrawalFilters {
    username: string;
    currency: CurrencyType;
    status: StatusType;
};

export interface WithdrawalSort {
    sortBy: EWithdrawalSortByType;
    sortDirection: EWithdrawalSortDirectionType;
};

export type CurrencyType = OptionType<WithdrawalBase['currency']>;
export type StatusType = OptionType<WithdrawalBase['status'] | ''>;
export type Withdrawal = WithdrawalBase;
