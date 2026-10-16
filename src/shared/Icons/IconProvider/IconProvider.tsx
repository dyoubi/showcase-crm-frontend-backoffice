import { memo } from 'react';

import { useIconColor, useIconSize, useIconStrokeWidth } from '../hooks';
import * as t from '../types';

export const IconProvider = memo(({ color, size, ...rest }: t.IconProps) => {
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
      <path d="M9 12l-3 -3h-2a1 1 0 0 0 -1 1v4a1 1 0 0 0 1 1h2z" />
      <path d="M15 12l3 -3h2a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-2z" />
      <path d="M12 15l-3 3v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1 -1v-2z" />
      <path d="M12 9l-3 -3v-2a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v2z" />
    </svg>
  );
});
