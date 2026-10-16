import { memo } from 'react';

import { IconMoon, IconSun } from '@/shared/Icons';
import { Button } from '@/shared/Button';
import { useAppTheme } from '../../hooks';

export const ThemeSwitcher = memo(() => {
  const { theme, toggle } = useAppTheme();

  const iconProps = {
    size: 'm',
    onClick: toggle,
  } as const;

  return (
    <Button style={{ backgroundColor: 'transparent', border: '1px solid blue' }}>
      {theme === 'light' ? <IconMoon {...iconProps} /> : <IconSun {...iconProps} />}
    </Button>
  );
});
