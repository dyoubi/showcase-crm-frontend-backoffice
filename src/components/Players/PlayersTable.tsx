import { useEffect, useState } from 'react';
import { SingleValue } from 'react-select';
import { routes } from '@/libs/router/constants';

import { Badge } from '@/shared/Badge';
import { Flex } from '@/shared/Flex';
import { IconEye } from '@/shared/Icons';
import { Link } from '@/shared/Link';
import { LoadingOverlay } from '@/shared/LoadingOverlay';
import { Select } from '@/shared/Select';
import { Table } from '@/shared/Table';

import { Pagination, PaginationHelpers, PaginationTypes } from '@/components/Pagination';

import { replaceUrlParameters } from '@/utils';

import { RESULTS_PER_PAGE_OPTIONS, SORT_OPTIONS } from './constants';
import * as t from './types';

const PlayersTable = (props: t.PlayersTableProps) => {
  const {
    data,
    filters,
    isError,
    isLoading,
    setFilters,
    setSortConfig,
  } = props;

  const [currentPage,    setCurrentPage]    = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(RESULTS_PER_PAGE_OPTIONS[0] as PaginationTypes.ResultsPerPage);
  const [selectedSort,   setSelectedSort]   = useState<t.SortSelectType>(SORT_OPTIONS[0]);

  useEffect(() => {
    setFilters({
      ...filters,

      ...PaginationHelpers.getOffsetAndLimit({ currentPage, resultsPerPage }),
    });
  }, [currentPage, resultsPerPage]);

  const handleSortChange = (newValue: SingleValue<t.SortSelectType>) => {
    if (!newValue) {
      return;
    }

    const [newSortBy, newSortDirection] = newValue.value.split(':') as [t.PlayersSortConfig['sortBy'], t.PlayersSortConfig['sortDirection']] ;

    setSelectedSort(newValue);
    setSortConfig({
      sortBy: newSortBy,
      sortDirection: newSortDirection,
    });
  };

  const { count, data: results } = data || {};

  const render = () => {
    if (isError) {
      return (
        <tr>
          <td colSpan={7}>
            Error loading players. Please try refreshing the page.
          </td>
        </tr>
      );
    }

    if (isLoading) {
      return (
        <tr>
          <td colSpan={7}>
            Loading...
          </td>
        </tr>
      );
    }

    if (!results?.length) {
      return (
        <tr>
          <td colSpan={7}>
            No available players. Try adjusting the filters.
          </td>
        </tr>
      );
    }

    return results.map(player => (
      <tr key={player.id}>
        <td>{player.nickname}</td>
        <td>{player.firstname} {player.lastname}</td>
        <td>{player.email}</td>

        <td>
          {(player.address) ? (
            <>
              {player.address.street}&nbsp;{player.address.streetNumber}
              {player.address.city}&nbsp;{player.address.region}&nbsp;{player.address.postalCode}
            </>
          ) : '—'}
        </td>

        <td>{player.address?.country}</td>

        <td>
          <Flex
            flexDirection="row"
            flexWrap="wrap"
            flex={1}
            gap={8}
            justifyContent="center"
            style={{ maxWidth: 400, margin: '0 auto' }}
          >
            {player.tags?.map((tag) => (
              <Badge
                key={tag.id}
                color={tag?.color}
                style={{ marginBottom: 3 }}
              >
                {tag.name}
              </Badge>
            ))}
          </Flex>
        </td>

        <td>
          <Flex justifyContent="center">
            <Link href={replaceUrlParameters(routes.EDIT_PLAYER, { playerId: player.id })}>
              <IconEye />
            </Link>
          </Flex>
        </td>
      </tr>
    ));
  };

  return (
    <>
      {(isLoading) ? <LoadingOverlay /> : null}

      <Flex flexDirection="column" gap={16}>
        <Flex gap={16}>
          <Select<t.SortSelectType>
            label="Sort By"
            onChange={handleSortChange}
            options={SORT_OPTIONS}
            value={selectedSort}
            width={140}
          />

          <Pagination
            currentPage={currentPage}
            handleResultsPerPage={setResultsPerPage}
            handleCurrentPage={setCurrentPage}
            maxResults={count}
            options={RESULTS_PER_PAGE_OPTIONS}
            resultsPerPage={resultsPerPage}
          />
        </Flex>

        <Table size="s" overflow zebra>
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Country</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {render()}
          </tbody>
        </Table>

        <Pagination
          currentPage={currentPage}
          handleResultsPerPage={setResultsPerPage}
          handleCurrentPage={setCurrentPage}
          maxResults={count}
          options={RESULTS_PER_PAGE_OPTIONS}
          resultsPerPage={resultsPerPage}
        />
      </Flex>
    </>
  );
};

export default PlayersTable;
