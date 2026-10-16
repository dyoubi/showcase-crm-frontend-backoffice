import { Casino } from '@/domains/casino/types';

import { encodeFilter } from '@/utils';

import { financeApiRequest } from '../../api';

import * as t from './types';

// -----------------------------------------------
// GET
// -----------------------------------------------

export const getWithdrawalDemandDetail = async (casinoKey: Casino['key'], demandId?: t.WithdrawalDemand['id']) => {
  if (!demandId) {
    return undefined;
  }

  const { data: response } = await financeApiRequest.get<t.GetWithdrawalDetailResponse>(`/fraud/${casinoKey}/withdrawal-demand/${demandId}`);

  return response;
};

export const getWithdrawalDemandsList = async (filter: t.GetWithdrawalFilter, casinoKey: Casino['key']) => {;
  const {
    currency,
    status,
    username,

    sortBy,
    sortDirection,

    limit,
    offset,
  } = filter;

  const parsedFilters = {
    where: {
      currency: currency || undefined,
      status: status || undefined,
      ...((username) ? { ownerUsername: { like: `%${username}%` } } : {}),
    },

    sort: { [sortBy as string]: sortDirection },

    limit,
    offset,
  } as const;

  const { data: response } = await financeApiRequest.get<t.GetWithdrawalsResponse>(`/fraud/${casinoKey}/withdrawal-demands?query=${encodeFilter(parsedFilters)}`);

  if (!response) {
    return {
      count: 0,
      data: [],
    }
  }

  return {
    count: response.count,
    data: response.data,
  };
};


// -----------------------------------------------
// POST
// -----------------------------------------------

export const postApproveWithdrawalDemand = async (casinoKey: Casino['key'], demandId: t.PostWithdrawalOperationsPayload['demandId']) => {
  if (!demandId) {
    throw new Error('Invalid Demand ID. Please refresh the page and try again.');
  }

  const { data: response } = await financeApiRequest.post(`/fraud/${casinoKey}/withdrawal-demand/${demandId}/approve`);

  return response;
};

export const postDenyRefundWithdrawalDemand = async (
  casinoKey: Casino['key'],
  demandId: t.PostWithdrawalOperationsPayload['demandId'],
  feesRefunded: t.PostWithdrawalOperationsPayload['feesRefunded'],
  refundedAmount: t.PostWithdrawalOperationsPayload['refundedAmount'],
) => {
  if (!demandId) {
    throw new Error('Invalid Demand ID. Please refresh the page and try again.');
  }

  if (!refundedAmount) {
    throw new Error('Please select a valid refund amount.');
  }

  const { data: response } = await financeApiRequest.post(`/fraud/${casinoKey}/withdrawal-demand/${demandId}/deny-refund`, {
    feesRefunded,
    refundedAmount,
  });

  return response;
};

export const postDenyVoidAllWithdrawalDemand = async (casinoKey: Casino['key'], demandId: t.PostWithdrawalOperationsPayload['demandId']) => {
  if (!demandId) {
    throw new Error('Invalid Demand ID. Please refresh the page and try again.');
  }

  const { data: response } = await financeApiRequest.post(`/fraud/${casinoKey}/withdrawal-demand/${demandId}/deny-void-all`);

  return response;
};
