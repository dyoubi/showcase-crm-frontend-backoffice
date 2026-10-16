import * as yup from 'yup';

import { TagTypeEnums } from '@/domains/casino/tag';
import * as t from './types';

const tagTypeValues = Object.values(TagTypeEnums);

export const validationSchema: yup.SchemaOf<t.TagForm> = yup.object({
  name: yup.string().trim().required('Required'),
  color: yup.string().trim().required('Required'),
  slug: yup.string().trim().required('Required'),
  type: yup
    .mixed()
    .required('Required')
    .oneOf(tagTypeValues, `The value must be one of : ${tagTypeValues.join(',')}`),
});
