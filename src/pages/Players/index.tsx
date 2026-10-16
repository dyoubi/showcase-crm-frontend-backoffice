import { memo, useState } from 'react';

import { useGetPlayersList } from '@/domains/casino/player';

import { Card } from '@/shared/Card';
import { Flex } from '@/shared/Flex';

import { Page } from '@/components/Page';
import { PlayersFilters, PlayersTable, C, t } from '@/components/Players';

export const Players = memo(() => {
  const [filters,    setFilters]    = useState<t.PlayersFilters>(C.FILTERS_DEFAULT);
  const [sortConfig, setSortConfig] = useState<t.PlayersSortConfig>(C.SORT_CONFIG_DEFAULT);

  const {
    data,
    isError,
    isLoading,
  } = useGetPlayersList({
    searchTerm: filters.searchTerm,
    tags: filters.tags,

    sortBy: sortConfig.sortBy,
    sortDirection: sortConfig.sortDirection,

    limit: filters.limit,
    offset: filters.offset,
  });

  return (
    <Page breadcrumbs={[{ content: 'Players' }]} headTitle="Players">
      <h1>
        Players
      </h1>

      <Flex flexDirection="column" gap={24}>
        <Card title="Filters">
          <PlayersFilters
            filters={filters}
            setFilters={setFilters}
          />
        </Card>

        <Card title="Results">
          <PlayersTable
            data={data}
            filters={filters}
            isError={isError}
            isLoading={isLoading}
            setFilters={setFilters}
            setSortConfig={setSortConfig}
          />
        </Card>
      </Flex>
    </Page>
  );
});
