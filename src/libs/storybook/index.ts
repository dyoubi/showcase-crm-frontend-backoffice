import { Colors } from '@emotion/react';
import { ValueOf } from '@/utils/typescript.helpers';
import * as Icons from '@/shared/Icons';

const colors: Array<Colors> = ['primary', 'secondary', 'tertiary', 'success', 'danger', 'warning'];
const iconsKeys = Object.keys(Icons);

const iconsMaps: Record<string, ValueOf<typeof Icons>> = {};

iconsKeys.forEach((iconKey) => {
  // @ts-ignore
  // eslint-disable-next-line import/namespace
  iconsMaps[iconKey] = Icons[iconKey];
});

export const ArgsTypes = {
  colors: {
    options: colors,
  },
  icons: { options: iconsKeys, mapping: iconsMaps },
  text: {
    control: { type: 'text' },
  },
  number: {
    control: { type: 'number' },
  },
  date: {
    control: { type: 'date' },
  },
} as const;
