import * as yup from 'yup';

import * as t from './types';

export const validationSchema: yup.SchemaOf<t.ProviderFormType> = yup.object({
  isActive: yup.boolean(),
  name: yup.string().required('Required'),
  image: yup.string(),
  position: yup.string().required('Required'),
});
