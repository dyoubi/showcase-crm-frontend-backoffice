import { memo } from 'react';

import { CryptoCodes, useConvertCurrencyInFiat } from '@/domains/currency';
import { Flex, FlexProps } from '@/shared/Flex';
import { Tooltip } from '@/shared/Tooltip';
import { CryptoIcon } from '../CryptoIcon';

export interface ToolTipPriceFiatProps {
  currency: CryptoCodes;
  message?: string;
  justifyContent?: FlexProps['justifyContent'];
  displayCurrencyIcon?: boolean;
  children: string | number;
}

export const ToolTipPriceFiat = memo(
  ({
    currency,
    message = '',
    justifyContent,
    displayCurrencyIcon = true,
    children,
  }: ToolTipPriceFiatProps) => {
    const convertToFiat = useConvertCurrencyInFiat();

    const { amount, amountInFiat } = convertToFiat(children, currency);

    return (
      <Tooltip message={`${message}${message ? ': ' : ''} ${amountInFiat}`}>
        <Flex
          display="inline-flex"
          flexDirection="row"
          alignItems="center"
          justifyContent={justifyContent}
          gap={(displayCurrencyIcon) ? 4 : undefined}
        >
          {(displayCurrencyIcon) ? (
            <CryptoIcon code={currency} />
          ): null}

          <span>{amount}</span>
        </Flex>
      </Tooltip>
    );
  },
);
