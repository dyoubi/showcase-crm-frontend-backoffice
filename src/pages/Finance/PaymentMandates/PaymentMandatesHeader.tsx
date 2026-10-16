import { Dispatch, SetStateAction } from 'react';

import { Button } from '@/shared/Button';
import { Flex } from '@/shared/Flex';
import { IconChevronDown, IconChevronUp } from '@/shared/Icons';

import { PaymentMandateSortDirectionType } from '@/domains/finance/payments';

import { titleCase } from '@/utils';

import { PaymentSort } from './types';

interface PaymentsHeaderProps {
  label?: string;
  setSortConfig: Dispatch<SetStateAction<{
    value: PaymentSort['sortBy'];
    direction: PaymentSort['sortDirection'];
  }>>;
  sort: PaymentSort['sortBy'];
  sortConfig: {
    value: PaymentSort['sortBy'],
    direction: PaymentSort['sortDirection'],
  };
};

const PaymentsHeader = (props: PaymentsHeaderProps) => {
  const {
    label,
    setSortConfig,
    sort,
    sortConfig,
  } = props;

  const handleOnClick = () => {
    const direction = (
      sortConfig.value === sort
      && sortConfig.direction === PaymentMandateSortDirectionType.DESC
    ) ? PaymentMandateSortDirectionType.ASC : PaymentMandateSortDirectionType.DESC;

    setSortConfig({ value: sort, direction });
  };

  const SelectedIcon = (
    sortConfig.value === sort
    && sortConfig.direction === PaymentMandateSortDirectionType.ASC
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

export default PaymentsHeader;
