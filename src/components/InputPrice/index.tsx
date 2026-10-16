import { forwardRef } from 'react';

import { useCurrentCasino } from '@/domains/casino/hooks';
import { Input, InputPropsType } from '@/shared/Input';
import { IconEuro, IconDollar } from '@/shared/Icons';

type InputPriceProps = InputPropsType;

export const InputPrice = forwardRef<HTMLInputElement, InputPriceProps>(
  (props: InputPriceProps, ref) => {
    const casinoFiat = useCurrentCasino()?.fiat;

    return (
      <Input
        {...props}
        rightIcon={casinoFiat === 'EUR' ? IconEuro : IconDollar}
        ref={ref}
      />
    );
  },
);
