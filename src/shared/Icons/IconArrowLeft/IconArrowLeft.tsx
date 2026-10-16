import { memo } from 'react';

import { useIconColor, useIconSize, useIconStrokeWidth } from '../hooks';
import * as t from '../types';

export const IconArrowLeft = memo(({ color, size, ...rest }: t.IconProps) => {
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
      viewBox="0 0 24 24"
      width={iconSize}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l14 0" />
      <path d="M5 12l4 4" />
      <path d="M5 12l4 -4" />
    </svg>
  );
});
