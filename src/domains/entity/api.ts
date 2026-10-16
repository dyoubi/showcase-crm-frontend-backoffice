// import { casinoApiRequest } from '../api';
// import * as t from './types';

import { reformatResponse } from './adapter';
import { entities } from './fixture';

export const getEntities = async () => {
  // await casinoApiRequest.get<t.GetEntitiesResponse>('../entities');

  // @ts-ignore
  return reformatResponse(entities);
};
