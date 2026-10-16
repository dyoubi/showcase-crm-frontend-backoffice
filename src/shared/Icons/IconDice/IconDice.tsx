import { memo } from 'react';

import { useIconColor, useIconSize, useIconStrokeWidth } from '../hooks';
import * as t from '../types';

export const IconDice = memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);
  const iconStrokeWidth = useIconStrokeWidth(size);

  return (
    <svg
      fill="none"
      height={iconSize}
      stroke={iconColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={iconStrokeWidth}
      viewBox="0 0 24 24"
      width={iconSize}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
      <circle cx="8.5" cy="8.5" r=".5" fill="currentColor" />
      <circle cx="15.5" cy="8.5" r=".5" fill="currentColor" />
      <circle cx="15.5" cy="15.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="15.5" r=".5" fill="currentColor" />
    </svg>
  );
});
