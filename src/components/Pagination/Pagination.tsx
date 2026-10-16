import { Fragment, ReactNode } from 'react';
import { SingleValue } from 'react-select';

import { Button } from '@/shared/Button';
import { Flex } from '@/shared/Flex';
import { IconChevronLeftPipe, IconChevronRightPipe } from '@/shared/Icons';
import { Label } from '@/shared/Label';
import { Select } from '@/shared/Select';

import * as t from './types';

import { DEFAULT_RESULTS_PER_PAGE } from './constants';

export const Pagination = (props: t.PaginationProps) => {
  const {
    amountButtons = 5,
    handleCurrentPage,
    handleResultsPerPage,
    label = 'Results Per Page',
    maxResults = 0,
    currentPage,
    options,
    resultsPerPage = DEFAULT_RESULTS_PER_PAGE,
  } = props;

  const amountPages = (resultsPerPage.value && Math.ceil(maxResults / resultsPerPage.value)) ? Math.ceil(maxResults / resultsPerPage.value) : 1;
  const amountPagesIndex = amountPages - 1;

  const handleOnPageClick = (newValue: number) => {
    handleCurrentPage(newValue);
  };

  const handleOnResultsPerPageChange = (newValue: SingleValue<t.ResultsPerPage>) => {
    if (!newValue) {
			return;
		}

    handleCurrentPage(0);
    if (handleResultsPerPage) {
      handleResultsPerPage(newValue);
    }
  };

  const renderButtonsPages = () => {
    const PageButtons: ReactNode[] = [];

    let start = 0;
    let end = 0;
    const segment = Math.floor(amountButtons / 2);

    if (currentPage - segment < 0) {
      start = 0;
      end += segment - currentPage;
    } else {
      start = currentPage - segment;
    }


    if ((currentPage - segment - 1) >= 0) {
      PageButtons.push((
        <Button
            key="pagination-icon-first-page"
            color="secondary"
            onClick={() => handleOnPageClick(0)}
            size="l"
            width="auto"
        >
            <IconChevronLeftPipe size={18} />
          </Button>
      ));
    }

    if ((currentPage + segment + end) > amountPagesIndex) {
      const segmentAdded = amountPagesIndex - (currentPage + segment + end);

      start += ((start + segmentAdded) < 0) ? 0 : segmentAdded;
      end = amountPagesIndex;
    } else {
      end += currentPage + segment;
    }

    // Adjust for single page
    if (amountPages === 1) {
      start = 0;
      end = 0;
    }

    for (let index = start; index <= end; index += 1) {
      PageButtons.push(
        <Fragment key={index}>
          <Button
            color={(index === currentPage) ? 'primary' : 'secondary'}
            onClick={() => handleOnPageClick(index)}
            size="l"
            width="auto"
          >
            {index + 1}
          </Button>
        </Fragment>
      );
    }

    if ((currentPage + segment) < amountPagesIndex) {
      PageButtons.push((
        <Button
          key="pagination-icon-last-page"
          color="secondary"
          onClick={() => handleOnPageClick(amountPagesIndex)}
          size="l"
          width="auto"
        >
          <IconChevronRightPipe size={18} />
        </Button>
      ));
    }

    return PageButtons;
  };

  return (
    <Flex
      alignItems="flex-end"
      flexDirection="row"
      justifyContent="flex-start"
      gap={12}
    >
      <Select
        label={label}
        onChange={handleOnResultsPerPageChange}
        options={options}
        value={resultsPerPage}
        width={160}
      />

      <Flex flexDirection="column">
        <Label>Pages</Label>
        <Flex
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="flex-start"
          gap={12}
        >
          {renderButtonsPages()}
        </Flex>
      </Flex>
    </Flex>
  );
}
