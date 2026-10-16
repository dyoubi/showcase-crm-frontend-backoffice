import { UseFormReturn } from 'react-hook-form';

import * as yup from 'yup';
import { useGetIsCategorySlugIsAvailable, usePostCategory } from '@/domains/casino/category';

import { DATA_TEST_IDS } from '@/constants';
import { useToaster, useHandleError } from '../../../hooks';
import * as t from './types';

export const useHandleFormSubmit = (
  onCasinoAdd: () => void,
  setValue: UseFormReturn<t.AddCategoryForm>['setValue'],
) => {
  const toast = useToaster();
  const { mutateAsync, isLoading } = usePostCategory();
  const handleError = useHandleError();

  return {
    isLoading,
    onSubmit: async ({ name, description, slug, image }: t.AddCategoryForm) => {
      try {
        if (!name || !slug) {
          return;
        }
        await mutateAsync({ name, description, slug, image });
        toast({
          dataTestId: DATA_TEST_IDS.ADD_CATEGORY_TOAST,
          content: `The category ${name} has been added`,
        });
        setValue('name', '');
        setValue('description', '');
        setValue('slug', '');
        setValue('image.url', '');
        onCasinoAdd();
      } catch (ex) {
        handleError(ex);
      }
    },
  };
};

export const useValidationSchema = (): yup.SchemaOf<t.AddCategoryForm> => {
  const { mutateAsync } = useGetIsCategorySlugIsAvailable();

  return yup.object({
    name: yup.string().trim().required('Required'),
    slug: yup.string().required().slug(mutateAsync),
    description: yup.string().trim(),
    image: yup.object({ url: yup.string() }),
  });
};
