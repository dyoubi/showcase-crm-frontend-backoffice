import { ReactNode } from 'react';

import { Tag, TagType } from '@/domains/casino/tag';

import { AdditionalProps, OptionType } from '@/shared/Select';

export interface TagOptionType extends OptionType {
  color: string;
}

export type TagInputState = readonly Tag['id'][];

export interface TagInputProps extends AdditionalProps<TagOptionType, true>{
  setTagsIds: (newTags: TagInputState) => void;
  tagsIds: TagInputState;
  tagType: TagType;
  caption?: ReactNode;
  color?: string;
  label?: ReactNode;
  padding?: string;
}
