import { memo } from 'react';

import { useIconColor, useIconSize, useIconStrokeWidth } from '../hooks';
import * as t from '../types';

export const IconAbacus = memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);
  const iconStrokeWidth = useIconStrokeWidth(size);

  return (
    <svg
      fill="none"
      height={iconSize}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={iconStrokeWidth}
      stroke={iconColor}
      version="1.1"
      viewBox="0 0 24 24"
      width={iconSize}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M5 3v18" />
      <path d="M19 21v-18" />
      <path d="M5 7h14" />
      <path d="M5 15h14" />
      <path d="M8 13v4" />
      <path d="M11 13v4" />
      <path d="M16 13v4" />
      <path d="M14 5v4" />
      <path d="M11 5v4" />
      <path d="M8 5v4" />
      <path d="M3 21h18" />
    </svg>
  );
});
