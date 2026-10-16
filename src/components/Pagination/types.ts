import { Dispatch, SetStateAction } from "react";

export interface ResultsPerPage {
    label: number | string,
    value: number | null,
}

type PageOptions = ResultsPerPage[];

export interface PaginationProps {
  amountButtons?: number;
  label?: string,
  maxResults?: number | undefined;
  currentPage: number;
  options: PageOptions;
  resultsPerPage: ResultsPerPage;
  handleCurrentPage: Dispatch<SetStateAction<PaginationProps['currentPage']>> | ((newValue: PaginationProps['currentPage']) => void);
  handleResultsPerPage: Dispatch<SetStateAction<PaginationProps['resultsPerPage']>> | ((newValue: PaginationProps['resultsPerPage']) => void);
}

export interface GetOffsetAndLimitProps {
  currentPage: PaginationProps['currentPage'],
  resultsPerPage: PaginationProps['resultsPerPage']
}

export interface GetOffsetAndLimitReturn {
  limit?: number,
  offset?: number,
}
