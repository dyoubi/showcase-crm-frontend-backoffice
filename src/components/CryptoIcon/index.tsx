import { memo } from 'react';

import { CryptoCodes } from '@/domains/currency';
import { IconProps } from '@/shared/Icons/types';
import * as c from './constants';
import { cryptosIcons } from './constants';

export interface CryptoIconProps extends IconProps {
  code: CryptoCodes;
}

export const CryptoIcon = memo(({ code, size = 'm', ...restProps }: CryptoIconProps) => {
  const Icon = c.cryptosIcons?.[code];

  if (!Icon) {
    return <strong>{code}</strong>;
  }

  return <Icon size={size} {...restProps} ref={undefined} />;
});

export { cryptosIcons };
