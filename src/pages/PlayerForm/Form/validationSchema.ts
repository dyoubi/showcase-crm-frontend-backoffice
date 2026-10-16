import * as yup from 'yup';

import { YupShape } from '@/utils/typescript.helpers';

import * as t from './types';

export const validationSchema = yup.object<YupShape<t.PlayerFormType>>({
  birth: yup.string(),
  city: yup.string(),
  firstname: yup.string(),
  gender: yup.mixed().oneOf(['m', 'f']),
  ghostMode: yup.boolean(),
  lastname: yup.string(),
  rainMode: yup.boolean(),
  rank: yup.object({
    level: yup.number(),
    points: yup.number(),
  }),
  showStats: yup.boolean(),
});
