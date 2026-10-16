import isNil from 'lodash/isNil';

import { GetProvidersResponse, usePatchProvider } from '@/domains/casino/provider';
import { useHandleError, useToaster } from '@/hooks';

import * as t from './types';

interface UseOnFormSubmitParams {
  provider: GetProvidersResponse[number];
  onFormSubmitted?: () => void;
}

export const useHandleProviderFormSubmit = ({
  provider,
  onFormSubmitted,
}: UseOnFormSubmitParams) => {
  // hooks
  const { mutateAsync: patchProvider, isLoading: isLoadingPatchProvider } = usePatchProvider();
  const handleError = useHandleError();
  const toaster = useToaster();

  // constants
  const onSubmit = async (values: t.ProviderFormType) => {
    if (!values?.name || isNil(values?.position)) {
      return;
    }

    try {
      await patchProvider({
        providerId: provider.id,
        name: values.name,
        activate: !!values.isActive,
        position: parseInt(values.position, 10),
        image: values?.image,
      });
      toaster({ content: `Provider ${provider.name} edited` });
      onFormSubmitted?.();
    } catch (e) {
      handleError(e);
    }
  };
  return { onSubmit, isLoading: isLoadingPatchProvider };
};
