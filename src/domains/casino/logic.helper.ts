import { casinoApiRequest } from '../api';

export const setCasinoId = (casinoId: string) => {
  casinoApiRequest.defaults.headers.common['x-casino-id'] = casinoId;
};
