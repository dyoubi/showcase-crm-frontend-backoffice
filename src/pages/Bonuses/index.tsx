import { FormEvent, memo, useState } from 'react';

import { routes } from '@/libs/router/constants';

import { Bonus, BonusSortOptions, useGetBonuses } from '@/domains/casino/bonus';

import { Button, LinkButton } from '@/shared/Button';
import { Card } from '@/shared/Card';
import { Flex } from '@/shared/Flex';
import { getOptionFromValue, Select } from '@/shared/Select';
import { IconSearch } from '@/shared/Icons';
import { Input } from '@/shared/Input';
import { Page } from '@/components/Page';
import { Collapse } from '@/components/Collapse';

import * as C from './constants';
import BulkAssignBonusModal from './BulkAssignModal';
import BonusesTable from './BonusesTable';

export const Bonuses = memo(() => {
  const [searchTerm,    setSearchTerm]    = useState('');
  const [selectedBonus, setSelectedBonus] = useState<Bonus | null>(null);
  const [sortByOption,  setSortByOption]  = useState<BonusSortOptions>(C.DEFAULT_SORT_BY);

  const {
    data,
    isError,
    isLoading,
    refetch: refetchBonuses,
  } = useGetBonuses({
    searchTerm,
    sortByOption,
  });

// TODO @GET-BONUSES: We could implement two different API calls for active and expired.
//                    In this way, we can only request the expired bonuses only when the table is loaded on the page.
  const {
    activeBonuses = [],
    expiredBonuses = [],
  } = data || {};

  const handleSortChange = (sortValue?: BonusSortOptions) => {
    if (!sortValue) return;
    setSortByOption(sortValue);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setSearchTerm(searchTerm?.trim());
    refetchBonuses();
  };

  return (
    <Page breadcrumbs={[{ content: 'Bonuses' }]} headTitle="Bonuses">
      {(selectedBonus) ? (
        <BulkAssignBonusModal
          bonus={selectedBonus as Bonus}
          onHide={() => setSelectedBonus(null)}
        />
      ) : null}

      <Flex justifyContent="space-between" alignItems="center">
        <h1>Bonuses</h1>

        <LinkButton
          color="primary"
          href={routes.CREATE_BONUS}
          width="auto"
        >
          Create New Bonus
        </LinkButton>
      </Flex>

      <Flex flexDirection="column" gap={24}>
        <Card title="Filters">
          <form onSubmit={handleSubmit}>
            <Flex gap={16} alignItems="flex-end">
              <Input
                color="secondary"
                label="Search"
                leftIcon={IconSearch}
                placeholder="Search bonus by code, name, or type"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                style={{ minWidth: '400px' }}
              />

              <Select
                id="sortBy"
                label="Sort By"
                onChange={(selectedSortByOption) => handleSortChange(selectedSortByOption?.value as BonusSortOptions)}
                options={C.SORT_OPTIONS}
                optionStyle={{ textAlign: 'center', paddingInline: 12 }}
                value={getOptionFromValue(sortByOption, C.SORT_OPTIONS)}
                width={140}
              />

              <Button type="submit">
                Search
              </Button>
            </Flex>
          </form>
        </Card>

        <Card title={`Active Bonuses (${activeBonuses.length})`}>
          <BonusesTable
            data={activeBonuses}
            isError={isError}
            isLoading={isLoading}
            setSelectedBonus={setSelectedBonus}
          />
        </Card>

        <Card>
          <Collapse title={`Expired Bonuses (${expiredBonuses.length})`}>
            <BonusesTable
              data={expiredBonuses}
              isError={isError}
              isLoading={isLoading}
              setSelectedBonus={setSelectedBonus}
            />
          </Collapse>
        </Card>
      </Flex>
    </Page>
  );
});
