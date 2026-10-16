import { encodeFilter } from '@/utils';

import { casinoApiRequest } from '@/domains/api';

import * as t from './types';

// TODO @GET-BONUSES: We should request paginated and filtered bonuses data by sending the request
//                    to the BE instead of handling everything on the FE.
// TODO @GET-BONUSES: We could implement two different API calls or hooks for active and expired.
//                    In this way, we can only request the expired bonuses only when the table is loaded on the page.
export const getBonuses = async (filters?: t.GetBonusesFilters) => {
  const {
    sortByOption,
    searchTerm = '',
    filter,
  } = filters || {};

  const sortBy = 'startAt';
  const sortDirection = (sortByOption === t.EBonusSortOptions.OLD_TO_NEW) ? 'ASC' : 'DESC';

  const parsedFilter = {
    where: {
      ...(filter?.where || {}),
      ...((searchTerm) ? {
        or: [
          { code: { ilike: `%${searchTerm}%` }},
          { name: { ilike: `%${searchTerm}%` }},
          { type: { ilike: `%${searchTerm}%` }},
        ],
      } : {}),
    },

    // Compatibility with Loopback
    order: `${sortBy} ${sortDirection}`,

    include: filter?.include,
  };

  const { data } = await casinoApiRequest.get<t.Bonus[]>(`bonuses?filter=${encodeFilter(parsedFilter)}`);

  if (!data) {
    return {
      activeBonuses: [],
      expiredBonuses: [],
    };
  }

  const currentDate = new Date();
  const active: t.Bonus[] = [];
  const expired: t.Bonus[] = [];

  data.forEach((bonus) => {
    const start = new Date(bonus.startAt);
    const end = new Date(bonus.endAt);
    const isActive = start <= currentDate && end >= currentDate;
    const isExpired = end < currentDate;

    if (isActive) active.push(bonus);
    else if (isExpired) expired.push(bonus);
  });

  return {
    activeBonuses: active,
    expiredBonuses: expired,
  };
};

export const getBonus = async (bonusId: string) => {
  if (bonusId === t.EBonusType.NEW) {
    return undefined;
  }

  const { data } = await casinoApiRequest.get<t.GetBonusResponse>(`bonuses/${bonusId}`);

  return data;
};

export const postBonus = async (bonusPayload: t.PostBonusPayload, casinoId: string) => {
  const { id, ...payload } = bonusPayload;
  const { data } = await casinoApiRequest[id ? 'patch' : 'post']<t.PostBonusResponse>(
    `bonuses/${id || ''}`,
    {
      ...payload,
      active: true,
      casinoId,
    },
  );

  return data;
};

export const deleteBonus = async (bonusId: string) => {
  const { data } = await casinoApiRequest.delete(`bonuses/${bonusId}`);

  return data;
};

export const getAssignedPlayerBonus = async (props: t.GetAssignedBonusProps) => {
  const {
    playerId,
    filter,
  } = props;

  const parsedFilter = {
    include: filter?.include,
  };

  const { data } = await casinoApiRequest.get<t.GetAssignedBonusResponse>(`/bonus-assignations/player/${playerId}?filter=${encodeFilter(parsedFilter)}`);

  return data;
};

export const assignBonus = async (props: t.AssignBonusProps) => {
  const {
    bonusId,
    tagIds,
  } = props;

  const { data } = await casinoApiRequest.post<t.PostBonusResponse>(
    `/bonuses/${bonusId}/assignations`,
    { tagIds },
  );

  return data;
};

export const assignBonusByPlayerId = async (props: t.AssignBonusByPlayerId) => {
  const {
    bonusId,
    playerId,
  } = props;

  const { data } = await casinoApiRequest.post<t.PostBonusResponse>(
    `/bonuses/${bonusId}/assignation-by-id`,
    { playerId },
  );

  return data;
};

export const getBonusAssignations = async (bonusId: string) => {
  const filter = {
    include: ['player', 'bonus'],
  } as const;

  const { data } = await casinoApiRequest.get<t.GetBonusAssignationsResponse>(
    `/bonuses/${bonusId}/assignations?filter=${encodeFilter(filter)}`,
  );

  return data;
};

export const deleteBonusAssignation = async ({
  bonusId,
  assignationId,
}: t.DeleteAssignationPayload) => {
  const where = {
    id: assignationId,
  } as const;

  // TODO Check with backend team for remove the where parameter it's too dangerous
  await casinoApiRequest.delete<void>(
    `/bonuses/${bonusId}/assignations?where=${encodeFilter(where)}`,
  );
};
