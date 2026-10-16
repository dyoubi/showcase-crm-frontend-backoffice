import { EBonusSortOptions } from '@/domains/casino/bonus';

export const DEFAULT_SORT_BY = EBonusSortOptions.NEW_TO_OLD;

export const SORT_OPTIONS: { label: string; value: string }[] = [
  // Due to a bug on react-select library, the first element on the list is always focused.
  // This will cause some UX issues if the default and first options have the same background color
  // when it is sorted alphabetically.
  // See more at https://github.com/JedWatson/react-select/pull/4080
  { label: EBonusSortOptions.NEW_TO_OLD, value: EBonusSortOptions.NEW_TO_OLD },
  { label: EBonusSortOptions.OLD_TO_NEW, value: EBonusSortOptions.OLD_TO_NEW },
];
