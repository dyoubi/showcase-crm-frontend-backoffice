import { Theme } from '@emotion/react';

import { typography } from './typography';
import { colors } from './colors';
import { sizes } from './sizes';
import { spaces } from './spaces';
import { components } from './components';

export const light: Theme = {
  typography,
  colors,
  sizes,
  spaces,
  components,
} as const;
