import { memo, useMemo } from 'react';
import { MultiValue } from 'react-select';

import { useGetCasinoTags } from '@/domains/casino/tag';
import { Select } from '@/shared/Select';
import { IconLoader } from '@/shared/Icons';

import { DATA_TEST_IDS } from '@/constants';

import { useTagInputState } from './hooks';
import { getSelectedOptions } from './logic.helper';
import * as t from './types';

export const TagInput = memo(
  ({
    color,
    label,
    setTagsIds,
    tagsIds = [],
    tagType,
    ...rest
  }: t.TagInputProps) => {
    const { data, isLoading } = useGetCasinoTags({ tagType });

    const optionsTags: Array<t.TagOptionType> = useMemo(
      () =>
        (data || []).map((tag) => ({
          label: tag.name,
          value: tag.id,
          color: tag?.color,
        })),
      [data],
    );

    if (isLoading) {
      return <IconLoader color="primary" />;
    }

    const handleOnChange = (newValue: MultiValue<t.TagOptionType>) => {
      if (!setTagsIds) {
        return;
      }

      setTagsIds((newValue || []).map((option: t.TagOptionType) => (option.value as Omit<t.TagOptionType['value'], 'null'>).toString()));
    };

    const isTagTypeMachine = tagType === 'machine';

    return (
      <Select
        isMulti
        data-testid={(isTagTypeMachine) ? DATA_TEST_IDS.TAG_INPUT_MACHINE : DATA_TEST_IDS.TAG_INPUT_PLAYER}
        value={getSelectedOptions(tagsIds, optionsTags)}
        onChange={handleOnChange}
        options={optionsTags}
        color={color}
        label={label}
        {...rest}
      />
    );
  },
);

export { useTagInputState, t };
