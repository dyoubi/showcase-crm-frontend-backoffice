import * as t from './types';

export const getApiRouteByEntityType = (entityType: t.AssociationType) => {
  switch (entityType) {
    case 'player':
      return 'tag-players';
    case 'machine':
      return 'tag-machines';
    case 'category':
      return 'tag-categories';
    default:
      return 'tag-players';
  }
};

export const getPayloadKeyFromEntityType = (entityType: t.AssociationType) => {
  switch (entityType) {
    case 'player':
      return 'playerId';
    case 'machine':
      return 'machineId';
    case 'category':
      return 'categoryId';
    default:
      return 'playerId';
  }
};
