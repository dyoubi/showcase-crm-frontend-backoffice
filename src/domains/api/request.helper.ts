import * as axios from 'axios';

import { configuration } from '../../configuration';

const getHeaders = () => {
  const headers: Record<string, string> = {};

  if (configuration.CLOUDFARE_ACCESS_CLIENT_ID) {
    headers['CF-Access-Client-Id'] = configuration.CLOUDFARE_ACCESS_CLIENT_ID;
  }

  if (configuration.CLOUDFARE_ACCESS_CLIENT_SECRET) {
    headers['CF-Access-Client-Secret'] = configuration.CLOUDFARE_ACCESS_CLIENT_SECRET;
  }

  return headers;
};

export const authApiRequest = axios.default.create({
  baseURL: configuration.AUTH_API_URL,
  headers: getHeaders(),
});

export const casinoApiRequest = axios.default.create({
  baseURL: configuration.CASINO_API_URL,
  headers: getHeaders(),
});

export const coinsApiRequest = axios.default.create({
  baseURL: configuration.COINS_API_URL,
  headers: getHeaders(),
});

export const customerServiceApiRequest = axios.default.create({
  baseURL: configuration.CUSTOMER_SERVICE_API_URL,
  headers: getHeaders(),
});

export const financeApiRequest = axios.default.create({
  baseURL: configuration.FINANCE_API_URL,
  headers: getHeaders(),
});

export const operatorApiRequest = axios.default.create({
  baseURL: configuration.OPERATOR_API_URL,
  headers: getHeaders(),
});

export const setAuthApiTokenHeader = (token = '') => {
  casinoApiRequest.defaults.headers.common.Authorization = `Bearer ${token}`;
  operatorApiRequest.defaults.headers.common.Authorization = `Bearer ${token}`;
};
