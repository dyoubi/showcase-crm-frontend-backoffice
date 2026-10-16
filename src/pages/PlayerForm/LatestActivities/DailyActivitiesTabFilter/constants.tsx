import { ReactNode } from 'react';

import { Balance } from '@/domains/casino/player/balance';
import { ECryptoCodes } from '@/domains/currency';

import { Flex } from '@/shared/Flex';

import { CryptoIcon } from '@/components/CryptoIcon';

export { DEFAULT_SELECTION } from '../DailyActivitiesTab/constants';

export const CURRENCY_OPTIONS: { label: ReactNode; value: Balance['coin'] }[] = [{
  label: (
    <Flex gap={12}>
      <span>BTC</span>
      <CryptoIcon code={ECryptoCodes.BTC} />
    </Flex>
  ),
  value: ECryptoCodes.BTC,
}, {
  label: (
    <Flex gap={12}>
      <span>ETH</span>
      <CryptoIcon code={ECryptoCodes.ETH} />
    </Flex>
  ),
  value: ECryptoCodes.ETH,
}, {
  label: (
    <Flex gap={12}>
      <span>TRX</span>
      <CryptoIcon code={ECryptoCodes.TRX} />
    </Flex>
  ),
  value: ECryptoCodes.TRX,
}];

export const DEFAULT_CUSTOM_SELECTION = {
  label: 'Custom',
  value: 'null',
};

export const SELECTION_OPTIONS = [{
  label: 'Last 24 hours',
  value: -1,
}, {
  label: 'Last 7 days',
  value: -7,
}, {
  label: 'Last 30 days',
  value: -30,
}, {
  label: 'Last 90 days',
  value: -90,
}, {
  label: 'Last 6 months',
  value: -180,
}, {
  label: 'Last year',
  value: -365,
}, DEFAULT_CUSTOM_SELECTION];
