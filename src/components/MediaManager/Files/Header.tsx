import { Flex } from '@/shared/Flex';
import { Input } from '@/shared/Input';
import { IconSearch, IconLoader } from '@/shared/Icons';
import { Button } from '@/shared/Button';
import { Select, getOptionFromValue } from '@/shared/Select';
import { Pagination } from '@/components/Pagination';
import { StoreMediaSortByOptions, StoreMediaSortDirection } from '@/domains/casino/media';
import { FileListState } from '../hooks/useFileList';
import { SORT_OPTIONS, RESULTS_PER_PAGE_OPTIONS } from '../constants';

interface HeaderProps {
  state: FileListState;
  setState: (state: FileListState | ((prev: FileListState) => FileListState)) => void;
  searchRef: React.RefObject<HTMLInputElement>;
  onSearch: (value: string) => void;
  isSearching: boolean;
  maxResults: number;
}

export const Header = ({
  state,
  setState,
  searchRef,
  onSearch,
  isSearching,
  maxResults,
}: HeaderProps) => (
  <Flex flexDirection="row" justifyContent="space-around" alignItems="flex-end">
    <Input
      color="secondary"
      leftIcon={IconSearch}
      onChange={(e) => onSearch(e.target.value)}
      width="50%"
      ref={searchRef}
      rightIcon={isSearching ? IconLoader : undefined}
      label="Search By Name (min 3 characters)"
    />
    <Button onClick={() => onSearch('')} color="secondary" disabled={!searchRef?.current?.value}>
      Clear
    </Button>
    <Select
      width={180}
      label="Sort Option"
      value={getOptionFromValue(
        `${state.sortConfig.value}__${state.sortConfig.direction}`,
        SORT_OPTIONS,
      )}
      options={SORT_OPTIONS}
      onChange={(value) => {
        const selected = value?.value?.split('__');
        if (!selected) return;
        setState((prev) => ({
          ...prev,
          sortConfig: {
            value: selected[0] as StoreMediaSortByOptions,
            direction: selected[1] as StoreMediaSortDirection,
          },
        }));
      }}
    />

    <Pagination
      maxResults={maxResults}
      currentPage={state.currentPage}
      handleResultsPerPage={(value: FileListState['resultsPerPage']) =>
        setState((prev) => ({ ...prev, resultsPerPage: value as { label: number; value: number } }))
      }
      handleCurrentPage={(value: FileListState['currentPage']) => setState((prev) => ({ ...prev, currentPage: value as number }))}
      options={RESULTS_PER_PAGE_OPTIONS}
      resultsPerPage={state.resultsPerPage}
    />
  </Flex>
);
