import { getOptionFromValue } from '@/shared/Select';
import * as t from './types';

export const getSelectedOptions = (
  tagsIds: t.TagInputState,
  optionsTags: Array<t.TagOptionType>,
) => {
  const getTagOption = (tagId: string) => getOptionFromValue(tagId, optionsTags);

  // we retrieve all options by tagId & remove the ones who are undefined
  return tagsIds.map(getTagOption).filter((tag): tag is t.TagOptionType => !!tag);
};
