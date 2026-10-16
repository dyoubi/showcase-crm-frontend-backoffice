import { StoreMediaSortByOptions, StoreMediaSortDirection } from '@/domains/casino/media';

export const ACCEPTED_MEDIA_TYPES = {
  'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
  'video/*': ['.mp4', '.mpeg', '.webm'],
} as const;

export const RESULTS_PER_PAGE_OPTIONS = [
  { label: 10, value: 10 },
  { label: 20, value: 20 },
  { label: 50, value: 50 },
];

export const SORT_OPTIONS = [
  {
    label: 'Created - Newest to Oldest',
    value: `${StoreMediaSortByOptions.CreatedAt}__${StoreMediaSortDirection.DESC}`,
  },
  {
    label: 'Created - Oldest to Newest',
    value: `${StoreMediaSortByOptions.CreatedAt}__${StoreMediaSortDirection.ASC}`,
  },
  {
    label: 'Name - A to Z',
    value: `${StoreMediaSortByOptions.Name}__${StoreMediaSortDirection.ASC}`,
  },
  {
    label: 'Name - Z to A',
    value: `${StoreMediaSortByOptions.Name}__${StoreMediaSortDirection.DESC}`,
  },
  {
    label: 'Updated - Newest to Oldest',
    value: `${StoreMediaSortByOptions.UpdatedAt}__${StoreMediaSortDirection.DESC}`,
  },
  {
    label: 'Updated - Oldest to Newest',
    value: `${StoreMediaSortByOptions.UpdatedAt}__${StoreMediaSortDirection.ASC}`,
  },
] as const;

export const DEFAULT_PAGINATION = {
  currentPage: 0,
  resultsPerPage: RESULTS_PER_PAGE_OPTIONS[0],
  sortConfig: {
    value: StoreMediaSortByOptions.CreatedAt,
    direction: StoreMediaSortDirection.DESC,
  },
} as const;
