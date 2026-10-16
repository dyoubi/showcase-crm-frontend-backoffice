
import * as yup from 'yup';

import { useDenyRefundPaymentMandate, useDenyVoidAllPaymentMandate } from '@/domains/finance/payments';
import { useDenyRefundWithdrawalDemand, useDenyVoidAllWithdrawalDemand } from '@/domains/finance/withdrawals';

import * as t from './types';

export const useDenyRequestModal = (props: t.DenyRequestHookProps) => {
  const { requestId, type } = props;

  const { mutateAsync: denyRefundPaymentMandate,  isLoading: isLoadingDenyRefundPaymentMandate } = useDenyRefundPaymentMandate({ mandateId: requestId });
  const { mutateAsync: denyRefundWithdrawal,      isLoading: isLoadingDenyRefundWithdrawal }     = useDenyRefundWithdrawalDemand({ demandId: requestId });
  const { mutateAsync: denyVoidAllPaymentMandate, isLoading: isLoadingVoidAllPaymentMandate }    = useDenyVoidAllPaymentMandate({ mandateId: requestId });
  const { mutateAsync: denyVoidAllWithdrawal,     isLoading: isLoadingVoidAllWithdrawal }        = useDenyVoidAllWithdrawalDemand({ demandId: requestId });

  return {
    denyRefundRequest:  (type === t.EDenyRequest.DEMAND) ? denyRefundWithdrawal          : denyRefundPaymentMandate,
    denyVoidAllRequest: (type === t.EDenyRequest.DEMAND) ? denyVoidAllWithdrawal         : denyVoidAllPaymentMandate,
    isLoadingRefund:    (type === t.EDenyRequest.DEMAND) ? isLoadingDenyRefundWithdrawal : isLoadingDenyRefundPaymentMandate,
    isLoadingVoidAll:   (type === t.EDenyRequest.DEMAND) ? isLoadingVoidAllWithdrawal    : isLoadingVoidAllPaymentMandate,
  };
};

export const useDenyRequestValidation = (props: t.UseDenyRequestValidationProps): yup.SchemaOf<t.DenyRefundForm> => {
  const {
    currency,
    maxAmount,
  } = props;

  return yup
    .object()
    .shape({
      refundedAmount: yup
        .number()
        .max(
          maxAmount,
          `Maximum amount: ${maxAmount} ${currency}`,
        )
        .required('This field is required'),
    })
    .required();
};
