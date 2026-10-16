import { memo } from 'react';

import { useIconColor, useIconSize, useIconStrokeWidth } from '../hooks';
import * as t from '../types';

export const IconCode = memo(({ color, size, ...rest }: t.IconProps) => {
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
      <path d="M7 8l-4 4l4 4" />
      <path d="M17 8l4 4l-4 4" />
      <path d="M14 4l-4 16" />
    </svg>
  );
});
