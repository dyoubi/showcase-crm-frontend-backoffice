import { useToaster } from '@/hooks';
import { isApiError } from '@/domains/api';
import { usePostCategory } from '../../domains/category';

import * as t from './types';

interface UseOnFormSubmitParams {
  onFormSubmitted?: () => void;
}

export const useOnFormSubmit = ({ onFormSubmitted }: UseOnFormSubmitParams) => {
  // hooks
  const toaster = useToaster();
  const { mutateAsync } = usePostCategory();

  // constants
  const onSubmit = async (values: t.CategoryForm) => {
    if (!values?.name || !values?.slug) {
      return;
    }

    try {
      // API CALL / logic checker etc
      await mutateAsync({
        name: values.name,
        slug: values.slug,
      });
      toaster({ color: 'success', content: `Success` });
      onFormSubmitted?.();
    } catch (e) {
      if (!isApiError(e)) {
        toaster({ color: 'danger', content: 'Unknown error' });
        return;
      }

      toaster({ color: 'danger', content: `Api error message` });
    }
  };

  return { onSubmit };
};
