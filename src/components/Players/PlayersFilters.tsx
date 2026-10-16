import React, { FormEvent, useEffect } from 'react';

import { useDebouncedValue } from '@/hooks';

import { Button } from '@/shared/Button';
import { Flex } from '@/shared/Flex';
import { IconSearch } from '@/shared/Icons';
import { Input } from '@/shared/Input';
import { TagInput, useTagInputState } from '@/components/TagInput';
import { TagInputState } from '@/components/TagInput/types';

import { FILTERS_DEFAULT } from './constants';
import * as t from './types';

interface PlayersFiltersProps {
  filters: t.PlayersFilters,
  setFilters: React.Dispatch<React.SetStateAction<t.PlayersFilters>>,
};

const PlayersFilters = (props: PlayersFiltersProps) => {
  const {
    filters,
    setFilters,
  } = props;

  const [searchTerm, setSearchTerm] = useDebouncedValue<string>(filters.searchTerm, 1000);
  const [tagsIds,    setTagsIds]    = useTagInputState(filters.tags);

  useEffect(() => {
    setFilters({
      ...filters,
      searchTerm: searchTerm?.trim() || '',
      tags: tagsIds,
    });
  }, [searchTerm, tagsIds]);

  const handleTagChange = (newValue: TagInputState) => {
    if (!newValue) {
      return;
    }

    setTagsIds(newValue);
  };

  const handleReset = () => {
    setFilters(FILTERS_DEFAULT);
    setSearchTerm(FILTERS_DEFAULT.searchTerm);
    setTagsIds(FILTERS_DEFAULT.tags);
  };

  const handleSearchChange = (event: { target: HTMLInputElement; }): void => {
    setSearchTerm(event.target.value?.trim());
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setFilters({
      ...filters,
      searchTerm: searchTerm?.trim() || '',
      tags: tagsIds,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex flexDirection="row" flexWrap="wrap" alignItems="flex-end" gap={12}>
          <Input
            color="secondary"
            label="Search"
            leftIcon={IconSearch}
            onChange={handleSearchChange}
            placeholder="Search by email, name, or username"
            style={{ width: '100%', maxWidth: '350px' }}
          />

          <TagInput
            label="Filter By Tags"
            setTagsIds={handleTagChange}
            style={{ minWidth: '200px', marginRight: '28px' }}
            tagsIds={tagsIds}
            tagType="player"
          />

          <Button type="submit">
            Search
          </Button>

          <Button
            color="secondary"
            onClick={handleReset}
          >
            Reset
          </Button>
      </Flex>
    </form>
  );
};


export default PlayersFilters;
