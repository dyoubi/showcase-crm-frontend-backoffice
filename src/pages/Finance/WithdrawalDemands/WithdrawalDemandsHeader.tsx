import { Dispatch, SetStateAction } from 'react';

import { Button } from '@/shared/Button';
import { Flex } from '@/shared/Flex';
import { IconChevronDown, IconChevronUp } from '@/shared/Icons';

import { EWithdrawalSortDirectionType } from '@/domains/finance/withdrawals';

import { titleCase } from '@/utils';

import { WithdrawalSort } from './types';

interface WithdrawalDemandsHeaderProps {
  label?: string;
  setSortConfig: Dispatch<SetStateAction<{
    value: WithdrawalSort['sortBy'];
    direction: WithdrawalSort['sortDirection'];
  }>>;
  sort: WithdrawalSort['sortBy'];
  sortConfig: {
    value: WithdrawalSort['sortBy'],
    direction: WithdrawalSort['sortDirection'],
  };
};

const WithdrawalDemandsHeader = (props: WithdrawalDemandsHeaderProps) => {
  const {
    label,
    setSortConfig,
    sort,
    sortConfig,
  } = props;

  const handleOnClick = () => {
    const direction = (
      sortConfig.value === sort
      && sortConfig.direction === EWithdrawalSortDirectionType.DESC
    ) ? EWithdrawalSortDirectionType.ASC : EWithdrawalSortDirectionType.DESC;

    setSortConfig({ value: sort, direction });
  };

  const SelectedIcon = (
    sortConfig.value === sort
    && sortConfig.direction === EWithdrawalSortDirectionType.ASC
  ) ? IconChevronUp : IconChevronDown;

  return (
    <th>
      <Flex justifyContent="center" alignItems="center" gap={9}>
        <Button
          color={(sortConfig.value === sort) ? 'primary' : 'secondary'}
          onClick={handleOnClick}
          size="l"
        >
          {label || titleCase(sort)}

          {(sortConfig.value === sort) ? <SelectedIcon size="m" /> : null}
        </Button>
      </Flex>
    </th>
  );
};

export default WithdrawalDemandsHeader;
