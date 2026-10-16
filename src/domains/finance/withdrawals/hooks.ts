import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query';
import { QUERY_KEYS } from '@/libs/react-query';

import { useCurrentCasino } from '@/domains/casino/hooks';

import {
  getWithdrawalDemandDetail,
  getWithdrawalDemandsList,
  postApproveWithdrawalDemand,
  postDenyRefundWithdrawalDemand,
  postDenyVoidAllWithdrawalDemand,
} from './api';

import * as t from './types';


// -----------------------------------------------
// Mutations
// -----------------------------------------------

export const useApproveWithdrawalDemand = (props: t.PostWithdrawalOperationsPayload) => {
  const { demandId } = props;

  const { key: casinoKey } = useCurrentCasino();
  const queryClient = useQueryClient();

  return useMutation(async () => postApproveWithdrawalDemand(casinoKey, demandId), {
    onSettled: async () => queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.GET_WITHDRAWAL_DEMAND_DETAIL, demandId],
    }),
  });
};

export const useDenyRefundWithdrawalDemand = (props: t.PostWithdrawalOperationsPayload) => {
  const { demandId } = props;

  const { key: casinoKey } = useCurrentCasino();
  const queryClient = useQueryClient();

  return useMutation(async (
    formValues: { feesRefunded?: boolean, refundedAmount?: number }
  ) => postDenyRefundWithdrawalDemand(casinoKey, demandId, formValues.feesRefunded, formValues.refundedAmount), {
    onSettled: async () => queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.GET_WITHDRAWAL_DEMAND_DETAIL, demandId],
    }),
  });
};

export const useDenyVoidAllWithdrawalDemand = (props: t.PostWithdrawalOperationsPayload) => {
  const { demandId } = props;

  const { key: casinoKey } = useCurrentCasino();
  const queryClient = useQueryClient();

  return useMutation(async () => postDenyVoidAllWithdrawalDemand(casinoKey, demandId), {
    onSettled: async () => queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.GET_WITHDRAWAL_DEMAND_DETAIL, demandId],
    }),
  });
};


// -----------------------------------------------
// Queries
// -----------------------------------------------

export const useGetWithdrawalDemandDetail = (
  demandId?: t.WithdrawalDemand['id'],
  options?: UseQueryOptions<t.GetWithdrawalDetailResponse | undefined>,
) => {
  const { key: casinoKey } = useCurrentCasino();

  return useQuery<t.GetWithdrawalDetailResponse | undefined>(
    [QUERY_KEYS.GET_WITHDRAWAL_DEMAND_DETAIL, demandId],
    () => getWithdrawalDemandDetail(casinoKey, demandId),
    options,
  );
};

export const useGetWithdrawalDemandsList = (
  filter?: t.GetWithdrawalFilter,
  options?: UseQueryOptions<t.GetWithdrawalsResponse | undefined>,
) => {
  const { key: casinoKey } = useCurrentCasino();

  return useQuery<t.GetWithdrawalsResponse | undefined>(
    [QUERY_KEYS.GET_WITHDRAWALS_DEMANDS, filter],
    () => getWithdrawalDemandsList(filter || {}, casinoKey),
    options,
  );
};
