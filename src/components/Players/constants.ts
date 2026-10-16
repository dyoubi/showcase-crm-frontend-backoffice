import {
  EPlayersSortByType,
  EPlayersSortDirectionType,
  PlayersSortByType,
  PlayersSortDirectionType,
} from '@/domains/casino/player';

import * as t from './types';

export const RESULTS_PER_PAGE_OPTIONS = [{
  label: 25,
  value: 25,
}, {
  label: 50,
  value: 50,
}, {
  label: 75,
  value: 75,
}, {
  label: 100,
  value: 100,
}];

export const SORT_OPTIONS: t.SortSelectType[] = [
  // Due to a bug on react-select library, the first element on the list is always focused.
  // This will cause some UX issues if the default and first options have the same background color
  // when it is sorted alphabetically.
  // See more at https://github.com/JedWatson/react-select/pull/4080
  { label: 'New → Old', value: `${EPlayersSortByType.CREATED_AT}:${EPlayersSortDirectionType.DESC}` },
  { label: 'Old → New', value: `${EPlayersSortByType.CREATED_AT}:${EPlayersSortDirectionType.ASC}` },
];

export const SORT_CONFIG_DEFAULT = {
  sortBy: SORT_OPTIONS[0].value.split(':')[0] as PlayersSortByType,
  sortDirection: SORT_OPTIONS[0].value.split(':')[1] as PlayersSortDirectionType,
};

export const FILTERS_DEFAULT: t.PlayersFilters = {
  searchTerm: '',
  tags: [],

  sortBy: SORT_CONFIG_DEFAULT.sortBy,
  sortDirection: SORT_CONFIG_DEFAULT.sortDirection,

  limit: RESULTS_PER_PAGE_OPTIONS[0].value,
  offset: 0,
};
