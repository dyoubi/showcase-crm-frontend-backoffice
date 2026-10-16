import { Casino } from '@/domains/casino/types';

import { encodeFilter } from '@/utils';

import { financeApiRequest } from '../../api';

import * as t from './types';

// -----------------------------------------------
// GET
// -----------------------------------------------

export const getPaymentMandateDetail = async (casinoKey: Casino['key'], mandateId?: t.PaymentMandate['id']) => {
  if (!mandateId) {
    return undefined;
  }

  const { data: response } = await financeApiRequest.get<t.GetPaymentMandateDetailResponse>(`/merchant/${casinoKey}/payment-mandate/${mandateId}`);

  return response;
};

export const getPaymentMandatesList = async (filter: t.GetPaymentMandatesFilter, casinoKey: Casino['key']) => {;
  const {
    currency,
    status,

    sortBy,
    sortDirection,

    limit,
    offset,
  } = filter;

  const parsedFilters = {
    where: {
      currency: currency || undefined,
      status: status || undefined,
    },

    sort: { [sortBy as string]: sortDirection },

    limit,
    offset,
  } as const;

  const { data: response } = await financeApiRequest.get<t.GetPaymentMandatesResponse>(`/merchant/${casinoKey}/payment-mandates?query=${encodeFilter(parsedFilters)}`);

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

export const postDenyRefundPaymentMandate = async (
  casinoKey: Casino['key'],
  mandateId: t.PostPaymentMandateOperationsPayload['mandateId'],
  feesRefunded: t.PostPaymentMandateOperationsPayload['feesRefunded'],
  refundedAmount: t.PostPaymentMandateOperationsPayload['refundedAmount'],
) => {
if (!mandateId) {
    throw new Error('Missing payment mandate ID. Please refresh the page and try again.');
  }

  if (!refundedAmount) {
    throw new Error('Please select a valid refund amount.');
  }

  const { data: response } = await financeApiRequest.post(`/merchant/${casinoKey}/payment-mandate/${mandateId}/deny-refund`, {
    feesRefunded,
    refundedAmount,
  });

  return response;
};

export const postDenyVoidAllPaymentMandate = async (casinoKey: Casino['key'], mandateId: t.PostPaymentMandateOperationsPayload['mandateId']) => {
if (!mandateId) {
    throw new Error('Missing payment mandate ID. Please refresh the page and try again.');
  }

  const { data: response } = await financeApiRequest.post(`/merchant/${casinoKey}/payment-mandate/${mandateId}/deny-void-all`);

  return response;
};

export const postSendPaymentMandate = async (casinoKey: Casino['key'], mandateId: t.PostPaymentMandateOperationsPayload['mandateId']) => {
  if (!mandateId) {
    throw new Error('Missing payment mandate ID. Please refresh the page and try again.');
  }

  const { data: response } = await financeApiRequest.post(`/merchant/${casinoKey}/payment-mandate/${mandateId}/send`);

  return response;
};
