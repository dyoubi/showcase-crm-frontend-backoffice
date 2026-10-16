import { casinoApiRequest } from '../api';
import * as t from './types';

export const getCasinos = async () => {
  const { data } = await casinoApiRequest.get<t.GetCasinosResponse>('casinos');

  return data;
};
