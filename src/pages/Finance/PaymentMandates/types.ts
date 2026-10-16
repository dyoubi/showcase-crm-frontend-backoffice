import {
    PaymentMandateListResponse,
    PaymentMandateSortByType,
    PaymentMandateSortDirectionType,
} from '@/domains/finance/payments';
import { OptionType } from '@/shared/Select';

export interface FormType {
    currency: CurrencyType;
    status: StatusType;
}

export interface PaymentFilters {
    currency: CurrencyType;
    status: StatusType;
};

export interface PaymentSort {
    sortBy: PaymentMandateSortByType;
    sortDirection: PaymentMandateSortDirectionType;
};

export type CurrencyType = OptionType<PaymentMandateListResponse['currency']>;
export type StatusType = OptionType<PaymentMandateListResponse['status'] | ''>;
export type PaymentMandate = PaymentMandateListResponse;
