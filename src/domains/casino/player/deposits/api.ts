
import { financeApiRequest } from '@/domains/api';

import { ECryptoCodes } from '@/domains/currency';

import { Casino } from '../../types';
import { Player } from '../player.types';

import * as t from './types';

export const getPlayerAddresses = async (
  casinoKey: Casino['key'],
  playerId?: Player['id'],
): Promise<t.GetPlayerAddresses | undefined | null> => {
  if (!playerId) {
    return null;
  }

  const { data } = await financeApiRequest.get<t.GetPlayerAddresses>(
    `/cashier/${casinoKey}/player/${playerId}/methods/crypto?currencies=${Object.values(ECryptoCodes).join(',')}`
  );

  return data;
};
