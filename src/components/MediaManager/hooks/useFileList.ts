import { useState, useRef, useEffect } from 'react';

import {
  useGetContentStoreFiles,
  useDeleteFileInStore,
  useGetContentStoreFilesSearch,
  StoreMedia,
  StoreMediaSortByOptions,
  StoreMediaSortDirection,
} from '@/domains/casino/media';
import { useDebouncedValue } from '@/hooks';

import { PaginationHelpers, PaginationTypes } from '@/components/Pagination';

export interface FileListState {
  currentPage: PaginationTypes.PaginationProps['currentPage'];
  resultsPerPage: PaginationTypes.PaginationProps['resultsPerPage'];
  sortConfig: {
    value: StoreMediaSortByOptions;
    direction: StoreMediaSortDirection;
  };
}

export const useFileList = (selectedStoreId: string) => {
  const [state, setState] = useState<FileListState>({
    currentPage: 0,
    resultsPerPage: { label: 10, value: 10 },
    sortConfig: {
      value: StoreMediaSortByOptions.CreatedAt,
      direction: StoreMediaSortDirection.DESC,
    },
  });

  const [files, setFiles] = useState<StoreMedia[]>([]);
  const [searchTerm, setSearchTerm] = useDebouncedValue('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const {
    data: allFiles,
    isFetching,
    refetch,
  } = useGetContentStoreFiles({
    storeId: selectedStoreId,
    sortBy: state.sortConfig.value,
    sortDirection: state.sortConfig.direction,

    ...PaginationHelpers.getOffsetAndLimit({ currentPage: state.currentPage, resultsPerPage: state.resultsPerPage }),
  });

  const {
    data: searchResults,
    refetch: refetchSearch,
    isFetching: searching,
  } = useGetContentStoreFilesSearch({
    match: searchTerm || '',
    storeId: selectedStoreId,
    sortBy: state.sortConfig.value,
    sortDirection: state.sortConfig.direction,

    ...PaginationHelpers.getOffsetAndLimit({ currentPage: state.currentPage, resultsPerPage: state.resultsPerPage }),
  });

  const { mutateAsync: deleteMedia } = useDeleteFileInStore();

  useEffect(() => {
    if (allFiles && !searchTerm) {
      setFiles(allFiles);
    }
  }, [allFiles, searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      refetchSearch();
    } else {
      if (searchInputRef.current?.value) {
        searchInputRef.current.value = '';
      }
      refetch();
    }
  }, [searchTerm, refetchSearch, refetch, selectedStoreId, state]);

  useEffect(() => {
    if (searchResults) {
      setFiles(searchResults.results.map((file) => ({ ...file, guid: file?.id || '' })));
    }
  }, [searchResults]);

  const handleDelete = async (file: StoreMedia) => {
    await deleteMedia({ storeId: selectedStoreId, fileId: file.file_id });
    if (searchTerm) {
      await refetchSearch();
    } else {
      if (searchInputRef.current?.value) {
        searchInputRef.current.value = '';
      }
      await refetch();
    }
  };

  return {
    files,
    state,
    searchInputRef,
    isFetching,
    searching,
    searchResults,
    setSearchTerm,
    handleDelete,
    setState,
  };
};
