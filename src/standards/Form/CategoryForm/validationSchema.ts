import * as yup from 'yup';

import { useCheckSlugAvailable } from '@/standards/domains/category';

import * as t from './types';

// very important to specify the return type as yup.SchemaOf<t.StandardFormType> for prevent typescript problems
export const useStandardFormValidationSchema = (): yup.SchemaOf<t.CategoryForm> => {
  const { mutateAsync } = useCheckSlugAvailable();

  return yup.object({
    isActive: yup.boolean(),
    name: yup.string().required('Required'),
    // .slug method is an custom yup method cf @/libs/yup/customMethods
    slug: yup.string().required('Required').slug(mutateAsync),
    description: yup.array(),
  });
};
