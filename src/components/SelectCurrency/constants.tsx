import { ReactNode } from 'react';

import { CryptoCodes, ECryptoCodes } from '@/domains/currency';

import { Flex } from '@/shared/Flex';
import { IconBitcoin, IconEthereum, IconTron } from '@/shared/Icons';

export const currencyOptions: { value: CryptoCodes; label: ReactNode }[] = [
  {
    value: '' as CryptoCodes,
    label: 'All',
  },
  {
    value: ECryptoCodes.BTC,
    label: (
      <Flex alignItems="center" gap="8px">
        <IconBitcoin />

        <span>Bitcoin</span>
      </Flex>
    ),
  },
  {
    value: ECryptoCodes.ETH,
    label: (
      <Flex alignItems="center" gap="8px">
        <IconEthereum />

        <span>Ethereum</span>
      </Flex>
    ),
  },
  {
    value: ECryptoCodes.TRX,
    label: (
      <Flex alignItems="center" gap="8px">
        <IconTron />

        <span>Tron</span>
      </Flex>
    ),
  },
];
