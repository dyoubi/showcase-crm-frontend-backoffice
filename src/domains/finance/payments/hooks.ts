import { useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { QUERY_KEYS } from '@/libs/react-query';

import { useCurrentCasino } from '@/domains/casino/hooks';

import {
  getPaymentMandateDetail,
  getPaymentMandatesList,
  postDenyRefundPaymentMandate,
  postDenyVoidAllPaymentMandate,
  postSendPaymentMandate,
} from './api';

import * as t from './types';


// -----------------------------------------------
// Mutations
// -----------------------------------------------

export const useSendPaymentMandate = (props: t.PostPaymentMandateOperationsPayload) => {
  const { mandateId } = props;

  const { key: casinoKey } = useCurrentCasino();
  const queryClient = useQueryClient();

  return useMutation(async () => postSendPaymentMandate(casinoKey, mandateId), {
    onSettled: async () => queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.GET_PAYMENT_MANDATE_DETAIL, mandateId],
    }),
  });
};

export const useDenyRefundPaymentMandate = (props: t.PostPaymentMandateOperationsPayload) => {
  const { mandateId } = props;

  const { key: casinoKey } = useCurrentCasino();
  const queryClient = useQueryClient();

  return useMutation(async (
    formValues: { feesRefunded?: boolean, refundedAmount?: number }
  ) => postDenyRefundPaymentMandate(casinoKey, mandateId, formValues.feesRefunded, formValues.refundedAmount), {
    onSettled: async () => queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.GET_PAYMENT_MANDATE_DETAIL, mandateId],
    }),
  });
};

export const useDenyVoidAllPaymentMandate = (props: t.PostPaymentMandateOperationsPayload) => {
  const { mandateId } = props;

  const { key: casinoKey } = useCurrentCasino();
  const queryClient = useQueryClient();

  return useMutation(async () => postDenyVoidAllPaymentMandate(casinoKey, mandateId), {
    onSettled: async () => queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.GET_PAYMENT_MANDATE_DETAIL, mandateId],
    }),
  });
};


// -----------------------------------------------
// Queries
// -----------------------------------------------

export const useGetPaymentMandateDetail = (
  mandateId?: t.PaymentMandate['id'],
  options?: UseQueryOptions<t.GetPaymentMandateDetailResponse | undefined>,
) => {
  const { key: casinoKey } = useCurrentCasino();

  return useQuery<t.GetPaymentMandateDetailResponse | undefined>(
    [QUERY_KEYS.GET_PAYMENT_MANDATE_DETAIL, mandateId],
    () => getPaymentMandateDetail(casinoKey, mandateId),
    options,
  );
};

export const useGetPaymentMandatesList = (
  filter?: t.GetPaymentMandatesFilter,
  options?: UseQueryOptions<t.GetPaymentMandatesResponse | undefined>,
) => {
  const { key: casinoKey } = useCurrentCasino();

  return useQuery<t.GetPaymentMandatesResponse | undefined>(
    [QUERY_KEYS.GET_PAYMENT_MANDATES, filter],
    () => getPaymentMandatesList(filter || {}, casinoKey),
    options,
  );
};
