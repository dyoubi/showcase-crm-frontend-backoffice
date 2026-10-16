import * as yup from 'yup';
// import { slugRegex } from '@/utils/regex';

yup.addMethod(
  yup.string,
  'slug',
  function slugMethod(checkIsSlugAvailable: (v: string) => Promise<boolean>) {
    return this./* matches(slugRegex, 'The slug is invalid'). */ test({
      test: async (value = '') => checkIsSlugAvailable(value),
      message: 'This slug is already exists',
    });
  },
);
